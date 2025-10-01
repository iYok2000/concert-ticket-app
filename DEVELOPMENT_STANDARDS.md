# 📋 Development Standards & Guidelines

## 🎯 Overview

This document defines development standards, coding guidelines, and best practices for the Concert Ticket App monorepo. These standards ensure code consistency, maintainability, and collaboration across team members.

## 📦 Package Structure Standards

### 🏗️ Package Organization Rules

#### **@concert/types**
```typescript
// ✅ DO: Clear interface definitions
export interface User {
  id: string;           // Always use string for IDs
  email: string;        // Required fields first
  name: string;
  role: Role;           // Use enum/union types
  createdAt: Date;      // Timestamps always Date type
  updatedAt: Date;
}

// ✅ DO: Group related types
export type Role = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive' | 'suspended';

// ❌ DON'T: Mix different concerns in one file
// ❌ DON'T: Use 'any' type
// ❌ DON'T: Optional required business fields
```

**Limitations & Flexibility:**
- **Max file size**: 500 lines per type file
- **Flexibility**: Can create sub-modules for complex domains
- **Naming**: Use PascalCase for interfaces, camelCase for types

#### **@concert/utils**
```typescript
// ✅ DO: Pure functions with clear purpose
export const formatDate = (date: Date | string): string => {
  // Max 50 lines per function
  // Clear input/output types
  // No side effects
};

// ✅ DO: Input validation
export const calculateAvailableSeats = (concert: Concert): number => {
  if (!concert || typeof concert.totalSeats !== 'number') {
    throw new Error('Invalid concert data');
  }
  return Math.max(0, concert.totalSeats - concert.reservedSeats);
};

// ❌ DON'T: Functions over 200 lines
// ❌ DON'T: Functions with side effects
// ❌ DON'T: Unclear function names
```

**Function Standards:**
- **Max lines**: 200 lines per function
- **Max parameters**: 5 parameters (use object for more)
- **Return types**: Always explicit
- **Error handling**: Throw descriptive errors
- **Side effects**: Prohibited (pure functions only)

#### **@concert/ui**
```typescript
// ✅ DO: Props interface with clear types
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  'data-testid'?: string;  // Always include for testing
}

// ✅ DO: Component with proper defaults
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  'data-testid': testId
}) => {
  // Max 150 lines per component
  // Use descriptive CSS classes
  // Handle all prop combinations
};

// ❌ DON'T: Components over 150 lines
// ❌ DON'T: Inline styles
// ❌ DON'T: Components without props interface
```

**UI Component Standards:**
- **Max lines**: 150 lines per component
- **Props**: Always define interface
- **Defaults**: Provide sensible defaults
- **Styling**: Use Tailwind CSS classes only
- **Testing**: Include `data-testid` for all interactive elements

#### **@concert/config**
```typescript
// ✅ DO: Environment-specific configs
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;  // Always use 'as const'

// ✅ DO: Validation rules as constants
export const VALIDATION_CONFIG = {
  USER: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;

// ❌ DON'T: Hard-coded values in application code
// ❌ DON'T: Mutable configuration objects
```

**Configuration Standards:**
- **Immutability**: Always use `as const`
- **Environment**: Support env variables with defaults
- **Grouping**: Logical grouping by feature/domain
- **Validation**: Include all validation rules

#### **@concert/api-client**
```typescript
// ✅ DO: Consistent error handling
class BaseApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Always include timeout
      // Always handle network errors
      // Always type the response
    } catch (error) {
      // Convert all errors to consistent format
      return createErrorResponse(this.handleError(error));
    }
  }
}

// ✅ DO: Type-safe service methods
export class UsersApiClient extends BaseApiClient {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.get<User[]>('/api/users');
  }
}

// ❌ DON'T: Unhandled promise rejections
// ❌ DON'T: Inconsistent response formats
```

**API Client Standards:**
- **Error handling**: Consistent across all methods
- **Timeouts**: Always include request timeouts
- **Types**: Full TypeScript coverage
- **Response format**: Consistent ApiResponse wrapper

## 🎯 Coding Standards

### **TypeScript Guidelines**

```typescript
// ✅ DO: Explicit types for public APIs
export function processUserData(
  userData: CreateUserDto
): Promise<ApiResponse<User>> {
  // Implementation
}

// ✅ DO: Use type guards
function isValidUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as User).id === 'string' &&
    typeof (data as User).email === 'string'
  );
}

// ❌ DON'T: Use 'any' type
// ❌ DON'T: Implicit return types for exported functions
// ❌ DON'T: Type assertions without validation
```

### **Naming Conventions**

```typescript
// ✅ Variables and functions: camelCase
const userName = 'john@example.com';
const calculateTotal = () => { ... };

// ✅ Types and interfaces: PascalCase
interface UserProfile { ... }
type PaymentStatus = 'pending' | 'completed';

// ✅ Constants: SCREAMING_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_ENDPOINTS = { ... };

// ✅ Files: kebab-case
// user-service.ts
// concert-validation.ts
// api-client.ts

// ✅ Packages: @org/kebab-case
// @concert/api-client
// @concert/ui-components
```

### **Error Handling Standards**

```typescript
// ✅ DO: Custom error classes
export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// ✅ DO: Consistent error responses
export const handleApiError = (error: unknown): ApiResponse => {
  if (error instanceof ValidationError) {
    return createErrorResponse(`Validation failed: ${error.message}`);
  }
  
  if (error instanceof Error) {
    return createErrorResponse(error.message);
  }
  
  return createErrorResponse('Unknown error occurred');
};

// ❌ DON'T: Silent failures
// ❌ DON'T: Generic error messages
// ❌ DON'T: Untyped error objects
```

## 🧪 Testing Standards

### **Unit Test Guidelines**

```typescript
// ✅ DO: Descriptive test names
describe('calculateAvailableSeats', () => {
  it('should return correct available seats when concert has reservations', () => {
    // Arrange
    const concert: Concert = {
      id: '1',
      totalSeats: 100,
      reservedSeats: 30,
      // ... other properties
    };

    // Act
    const result = calculateAvailableSeats(concert);

    // Assert
    expect(result).toBe(70);
  });

  it('should return 0 when concert is sold out', () => {
    // Test implementation
  });

  it('should throw error when concert data is invalid', () => {
    expect(() => calculateAvailableSeats(null as any)).toThrow();
  });
});

// ❌ DON'T: Vague test names like "should work"
// ❌ DON'T: Tests without assertions
// ❌ DON'T: Tests that test multiple things
```

**Testing Requirements:**
- **Coverage**: Minimum 80% for utils and business logic
- **Test structure**: Arrange-Act-Assert pattern
- **Naming**: Descriptive test and describe blocks
- **Isolation**: Each test should be independent

## 📝 Documentation Standards

### **Function Documentation**

```typescript
/**
 * Calculates the number of available seats for a concert
 * 
 * @param concert - Concert object with totalSeats and reservedSeats
 * @returns Number of available seats (never negative)
 * @throws {Error} When concert data is invalid or missing
 * 
 * @example
 * ```typescript
 * const concert = { totalSeats: 100, reservedSeats: 30 };
 * const available = calculateAvailableSeats(concert); // Returns 70
 * ```
 */
export const calculateAvailableSeats = (concert: Concert): number => {
  // Implementation
};
```

### **Interface Documentation**

```typescript
/**
 * Represents a user in the concert ticket system
 * 
 * @interface User
 * @property id - Unique identifier (UUID format)
 * @property email - User's email address (used for login)
 * @property name - Display name for the user
 * @property role - User's permission level
 * @property createdAt - Account creation timestamp
 * @property updatedAt - Last modification timestamp
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚨 Common Pitfalls & Anti-Patterns

### **❌ What NOT to do**

```typescript
// ❌ DON'T: Mutate props or parameters
export const updateUser = (user: User) => {
  user.updatedAt = new Date(); // Mutating input
  return user;
};

// ✅ DO: Return new objects
export const updateUser = (user: User): User => {
  return {
    ...user,
    updatedAt: new Date(),
  };
};

// ❌ DON'T: Deep nesting
if (user) {
  if (user.role === 'admin') {
    if (user.permissions) {
      if (user.permissions.includes('delete')) {
        // Too deep!
      }
    }
  }
}

// ✅ DO: Early returns
if (!user) return false;
if (user.role !== 'admin') return false;
if (!user.permissions) return false;
return user.permissions.includes('delete');

// ❌ DON'T: Magic numbers/strings
if (user.age > 18) { ... }
if (status === 'A') { ... }

// ✅ DO: Named constants
const ADULT_AGE = 18;
const ACTIVE_STATUS = 'active';
if (user.age > ADULT_AGE) { ... }
if (status === ACTIVE_STATUS) { ... }
```

## 🔧 Development Workflow

### **Branch Naming**
```bash
feature/add-user-authentication
bugfix/fix-reservation-cancel
hotfix/security-patch
refactor/improve-api-client
```

### **Commit Messages**
```bash
# ✅ Good commit messages
feat: add user authentication system
fix: resolve reservation cancellation bug
refactor: improve api client error handling
docs: update development guidelines

# ❌ Bad commit messages
update code
fix bug
changes
wip
```

### **Pull Request Guidelines**
1. **Title**: Clear description of changes
2. **Description**: What, why, and how
3. **Testing**: Include test results
4. **Breaking Changes**: Clearly marked
5. **Screenshots**: For UI changes

## 📋 Code Review Checklist

### **For Reviewers**

**Type Safety:**
- [ ] No `any` types without justification
- [ ] All exported functions have explicit return types
- [ ] Props interfaces defined for all components

**Performance:**
- [ ] No unnecessary re-renders in React components
- [ ] Efficient algorithms (no O(n²) unless necessary)
- [ ] Proper memoization where needed

**Security:**
- [ ] Input validation for all user data
- [ ] No sensitive data in client-side code
- [ ] Proper error messages (no stack traces in production)

**Maintainability:**
- [ ] Functions under 200 lines
- [ ] Components under 150 lines
- [ ] Clear variable and function names
- [ ] Adequate documentation

**Testing:**
- [ ] Unit tests for business logic
- [ ] Integration tests for API endpoints
- [ ] Component tests for UI elements

## 🎯 Package-Specific Guidelines

### **@concert/types**
- **Purpose**: Only types, interfaces, and constants
- **No logic**: No functions or classes
- **Exports**: Clear, organized exports
- **Dependencies**: None (types only)

### **@concert/utils**
- **Purpose**: Pure functions and business logic
- **No UI**: No React components or DOM manipulation
- **Testing**: 90%+ coverage required
- **Performance**: Functions should be fast (< 100ms)

### **@concert/ui**
- **Purpose**: Reusable React components
- **Styling**: Tailwind CSS only
- **Props**: Always typed with interfaces
- **Accessibility**: ARIA labels and semantic HTML

### **@concert/config**
- **Purpose**: Configuration and constants only
- **Environment**: Support env variables
- **Immutable**: All objects as const
- **No secrets**: No sensitive data

### **@concert/api-client**
- **Purpose**: HTTP client and API services
- **Error handling**: Consistent across all methods
- **Types**: Full integration with @concert/types
- **Testing**: Mock HTTP responses

## 🔄 Flexibility & Exceptions

### **When to Break Rules**

1. **Performance Critical Code**
   - Functions may exceed 200 lines for optimized algorithms
   - Document reasoning in comments

2. **Third-party Integration**
   - May require `any` types for external libraries
   - Wrap in typed interfaces ASAP

3. **Legacy Code Migration**
   - Gradual migration allowed
   - Create TODO comments with timeline

4. **Rapid Prototyping**
   - Relaxed rules for POCs
   - Must follow standards before production

### **Escalation Process**

1. **Team Discussion**: Discuss with team first
2. **Architecture Review**: For major deviations
3. **Documentation**: Update guidelines if needed
4. **Tech Debt**: Track deviations as tech debt

## 🎉 Success Metrics

### **Code Quality Indicators**
- TypeScript strict mode: 100%
- Test coverage: >80%
- Build time: <2 minutes
- Zero critical security vulnerabilities
- Consistent code style across packages

### **Team Productivity Indicators**
- Fast onboarding for new developers
- Reduced debugging time
- Consistent feature delivery
- Low bug rate in production

---

**Remember**: These guidelines exist to help us build better software together. When in doubt, prioritize **clarity** over **cleverness**, **maintainability** over **performance** (unless performance is critical), and **team consensus** over **individual preference**.

**Happy Coding! 🚀**
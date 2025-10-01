# 🎯 Context Engineering Prompts for Developers

## 📝 Overview

This document provides ready-to-use prompts for developers working with AI assistants (ChatGPT, Claude, etc.) when contributing to the Concert Ticket App monorepo. These prompts ensure consistency with our standards and best practices.

## 🏗️ Package-Specific Prompts

### **@concert/types Package**

```markdown
You are working on the @concert/types package in a TypeScript monorepo. This package contains ONLY types, interfaces, and constants - no logic or functions.

STRICT RULES:
- Max 500 lines per file
- Use PascalCase for interfaces, camelCase for types
- Always include createdAt/updatedAt for entities
- Use string for all IDs
- No 'any' types allowed
- Group related types together
- Export everything from index.ts

STRUCTURE:
- /index.ts - Main domain types (User, Concert, Reservation)
- /api/index.ts - DTOs and API request/response types
- /ui/index.ts - Component props and form types

EXAMPLE FORMAT:
```typescript
export interface User {
  id: string;           // Always string IDs
  email: string;        // Required fields first
  name: string;
  role: Role;           // Use union types
  createdAt: Date;      // Always Date type
  updatedAt: Date;
}

export type Role = 'admin' | 'user';
```

When creating new types, ask yourself:
1. Is this a domain entity, API type, or UI type?
2. Are all required fields clearly marked?
3. Are optional fields truly optional in business logic?
4. Does this conflict with existing types?

Generate code that follows these standards exactly.
```

### **@concert/utils Package**

```markdown
You are working on the @concert/utils package in a TypeScript monorepo. This package contains pure functions, business logic, and helper utilities.

STRICT RULES:
- Max 200 lines per function
- Max 5 parameters (use object for more)
- Functions must be pure (no side effects)
- Always explicit return types
- Throw descriptive errors for invalid inputs
- 90%+ test coverage required
- No React/DOM dependencies

STRUCTURE:
- /business/index.ts - Concert and reservation business logic
- /validation/index.ts - Form and data validation
- /data/index.ts - Data transformation and API helpers
- /index.ts - Common utilities (date, string, array helpers)

FUNCTION TEMPLATE:
```typescript
/**
 * Brief description of what function does
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 */
export const functionName = (param: Type): ReturnType => {
  // Input validation first
  if (!param || invalidCondition) {
    throw new Error('Descriptive error message');
  }
  
  // Main logic (keep under 50 lines if possible)
  const result = processData(param);
  
  // Return explicit type
  return result;
};
```

VALIDATION PATTERN:
```typescript
export const validateUser = (userData: CreateUserDto): string | null => {
  if (!userData.email) return 'Email is required';
  if (!isValidEmail(userData.email)) return 'Invalid email format';
  return null; // null means valid
};
```

When writing functions:
1. What is the single responsibility?
2. Can this function be tested easily?
3. Are all edge cases handled?
4. Is the function name descriptive?
5. Would another developer understand this in 6 months?

Generate pure, testable functions that follow these standards.
```

### **@concert/ui Package**

```markdown
You are working on the @concert/ui package in a TypeScript monorepo. This package contains reusable React components with Tailwind CSS styling.

STRICT RULES:
- Max 150 lines per component
- Always define Props interface
- Use Tailwind CSS classes only (no inline styles)
- Include data-testid for interactive elements
- Provide sensible defaults
- Support all common variants
- No business logic in components

STRUCTURE:
- /components/base/index.tsx - Button, Card, Modal, Badge
- /components/forms/index.tsx - Input, Select, Textarea, FormField
- /index.ts - Export all components

COMPONENT TEMPLATE:
```typescript
import React from 'react';

interface ComponentNameProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  'data-testid'?: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  'data-testid': testId
}) => {
  const baseClasses = 'base styles here';
  const variantClasses = {
    primary: 'variant-specific styles',
    secondary: 'variant-specific styles',
    danger: 'variant-specific styles'
  };
  const sizeClasses = {
    sm: 'size-specific styles',
    md: 'size-specific styles',
    lg: 'size-specific styles'
  };
  
  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  ].join(' ');
  
  return (
    <element
      className={className}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {children}
    </element>
  );
};
```

TAILWIND STANDARDS:
- Use semantic color names (blue-600, not #1234ff)
- Consistent spacing scale (px-4, py-2, etc.)
- Responsive prefixes when needed (sm:, md:, lg:)
- Focus states for accessibility (focus:ring-2)

When creating components:
1. What variants does this component need?
2. Is this component accessible?
3. Can it be used in different contexts?
4. Are all interactive states handled?
5. Is the API intuitive?

Generate accessible, reusable components that follow these standards.
```

### **@concert/config Package**

```markdown
You are working on the @concert/config package in a TypeScript monorepo. This package contains application configuration, constants, and environment variables.

STRICT RULES:
- All objects must use 'as const'
- Support environment variables with defaults
- Group by logical domains
- No functions or business logic
- No sensitive data in code
- Use SCREAMING_SNAKE_CASE for constants

STRUCTURE:
- /index.ts - All configuration exports

CONFIG TEMPLATE:
```typescript
export const FEATURE_CONFIG = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },
  VALIDATION: {
    USER: {
      NAME_MIN_LENGTH: 2,
      NAME_MAX_LENGTH: 100,
      EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  UI: {
    THEME: {
      COLORS: {
        PRIMARY: 'blue',
        SECONDARY: 'gray',
      },
    },
  },
} as const;

export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELD: (field: string) => `${field} is required`,
    INVALID_EMAIL: 'Invalid email format',
  },
  API: {
    NETWORK_ERROR: 'Network connection failed',
    SERVER_ERROR: 'Server error occurred',
  },
} as const;
```

ENVIRONMENT VARIABLE PATTERN:
```typescript
export const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PORT: process.env.API_PORT || '3001',
  ENABLE_FEATURE: process.env.ENABLE_FEATURE === 'true',
} as const;
```

When adding configuration:
1. Should this be environment-specific?
2. Is there a sensible default?
3. Where is this value used?
4. Could this change in the future?
5. Is this grouped logically?

Generate immutable configuration objects that follow these standards.
```

### **@concert/api-client Package**

```markdown
You are working on the @concert/api-client package in a TypeScript monorepo. This package provides type-safe HTTP clients for API communication.

STRICT RULES:
- All methods return Promise<ApiResponse<T>>
- Consistent error handling across all methods
- Include request timeouts
- Full TypeScript integration with @concert/types
- No business logic in client methods
- Handle all HTTP status codes

STRUCTURE:
- /index.ts - All API client classes and exports

CLIENT TEMPLATE:
```typescript
import type { ApiResponse, User, CreateUserDto } from '@concert/types';
import { API_CONFIG } from '@concert/config';

class BaseApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.message || `HTTP ${response.status}` };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return { success: false, error: 'Request timeout' };
        }
        return { success: false, error: error.message };
      }
      
      return { success: false, error: 'Unknown error occurred' };
    }
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  protected async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

export class UsersApiClient extends BaseApiClient {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.get<User[]>('/api/users');
  }

  async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
    return this.post<User>('/api/users', userData);
  }
}
```

ERROR HANDLING PATTERN:
- Network errors → Generic message
- HTTP errors → Server message or status code
- Timeout errors → "Request timeout"
- Unknown errors → "Unknown error occurred"

When creating API methods:
1. What HTTP method is appropriate?
2. What are the possible error scenarios?
3. Is the response type correct?
4. Are parameters validated?
5. Is timeout handling included?

Generate type-safe API clients that follow these standards.
```

## 🧪 Testing Prompts

### **Unit Testing Prompt**

```markdown
You are writing unit tests for the Concert Ticket App monorepo using Jest and TypeScript.

TESTING STANDARDS:
- Use Arrange-Act-Assert pattern
- Descriptive test names explaining what is being tested
- Test both success and failure cases
- Mock external dependencies
- Aim for 80%+ coverage

TEST TEMPLATE:
```typescript
describe('functionName', () => {
  describe('when given valid input', () => {
    it('should return expected result', () => {
      // Arrange
      const input = { /* test data */ };
      const expected = { /* expected output */ };

      // Act
      const result = functionName(input);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('when given invalid input', () => {
    it('should throw descriptive error', () => {
      // Arrange
      const invalidInput = null;

      // Act & Assert
      expect(() => functionName(invalidInput)).toThrow('Expected error message');
    });
  });
});
```

For React components:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';

describe('ComponentName', () => {
  it('should render with correct props', () => {
    render(<ComponentName variant="primary">Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const mockClick = jest.fn();
    render(<ComponentName onClick={mockClick}>Click me</ComponentName>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

Generate comprehensive tests that cover edge cases and follow these standards.
```

## 🔄 Refactoring Prompts

### **Code Review Prompt**

```markdown
You are conducting a code review for the Concert Ticket App monorepo. Review the provided code against our development standards.

CHECK FOR:

**Type Safety:**
- [ ] No 'any' types without justification
- [ ] Explicit return types for exported functions
- [ ] Proper type guards for runtime validation

**Code Quality:**
- [ ] Functions under 200 lines
- [ ] Components under 150 lines
- [ ] Clear, descriptive names
- [ ] Single responsibility principle

**Standards Compliance:**
- [ ] Follows package-specific rules
- [ ] Proper error handling
- [ ] Consistent naming conventions
- [ ] Adequate documentation

**Performance:**
- [ ] No unnecessary re-renders
- [ ] Efficient algorithms
- [ ] Proper memoization

FEEDBACK FORMAT:
```markdown
## ✅ Strengths
- [List what was done well]

## ⚠️ Issues to Address
- [Critical issues that must be fixed]

## 💡 Suggestions
- [Nice-to-have improvements]

## 📝 Specific Changes
```typescript
// Instead of this:
[problematic code]

// Do this:
[improved code]
```

Provide constructive, specific feedback that helps maintain code quality.
```

## 🚀 Feature Development Prompts

### **New Feature Prompt**

```markdown
You are adding a new feature to the Concert Ticket App monorepo. Follow the established patterns and architecture.

DEVELOPMENT PROCESS:
1. **Types First**: Add to @concert/types
2. **Business Logic**: Add to @concert/utils if needed
3. **API Layer**: Add to @concert/api-client
4. **UI Components**: Add to @concert/ui if reusable
5. **Configuration**: Add to @concert/config if needed

CONSIDER:
- How does this fit with existing architecture?
- What types need to be added or modified?
- What validation is required?
- What error cases need handling?
- How will this be tested?
- Is this breaking change for existing code?

IMPLEMENTATION ORDER:
1. Define types and interfaces
2. Write business logic functions
3. Create API client methods
4. Build UI components (if needed)
5. Add configuration values
6. Write tests
7. Update documentation

Start with the types and work your way up the stack. Each layer should only depend on lower layers.
```

---

## 🎯 Quick Reference Commands

Copy these prompts when working with AI assistants:

**For Types**: "Use the @concert/types prompt and create types for [feature]"

**For Utils**: "Use the @concert/utils prompt and create business logic for [functionality]"

**For UI**: "Use the @concert/ui prompt and create a [component] component"

**For Config**: "Use the @concert/config prompt and add configuration for [feature]"

**For API**: "Use the @concert/api-client prompt and create API methods for [entity]"

**For Testing**: "Use the unit testing prompt and create tests for [function/component]"

**For Review**: "Use the code review prompt and review this code: [paste code]"

These prompts ensure consistency across all team members when using AI assistance. 🤖✨
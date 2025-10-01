# 📋 File-Specific Standards & Conventions

## 📁 File Organization & Naming

### **File Naming Conventions**

```bash
# ✅ Good file names
user-service.ts              # kebab-case for utilities
concert-validation.ts        # descriptive and specific
api-client.ts               # clear purpose
UserCard.tsx                # PascalCase for React components
useUserData.ts              # camelCase for hooks
index.ts                    # barrel exports

# ❌ Bad file names
utils.ts                    # too generic
stuff.ts                   # meaningless
UserCardComponent.tsx       # redundant "Component"
usercard.tsx               # inconsistent casing
temp.ts                    # temporary files in repo
```

### **Directory Structure Standards**

```
packages/
├── types/
│   ├── index.ts           # Main domain types
│   ├── api/
│   │   └── index.ts       # API DTOs
│   └── ui/
│       └── index.ts       # UI prop types
│
├── utils/
│   ├── index.ts           # Common utilities
│   ├── business/
│   │   └── index.ts       # Domain logic
│   ├── validation/
│   │   └── index.ts       # Validation helpers
│   └── data/
│       └── index.ts       # Data transformation
│
├── ui/
│   ├── index.ts           # All component exports
│   └── components/
│       ├── base/
│       │   ├── index.tsx  # Base components
│       │   ├── Button.tsx # Individual components (optional)
│       │   └── Card.tsx
│       └── forms/
│           └── index.tsx  # Form components
```

## 📄 File-Specific Standards

### **index.ts Files (Barrel Exports)**

```typescript
// ✅ DO: Clean, organized exports
// Export types first
export type { User, Concert, Reservation } from './domain-types';
export type { Role, UserStatus } from './enums';

// Export constants
export { ROLE_ARRAYS, DEFAULT_VALUES } from './constants';

// Re-export from subdirectories
export * from './api';
export * from './ui';

// ❌ DON'T: Mixed exports without organization
export * from './everything'; // Too broad
export { someFunction, SomeType, SOME_CONSTANT } from './mixed'; // Unorganized
```

**Index File Rules:**
- **Max 50 exports** per index file
- **Group exports** by type (types, constants, functions)
- **Document** complex re-exports
- **No logic** in index files (exports only)

### **Type Definition Files**

```typescript
// packages/types/domain-types.ts

// ✅ DO: Well-documented interfaces
/**
 * Core user entity in the concert ticket system
 * 
 * @interface User
 * @since 1.0.0
 */
export interface User {
  /** Unique identifier (UUID v4) */
  id: string;
  
  /** User's email address - used for authentication */
  email: string;
  
  /** Display name for the user */
  name: string;
  
  /** User's role determining permissions */
  role: Role;
  
  /** Timestamp when user account was created */
  createdAt: Date;
  
  /** Timestamp when user data was last modified */
  updatedAt: Date;
}

// ✅ DO: Related types grouped together
export type Role = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive' | 'suspended';

// ✅ DO: Validation-friendly types
export interface CreateUserDto {
  email: string;           // Required
  name: string;           // Required
  role?: Role;            // Optional with default
}

// ❌ DON'T: Unclear or overly generic types
export interface Data { ... }           // Too generic
export interface UserThing { ... }      // Unclear purpose
export interface UserEx { ... }         // Abbreviated names
```

**Type File Rules:**
- **Max 20 interfaces** per file
- **Document** all public interfaces
- **Group** related types together
- **Use descriptive names** (no abbreviations)
- **Include examples** for complex types

### **Utility Function Files**

```typescript
// packages/utils/business/concert-logic.ts

import type { Concert, Reservation } from '@concert/types';

/**
 * Calculates available seats for a concert
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * 
 * @param concert - Concert with totalSeats and reservedSeats
 * @returns Number of available seats (0 if sold out)
 * @throws {Error} When concert data is invalid
 * 
 * @example
 * ```typescript
 * const concert = { totalSeats: 100, reservedSeats: 30 };
 * const available = calculateAvailableSeats(concert); // 70
 * ```
 */
export const calculateAvailableSeats = (concert: Concert): number => {
  // Input validation
  if (!concert) {
    throw new Error('Concert data is required');
  }
  
  if (typeof concert.totalSeats !== 'number' || concert.totalSeats < 0) {
    throw new Error('Invalid totalSeats value');
  }
  
  if (typeof concert.reservedSeats !== 'number' || concert.reservedSeats < 0) {
    throw new Error('Invalid reservedSeats value');
  }
  
  // Business logic
  const available = concert.totalSeats - concert.reservedSeats;
  return Math.max(0, available);
};

// ✅ DO: Small, focused functions
export const isConcertSoldOut = (concert: Concert): boolean => {
  return calculateAvailableSeats(concert) === 0;
};

// ✅ DO: Composed functions
export const isConcertBookable = (concert: Concert): boolean => {
  return !isConcertSoldOut(concert) && 
         new Date(concert.date) > new Date();
};

// ❌ DON'T: Large, multi-purpose functions
export const processEverything = (data: any) => {
  // 200+ lines of mixed logic
  // Multiple responsibilities
  // Hard to test and maintain
};
```

**Utility File Rules:**
- **Max 10 functions** per file
- **Max 50 lines** per function (prefer 20-30)
- **Single responsibility** per function
- **Pure functions** only (no side effects)
- **Input validation** for all parameters
- **Performance notes** for complex algorithms

### **React Component Files**

```typescript
// packages/ui/components/base/Button.tsx

import React from 'react';
import type { ButtonProps } from '@concert/types/ui';

/**
 * Reusable button component with consistent styling
 * 
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  'data-testid': testId = 'button'
}) => {
  // Style calculations (max 20 lines)
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const className = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
  ].join(' ');
  
  // Event handlers (if complex, extract to hooks)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };
  
  // Render (max 30 lines)
  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={disabled || loading}
      data-testid={testId}
      aria-busy={loading}
      aria-disabled={disabled}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-3 h-5 w-5" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

// ✅ DO: Export default for single component files
export default Button;

// ❌ DON'T: Multiple components in one file (unless very related)
export const AnotherButton = () => { ... }; // Create separate file
```

**Component File Rules:**
- **One main component** per file
- **Max 150 lines** total
- **Props interface** in separate types file
- **Accessibility** attributes required
- **Data-testid** for testing
- **Extract** complex logic to custom hooks

### **Configuration Files**

```typescript
// packages/config/index.ts

// ✅ DO: Environment-aware configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * API configuration for different environments
 * 
 * @constant
 * @since 1.0.0
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || (
    isDevelopment ? 'http://localhost:3001' : 'https://api.example.com'
  ),
  TIMEOUT: parseInt(process.env.API_TIMEOUT || '10000', 10),
  RETRY_ATTEMPTS: parseInt(process.env.API_RETRY_ATTEMPTS || '3', 10),
  
  ENDPOINTS: {
    USERS: '/api/users',
    CONCERTS: '/api/concerts',
    RESERVATIONS: '/api/reservations',
  } as const,
} as const;

/**
 * Validation rules used throughout the application
 * 
 * @constant
 * @since 1.0.0
 */
export const VALIDATION_CONFIG = {
  USER: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 8,
  },
  
  CONCERT: {
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 200,
    DESCRIPTION_MIN_LENGTH: 10,
    DESCRIPTION_MAX_LENGTH: 1000,
    MIN_SEATS: 1,
    MAX_SEATS: 100000,
  },
} as const;

/**
 * Error messages for consistent user feedback
 * 
 * @constant
 * @since 1.0.0
 */
export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED_FIELD: (field: string) => `${field} is required`,
    MIN_LENGTH: (field: string, min: number) => `${field} must be at least ${min} characters`,
    MAX_LENGTH: (field: string, max: number) => `${field} must not exceed ${max} characters`,
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_DATE: 'Please enter a valid date',
  },
  
  API: {
    NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    NOT_FOUND: 'The requested resource was not found.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
  },
} as const;

// ❌ DON'T: Mutable configuration
export let mutableConfig = { ... }; // Use const instead

// ❌ DON'T: Secrets in configuration files
export const SECRET_KEY = 'secret123'; // Use environment variables
```

**Configuration File Rules:**
- **Immutable objects** (use `as const`)
- **Environment variables** with defaults
- **Grouped** by feature/domain
- **Documented** with JSDoc
- **No secrets** in code
- **Type-safe** access patterns

### **API Client Files**

```typescript
// packages/api-client/users-client.ts

import type { User, CreateUserDto, ApiResponse } from '@concert/types';
import { API_CONFIG, ERROR_MESSAGES } from '@concert/config';
import { createErrorResponse } from '@concert/utils/data';
import { BaseApiClient } from './base-client';

/**
 * API client for user-related operations
 * 
 * @class UsersApiClient
 * @extends BaseApiClient
 * @since 1.0.0
 */
export class UsersApiClient extends BaseApiClient {
  private readonly endpoint = API_CONFIG.ENDPOINTS.USERS;
  
  /**
   * Retrieves all users from the API
   * 
   * @returns Promise resolving to API response with user array
   * @throws {Error} When network request fails
   * 
   * @example
   * ```typescript
   * const response = await usersClient.getUsers();
   * if (response.success) {
   *   console.log(response.data); // User[]
   * }
   * ```
   */
  async getUsers(): Promise<ApiResponse<User[]>> {
    try {
      return await this.get<User[]>(this.endpoint);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Retrieves a specific user by ID
   * 
   * @param id - User's unique identifier
   * @returns Promise resolving to API response with user data
   */
  async getUserById(id: string): Promise<ApiResponse<User>> {
    if (!id) {
      return createErrorResponse('User ID is required');
    }
    
    try {
      return await this.get<User>(`${this.endpoint}/${id}`);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Creates a new user
   * 
   * @param userData - User data for creation
   * @returns Promise resolving to API response with created user
   */
  async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
    if (!userData) {
      return createErrorResponse('User data is required');
    }
    
    try {
      return await this.post<User>(this.endpoint, userData);
    } catch (error) {
      return this.handleError(error);
    }
  }
  
  /**
   * Handles API errors consistently
   * 
   * @private
   * @param error - Error object from API call
   * @returns Formatted error response
   */
  private handleError(error: unknown): ApiResponse {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return createErrorResponse(ERROR_MESSAGES.API.NETWORK_ERROR);
      }
      return createErrorResponse(error.message);
    }
    
    return createErrorResponse(ERROR_MESSAGES.API.SERVER_ERROR);
  }
}

// ✅ DO: Export both class and instance
export const usersApiClient = new UsersApiClient();
export default UsersApiClient;
```

**API Client File Rules:**
- **One service** per file
- **Consistent error handling** across all methods
- **Input validation** for all parameters
- **JSDoc documentation** for all public methods
- **Private helpers** for common operations
- **Export both class and instance**

## 🔧 File Maintenance Standards

### **File Size Limits**

| File Type | Max Lines | Max Functions/Components | Notes |
|-----------|-----------|-------------------------|-------|
| Types | 500 | N/A (types only) | Split by domain if larger |
| Utils | 400 | 10 functions | Split by responsibility |
| Components | 150 | 1 component | Extract hooks for logic |
| API Clients | 300 | 1 service class | Split by entity |
| Config | 200 | N/A (constants only) | Group by feature |
| Tests | 1000 | N/A | Can be longer for coverage |

### **Import/Export Standards**

```typescript
// ✅ DO: Organized imports
// External libraries first
import React from 'react';
import { z } from 'zod';

// Internal packages (alphabetical)
import type { User, Concert } from '@concert/types';
import { API_CONFIG } from '@concert/config';
import { formatDate } from '@concert/utils';

// Relative imports last
import { Button } from '../components/Button';
import { useLocalStorage } from './hooks/useLocalStorage';

// ✅ DO: Named exports for utilities
export const validateUser = () => { ... };
export const formatUserName = () => { ... };

// ✅ DO: Default exports for single-purpose files
export default function UserProfile() { ... }

// ❌ DON'T: Mixed import styles
import React, { useState, useEffect } from 'react'; // Inconsistent
import * as Utils from '@concert/utils'; // Too broad
```

### **Comment Standards**

```typescript
// ✅ DO: JSDoc for public APIs
/**
 * Calculates the total price including taxes
 * 
 * @param basePrice - Base price before taxes
 * @param taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns Total price including taxes
 * @throws {Error} When basePrice is negative
 * 
 * @example
 * ```typescript
 * const total = calculateTotal(100, 0.1); // 110
 * ```
 */
export const calculateTotal = (basePrice: number, taxRate: number): number => {
  // Implementation
};

// ✅ DO: Inline comments for complex logic
const complexCalculation = (data: ComplexData): number => {
  // Apply business rule: discount only for premium users
  const baseDiscount = data.isPremium ? 0.1 : 0;
  
  // Calculate progressive discount based on quantity
  const quantityDiscount = Math.min(data.quantity * 0.02, 0.2);
  
  return baseDiscount + quantityDiscount;
};

// ❌ DON'T: Obvious comments
const total = price + tax; // Add price and tax - OBVIOUS!

// ❌ DON'T: Outdated comments
// TODO: Fix this bug (from 2022) - STALE!
```

### **Error Handling Patterns**

```typescript
// ✅ DO: Specific error types
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

// ✅ DO: Error boundaries for components
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

// ✅ DO: Graceful degradation
export const formatDate = (date: Date | string): string => {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return 'Invalid date';
    }
    return d.toLocaleDateString();
  } catch {
    return 'Unknown date';
  }
};
```

---

## 📋 Quick File Standards Checklist

Before committing any file, verify:

- [ ] **Naming**: Follows naming conventions
- [ ] **Size**: Within size limits
- [ ] **Imports**: Organized and necessary only
- [ ] **Exports**: Clear and consistent
- [ ] **Documentation**: JSDoc for public APIs
- [ ] **Types**: All public functions/components typed
- [ ] **Error Handling**: Appropriate for the context
- [ ] **Testing**: Testable structure
- [ ] **Standards**: Follows package-specific rules

**Remember**: Good file organization is the foundation of maintainable code! 🏗️
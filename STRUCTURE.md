# 🎯 Monorepo Structure & File Definition

## 📁 โครงสร้าง Monorepo หลังการปรับปรุง

```
concert-ticket-app/
├── 📁 apps/                      # Applications
│   ├── 📁 api/                   # NestJS Backend API
│   │   ├── 📄 package.json       # API dependencies
│   │   └── 📁 src/
│   │       ├── 📁 modules/       # Feature modules
│   │       ├── 📁 common/        # Common utilities
│   │       └── 📄 main.ts        # Application entry point
│   └── 📁 web/                   # Next.js Frontend
│       ├── 📄 package.json       # Web dependencies
│       └── 📁 src/
│           ├── 📁 app/           # Next.js app router
│           ├── 📁 components/    # React components
│           ├── 📁 services/      # API services
│           └── 📁 types/         # Local types
│
├── 📁 packages/                  # Shared Packages
│   ├── 📁 types/                 # @concert/types
│   │   ├── 📄 package.json       # Types package config
│   │   ├── 📄 index.ts          # Domain types export
│   │   ├── 📁 api/              # API-specific types
│   │   │   └── 📄 index.ts      # DTOs & API types
│   │   └── 📁 ui/               # UI-specific types
│   │       └── 📄 index.ts      # Component prop types
│   │
│   ├── 📁 utils/                 # @concert/utils
│   │   ├── 📄 package.json       # Utils package config
│   │   ├── 📄 index.ts          # Common utilities
│   │   ├── 📁 business/         # Business logic utils
│   │   │   └── 📄 index.ts      # Concert/Reservation logic
│   │   ├── 📁 validation/       # Validation helpers
│   │   │   └── 📄 index.ts      # Form validation
│   │   └── 📁 data/            # Data transformation
│   │       └── 📄 index.ts      # API helpers
│   │
│   ├── 📁 ui/                   # @concert/ui
│   │   ├── 📄 package.json       # UI package config
│   │   ├── 📄 index.ts          # Component exports
│   │   └── 📁 components/
│   │       ├── 📁 base/         # Base components
│   │       │   └── 📄 index.tsx # Button, Card, Modal
│   │       └── 📁 forms/        # Form components
│   │           └── 📄 index.tsx # Input, Select, FormField
│   │
│   ├── 📁 config/               # @concert/config
│   │   ├── 📄 package.json       # Config package
│   │   └── 📄 index.ts          # App configurations
│   │
│   └── 📁 api-client/           # @concert/api-client
│       ├── 📄 package.json       # API client package
│       └── 📄 index.ts          # HTTP client & services
│
├── 📄 package.json              # Root package config
├── 📄 pnpm-workspace.yaml       # Workspace definition
├── 📄 README.md                 # Setup instructions
└── 📄 STRUCTURE.md              # This file
```

## 🎯 Package Definitions & Responsibilities

### 📦 @concert/types
**Purpose**: Centralized TypeScript types and interfaces
- **Domain Types**: User, Concert, Reservation core interfaces
- **API Types**: DTOs for data transfer between frontend/backend
- **UI Types**: React component prop types and form types
- **Usage**: Import in all packages and apps for type safety

### 📦 @concert/utils
**Purpose**: Shared utility functions and business logic
- **Business Logic**: Concert availability, reservation validation
- **Validation**: Form validation helpers and rules
- **Data Transformation**: API response formatting, data conversion
- **Usage**: Reusable logic across frontend and backend

### 📦 @concert/ui
**Purpose**: Shared React UI components
- **Base Components**: Button, Card, Modal, Badge
- **Form Components**: Input, Select, Textarea, FormField
- **Benefits**: Consistent UI across applications
- **Usage**: Import components in web application

### 📦 @concert/config
**Purpose**: Shared configuration and constants
- **Environment Config**: API URLs, ports, feature flags
- **Validation Rules**: Min/max lengths, regex patterns
- **Error/Success Messages**: Localized message constants
- **Usage**: Single source of truth for configurations

### 📦 @concert/api-client
**Purpose**: Centralized API communication layer
- **HTTP Client**: Base fetch wrapper with error handling
- **Service Classes**: Users, Concerts, Reservations APIs
- **Type Safety**: Full TypeScript integration with @concert/types
- **Usage**: Replace manual fetch calls in frontend

## 🔄 Data Flow & Dependencies

```
┌─────────────────┐    ┌─────────────────┐
│   apps/web      │    │   apps/api      │
│   (Next.js)     │◄──►│   (NestJS)      │
└─────────────────┘    └─────────────────┘
         │                        │
         ▼                        ▼
┌─────────────────────────────────────────────┐
│           Shared Packages                    │
├─────────────────────────────────────────────┤
│ @concert/types      │ @concert/utils        │
│ @concert/ui         │ @concert/config       │
│ @concert/api-client │                       │
└─────────────────────────────────────────────┘
```

## 🛠️ Development Workflow

### 1. Adding New Types
```typescript
// 1. Add to packages/types/index.ts
export interface NewEntity {
  id: string;
  name: string;
}

// 2. Add API types to packages/types/api/index.ts
export interface CreateNewEntityDto {
  name: string;
}

// 3. Use in apps
import { NewEntity, CreateNewEntityDto } from '@concert/types';
```

### 2. Adding Business Logic
```typescript
// 1. Add to packages/utils/business/index.ts
export const validateNewEntity = (entity: NewEntity): boolean => {
  return entity.name.length > 0;
};

// 2. Use in applications
import { validateNewEntity } from '@concert/utils/business';
```

### 3. Adding UI Components
```typescript
// 1. Add to packages/ui/components/base/index.tsx
export const NewComponent: React.FC<NewComponentProps> = ({ ... }) => {
  return <div>...</div>;
};

// 2. Use in web app
import { NewComponent } from '@concert/ui';
```

### 4. Adding API Endpoints
```typescript
// 1. Add to packages/api-client/index.ts
export class NewEntityApiClient extends BaseApiClient {
  async getNewEntities(): Promise<ApiResponse<NewEntity[]>> {
    return this.get<NewEntity[]>('/api/new-entities');
  }
}

// 2. Use in frontend
import { apiClient } from '@concert/api-client';
const entities = await apiClient.newEntities.getNewEntities();
```

## 📋 Package Scripts

### Root Level Commands
```bash
pnpm dev                 # Start both API and Web
pnpm build              # Build all packages and apps
pnpm type-check         # Type check all packages
pnpm lint              # Lint all packages
pnpm test              # Run all tests
pnpm clean             # Clean all build artifacts
```

### Package Level Commands
```bash
pnpm --filter @concert/types type-check    # Check types package
pnpm --filter @concert/utils build         # Build utils package
pnpm --filter web dev                       # Start web app only
pnpm --filter api test                      # Test API only
```

## 🔄 Migration Benefits

### ✅ Before vs After

**Before (Problems)**:
- ❌ Duplicate types in API and Frontend
- ❌ Inconsistent type definitions
- ❌ No shared utilities
- ❌ Manual API calls with no type safety
- ❌ No shared UI components

**After (Solutions)**:
- ✅ Single source of truth for types
- ✅ Consistent type definitions across all apps
- ✅ Reusable business logic and utilities
- ✅ Type-safe API client with error handling
- ✅ Shared UI component library
- ✅ Centralized configuration management
- ✅ Better developer experience with IntelliSense
- ✅ Easier testing and maintenance
- ✅ Scalable for new apps and features

## 🚀 Future Expansions

### Easy to Add:
1. **@concert/database** - Database utilities and migrations
2. **@concert/auth** - Authentication and authorization
3. **@concert/notifications** - Push notifications and emails
4. **@concert/analytics** - Event tracking and analytics
5. **New Apps** - Mobile app, Admin panel, etc.

### Benefits for Team Development:
- 🎯 **Clear Separation of Concerns**
- 🔄 **Code Reusability**
- 🛡️ **Type Safety Everywhere**
- 📈 **Scalable Architecture**
- 🧪 **Easier Testing**
- 📚 **Better Documentation**

export type Role = 'admin' | 'user';

export const ROLE_ARRAYS = {
  ADMIN_ONLY: ["admin"] as const,
  USER_ONLY: ["user"] as const,
  ALL_ROLES: ["admin", "user"] as const,
} satisfies Record<string, readonly Role[]>;

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Role permissions
export interface RolePermissions {
  canCreateEvents: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canBookTickets: boolean;
  canCancelBookings: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, RolePermissions> = {
  admin: {
    canCreateEvents: true,
    canManageUsers: true,
    canViewAnalytics: true,
    canBookTickets: true,
    canCancelBookings: true,
  },
  user: {
    canCreateEvents: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canBookTickets: true,
    canCancelBookings: true,
  },
};

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  timestamp: string;
}

// Common status types
export type Status = 'pending' | 'confirmed' | 'cancelled';
export type TicketStatus = 'active' | 'cancelled' | 'used';

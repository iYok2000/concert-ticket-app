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

// Loading states - simplified to only what we actually use
export interface LoadingState {
  isRoleSwitching: boolean;
  loadingMessage?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Concert and Ticket types
export interface Concert {
  id: string;
  title: string;
  artist: string;
  venue: string;
  date: Date;
  price: number;
  availableSeats: number;
  description?: string;
  imageUrl?: string;
}

export interface Ticket {
  id: string;
  concertId: string;
  userId: string;
  seatNumber: string;
  purchaseDate: Date;
  status: 'active' | 'cancelled' | 'used';
}

// Navigation types
export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  requiredRoles?: Role[];
}

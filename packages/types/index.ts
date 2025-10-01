// Core Domain Types
export type Role = 'admin' | 'user';
export type ReservationStatus = 'confirmed' | 'cancelled';

// Role Arrays for Authorization
export const ROLE_ARRAYS = {
  ADMIN_ONLY: ['admin'] as Role[],
  USER_ONLY: ['user'] as Role[],
  ALL_ROLES: ['admin', 'user'] as Role[],
} as const;

// Base Domain Interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Concert {
  id: string;
  name: string;
  description: string;
  date: Date;
  venue: string;
  totalSeats: number;
  reservedSeats: number;
  availableSeats: number;
  soldOut?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: string;
  userId: string;
  concertId: string;
  status: ReservationStatus;
  createdAt: Date;
  updatedAt: Date;
  // Populated fields for enriched responses
  user?: User;
  concert?: Concert;
}

// Common Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Re-export API and UI types
export * from './api';
export * from './ui';
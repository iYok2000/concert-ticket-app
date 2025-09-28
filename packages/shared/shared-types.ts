export type Role = 'admin' | 'user';

export const ROLE_ARRAYS = {
  ADMIN_ONLY: ['admin'] as Role[],
  USER_ONLY: ['user'] as Role[],
  ALL_ROLES: ['admin', 'user'] as Role[],
};

export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseConcert {
  id: string;
  name: string;
  description: string;
  date: Date;
  venue: string;
  totalSeats: number;
  reservedSeats: number;
  availableSeats: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseReservation {
  id: string;
  userId: string;
  concertId: string;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReservationDto {
  userId: string;
  concertId: string;
}
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

export type User = BaseUser;
export type Concert = BaseConcert;
export type Reservation = BaseReservation;

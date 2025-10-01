// API Data Transfer Objects (DTOs)
export interface CreateUserDto {
  email: string;
  name: string;
  role?: Role;
}

export interface CreateConcertDto {
  name: string;
  description: string;
  date: Date | string;
  venue: string;
  totalSeats: number;
}

export interface UpdateConcertDto {
  name?: string;
  description?: string;
  date?: Date | string;
  venue?: string;
  totalSeats?: number;
}

export interface CreateReservationDto {
  userId: string;
  concertId: string;
}

export interface UpdateReservationDto {
  status?: ReservationStatus;
}

// API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// API Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Query Parameters
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface ReservationQuery extends PaginationQuery {
  userId?: string;
  concertId?: string;
  status?: ReservationStatus;
}

// Import types from parent
import type { Role, ReservationStatus, User } from '../index';
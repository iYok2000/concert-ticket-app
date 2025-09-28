// ============================================
// Backend/API Types - สำหรับ NestJS API และ Database
// ============================================

// Concert Entity (Database)
export interface Concert {
  id: string;
  name: string;
  description?: string;
  totalSeats: number;
  reservedSeats: number;
}

// Reservation Entity (Database)
export interface Reservation {
  id: string;
  userId: string;
  concertId: string;
  createdAt: Date;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Extended types for API responses
export interface ConcertWithAvailability extends Concert {
  isSoldOut: boolean;
  availableSeats: number;
}

export interface ReservationWithDetails extends Reservation {
  concert: Concert;
}

// Admin reservation details with user info
export interface AdminReservationDetails extends Reservation {
  concert: Concert;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

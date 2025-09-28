// Export all shared types and interfaces
export * from './types';

// Concert related types
export interface Concert {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
}

// Ticket related types
export interface Ticket {
  id: string;
  concertId: string;
  userId: string;
  seatNumber: string;
  price: number;
  status: 'booked' | 'confirmed' | 'cancelled';
  bookedAt: Date;
}

// Booking related types
export interface Booking {
  id: string;
  userId: string;
  concertId: string;
  tickets: Ticket[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}
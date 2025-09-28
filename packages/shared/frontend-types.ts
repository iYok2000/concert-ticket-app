import { Role } from './shared-types';

export interface ConcertDisplay {
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

export interface TicketDisplay {
  id: string;
  concertId: string;
  userId: string;
  seatNumber: string;
  purchaseDate: Date;
  status: 'active' | 'cancelled' | 'used';
  concert?: ConcertDisplay;
}
export interface UserDisplay {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date;
    isActive: boolean;
}

export interface BookingDisplay {
  id: string;
  userId: string;
  concertId: string;
  tickets: TicketDisplay[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  concert?: ConcertDisplay;
}

export interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  requiredRoles?: Role[];
}

export interface LoadingState {
  isRoleSwitching: boolean;
  loadingMessage?: string;
}

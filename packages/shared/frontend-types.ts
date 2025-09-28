import { User, Concert, Reservation } from './shared-types';

export interface ConcertCardProps {
  concert: Concert;
  onReserve?: (concertId: string) => void;
  showReserveButton?: boolean;
}

export interface ReservationListProps {
  reservations: Reservation[];
  onCancel?: (reservationId: string) => void;
  showActions?: boolean;
}

export interface ConcertForm {
  name: string;
  description: string;
  totalSeats: number;
}

export interface UserForm {
  email: string;
  name: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ConcertListState extends LoadingState {
  concerts: Concert[];
  filter: 'all' | 'available' | 'sold-out';
}

export interface ReservationState extends LoadingState {
  reservations: Reservation[];
  selectedReservation: Reservation | null;
}

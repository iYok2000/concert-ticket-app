// Business logic utilities - self-contained without external dependencies

// Type definitions (copied locally to avoid circular imports)
type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'expired';

interface Concert {
  id: string;
  title: string;
  artist: string;
  venue: string;
  date: Date;
  price: number;
  availableSeats: number;
  totalSeats: number;
  reservedSeats: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
}

interface Reservation {
  id: string;
  concertId: string;
  userId: string;
  numberOfSeats: number;
  totalPrice: number;
  status: ReservationStatus;
  createdAt: Date;
  expiresAt?: Date;
  concert?: Concert;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'organizer';
}

// Concert Business Logic
export const calculateAvailableSeats = (concert: Concert): number => {
  return Math.max(0, concert.totalSeats - concert.reservedSeats);
};

export const isConcertSoldOut = (concert: Concert): boolean => {
  return calculateAvailableSeats(concert) === 0;
};

export const isConcertBookable = (concert: Concert): boolean => {
  return !isConcertSoldOut(concert) && new Date(concert.date) > new Date();
};

export const getConcertStatus = (concert: Concert): 'upcoming' | 'past' | 'sold-out' => {
  if (isConcertSoldOut(concert)) return 'sold-out';
  if (new Date(concert.date) < new Date()) return 'past';
  return 'upcoming';
};

// Reservation Business Logic
export const canCancelReservation = (reservation: Reservation): boolean => {
  return reservation.status === 'confirmed' && 
         reservation.concert ? 
         new Date(reservation.concert.date) > new Date() : true;
};

export const getReservationStatusColor = (status: ReservationStatus): string => {
  switch (status) {
    case 'confirmed':
      return 'text-green-600 bg-green-100';
    case 'cancelled':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const getReservationStatusText = (status: ReservationStatus): string => {
  switch (status) {
    case 'confirmed':
      return 'ยืนยันแล้ว';
    case 'cancelled':
      return 'ยกเลิกแล้ว';
    default:
      return status;
  }
};

// User Business Logic
export const isAdminUser = (user: User): boolean => {
  return user.role === 'admin';
};

export const getUserDisplayName = (user: User): string => {
  return user.name || user.email;
};

export const canUserAccessAdminFeatures = (user: User): boolean => {
  return isAdminUser(user);
};

// Concert Capacity Logic
export const getCapacityPercentage = (concert: Concert): number => {
  if (concert.totalSeats === 0) return 0;
  return Math.round((concert.reservedSeats / concert.totalSeats) * 100);
};

export const getCapacityLevel = (concert: Concert): 'low' | 'medium' | 'high' | 'full' => {
  const percentage = getCapacityPercentage(concert);
  if (percentage === 100) return 'full';
  if (percentage >= 80) return 'high';
  if (percentage >= 50) return 'medium';
  return 'low';
};

export const getCapacityColor = (concert: Concert): string => {
  const level = getCapacityLevel(concert);
  switch (level) {
    case 'low':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'high':
      return 'text-orange-600';
    case 'full':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};
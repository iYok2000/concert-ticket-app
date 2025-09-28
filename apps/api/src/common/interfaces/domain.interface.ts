export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
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
  soldOut: boolean;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  userId: string;
  concertId: string;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
  user?: User;
  concert?: Concert;
}

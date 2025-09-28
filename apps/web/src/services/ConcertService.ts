import { Concert, CreateReservationDto, Reservation } from "@concert/shared";

const API_URL = "http://localhost:3001";

export class ConcertService {
  static async getAllConcerts(): Promise<Concert[]> {
    const response = await fetch(`${API_URL}/concerts`);
    if (!response.ok) {
      throw new Error('Failed to fetch concerts');
    }
    const result = await response.json();
    // Handle API response format { success: true, data: [...] }
    return result.success ? result.data : result;
  }

  static async getConcertById(id: string): Promise<Concert> {
    const response = await fetch(`${API_URL}/concerts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch concert');
    }
    const result = await response.json();
    return result.success ? result.data : result;
  }

  static async createConcert(concertData: Omit<Concert, 'id' | 'createdAt' | 'updatedAt' | 'availableSeats' | 'reservedSeats'>): Promise<Concert> {
    // Remove availableSeats and reservedSeats as API calculates them
    const { ...cleanData } = concertData;
    
    const response = await fetch(`${API_URL}/concerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create concert');
    }

    const result = await response.json();
    return result.success ? result.data : result;
  }
}

export class ReservationService {
  static async createReservation(reservationData: CreateReservationDto): Promise<Reservation> {
    const response = await fetch(`${API_URL}/reservations/${reservationData.concertId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: reservationData.userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create reservation');
    }

    const result = await response.json();
    return result.success ? result.data : result;
  }

  static async getMyReservations(userId: string): Promise<Reservation[]> {
    const response = await fetch(`${API_URL}/reservations/me?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    const result = await response.json();
    return result.success ? result.data : result;
  }

  static async getAllReservations(): Promise<Reservation[]> {
    const response = await fetch(`${API_URL}/reservations/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch all reservations');
    }
    const result = await response.json();
    return result.success ? result.data : result;
  }

  static async cancelReservation(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/reservations/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to cancel reservation');
    }
  }
}

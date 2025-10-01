// API Client - self-contained without external dependencies

// Type definitions (copied locally to avoid circular imports)
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface Concert {
  id: string;
  title: string;
  artist: string;
  venue: string;
  date: Date;
  price: number;
  availableSeats: number;
  totalSeats: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
}

interface CreateConcertDto {
  title: string;
  artist: string;
  venue: string;
  date: string;
  price: number;
  totalSeats: number;
}

interface UpdateConcertDto extends Partial<CreateConcertDto> {
  id: string;
}

interface Reservation {
  id: string;
  concertId: string;
  userId: string;
  numberOfSeats: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'expired';
  createdAt: Date;
  expiresAt?: Date;
}

interface CreateReservationDto {
  concertId: string;
  numberOfSeats: number;
}

interface UpdateReservationDto extends Partial<CreateReservationDto> {
  id: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'organizer';
}

interface CreateUserDto {
  email: string;
  name: string;
  password: string;
}

// Configuration
const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    CONCERTS: '/api/concerts',
    RESERVATIONS: '/api/reservations',
    USERS: '/api/users',
  },
} as const;

// Helper functions (simplified versions)
const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string,
  error?: string
): ApiResponse<T> => {
  return {
    success,
    data,
    message,
    error,
  };
};

const createErrorResponse = <T>(
  message: string,
  error?: string
): ApiResponse<T> => {
  return createApiResponse<T>(false, undefined, message, error);
};

// Base API Client Class
class BaseApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        return createErrorResponse(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return createErrorResponse('Request timeout');
        }
        return createErrorResponse(error.message);
      }
      
      return createErrorResponse('Unknown error occurred');
    }
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  protected async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Users API Client
export class UsersApiClient extends BaseApiClient {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.get<User[]>(API_CONFIG.ENDPOINTS.USERS);
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
  }

  async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
    return this.post<User>(API_CONFIG.ENDPOINTS.USERS, userData);
  }

  async updateUser(id: string, userData: Partial<CreateUserDto>): Promise<ApiResponse<User>> {
    return this.put<User>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`, userData);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`${API_CONFIG.ENDPOINTS.USERS}/${id}`);
  }
}

// Concerts API Client
export class ConcertsApiClient extends BaseApiClient {
  async getConcerts(): Promise<ApiResponse<Concert[]>> {
    return this.get<Concert[]>(API_CONFIG.ENDPOINTS.CONCERTS);
  }

  async getConcertById(id: string): Promise<ApiResponse<Concert>> {
    return this.get<Concert>(`${API_CONFIG.ENDPOINTS.CONCERTS}/${id}`);
  }

  async createConcert(concertData: CreateConcertDto): Promise<ApiResponse<Concert>> {
    return this.post<Concert>(API_CONFIG.ENDPOINTS.CONCERTS, concertData);
  }

  async updateConcert(id: string, concertData: UpdateConcertDto): Promise<ApiResponse<Concert>> {
    return this.put<Concert>(`${API_CONFIG.ENDPOINTS.CONCERTS}/${id}`, concertData);
  }

  async deleteConcert(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`${API_CONFIG.ENDPOINTS.CONCERTS}/${id}`);
  }
}

// Reservations API Client
export class ReservationsApiClient extends BaseApiClient {
  async getReservations(): Promise<ApiResponse<Reservation[]>> {
    return this.get<Reservation[]>(API_CONFIG.ENDPOINTS.RESERVATIONS);
  }

  async getReservationById(id: string): Promise<ApiResponse<Reservation>> {
    return this.get<Reservation>(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/${id}`);
  }

  async getUserReservations(userId: string): Promise<ApiResponse<Reservation[]>> {
    return this.get<Reservation[]>(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/user/${userId}`);
  }

  async createReservation(reservationData: CreateReservationDto): Promise<ApiResponse<Reservation>> {
    return this.post<Reservation>(API_CONFIG.ENDPOINTS.RESERVATIONS, reservationData);
  }

  async updateReservation(id: string, reservationData: UpdateReservationDto): Promise<ApiResponse<Reservation>> {
    return this.patch<Reservation>(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/${id}`, reservationData);
  }

  async cancelReservation(id: string): Promise<ApiResponse<Reservation>> {
    return this.patch<Reservation>(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/${id}`, { status: 'cancelled' });
  }

  async deleteReservation(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/${id}`);
  }
}

// Main API Client (Facade Pattern)
export class ConcertApiClient {
  public readonly users: UsersApiClient;
  public readonly concerts: ConcertsApiClient;
  public readonly reservations: ReservationsApiClient;

  constructor(baseURL?: string, timeout?: number) {
    this.users = new UsersApiClient(baseURL, timeout);
    this.concerts = new ConcertsApiClient(baseURL, timeout);
    this.reservations = new ReservationsApiClient(baseURL, timeout);
  }
}

// Default instance
export const apiClient = new ConcertApiClient();

// Individual clients for specific use cases
export const usersApi = new UsersApiClient();
export const concertsApi = new ConcertsApiClient();
export const reservationsApi = new ReservationsApiClient();
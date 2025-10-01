// Environment configuration with safe process access
declare const process: any;

export const ENV_CONFIG = {
  NODE_ENV: 'development',
  PORT: '3001',
  API_PORT: '3001',
  WEB_PORT: '3000',
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    CONCERTS: '/api/concerts',
    RESERVATIONS: '/api/reservations',
    USERS: '/api/users',
  },
} as const;

// Database Configuration
export const DB_CONFIG = {
  CONNECTION_URL: '',
  MAX_CONNECTIONS: 10,
  TIMEOUT: 30000,
} as const;

// CORS Configuration
export const CORS_CONFIG = {
  ORIGIN: ['http://localhost:3000'],
  METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  ALLOWED_HEADERS: ['Content-Type', 'Authorization'],
} as const;

// Pagination defaults
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Concert specific configuration
export const CONCERT_CONFIG = {
  MAX_SEATS_PER_CONCERT: 1000,
  RESERVATION_TIMEOUT_MINUTES: 15,
  EARLY_BIRD_DISCOUNT_PERCENT: 10,
  VIP_SEAT_MULTIPLIER: 2,
} as const;

// Ticket pricing tiers
export const TICKET_TIERS = {
  STANDARD: 'standard',
  VIP: 'vip',
  PREMIUM: 'premium',
} as const;

// Status definitions
export const RESERVATION_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;

export const CONCERT_STATUSES = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  ORGANIZER: 'organizer',
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_REGISTRATION: false,
  ENABLE_NOTIFICATIONS: false,
  ENABLE_ANALYTICS: false,
  ENABLE_DARK_MODE: false,
} as const;

// Validation constants
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_EMAIL_LENGTH: 100,
  MAX_NAME_LENGTH: 50,
  MIN_CONCERT_DURATION: 30, // minutes
  MAX_CONCERT_DURATION: 480, // 8 hours
} as const;

// Error messages
export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
    INVALID_DATE: 'Please enter a valid date',
  },
  API: {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    NOT_FOUND: 'The requested resource was not found.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
  },
  CONCERT: {
    FULLY_BOOKED: 'This concert is fully booked.',
    RESERVATION_EXPIRED: 'Your reservation has expired.',
    INSUFFICIENT_SEATS: 'Not enough seats available.',
  },
} as const;
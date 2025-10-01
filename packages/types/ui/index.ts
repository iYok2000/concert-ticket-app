// UI Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: any; // React.ReactNode equivalent
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  title?: string;
  children: any; // React.ReactNode equivalent
  className?: string;
  footer?: any; // React.ReactNode equivalent
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: any; // React.ReactNode equivalent
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

// Form Types
export interface FormState<T = any> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface FormField<T = any> {
  name: keyof T;
  value: any;
  error?: string;
  touched: boolean;
}

// Admin Dashboard Types
export interface AdminDashboardTab {
  id: 'overview' | 'create' | 'history';
  label: string;
  icon?: string;
}

export interface ConcertCardProps {
  concert: Concert;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export interface CreateConcertFormErrors {
  name?: string;
  description?: string;
  date?: string;
  venue?: string;
  totalSeats?: string;
}

export interface CreateConcertFormData {
  name: string;
  description: string;
  date: string;
  venue: string;
  totalSeats: string;
}

// Table Types
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => any; // React.ReactNode equivalent
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: keyof T) => void;
}

// Navigation Types
export interface RouteConfig {
  path: string;
  roles: Role[];
  component: any; // React.ComponentType equivalent
}

// Loading States
export interface LoadingState {
  loading: boolean;
  error?: string;
}

// Import types from parent
import type { Concert, Role } from '../index';
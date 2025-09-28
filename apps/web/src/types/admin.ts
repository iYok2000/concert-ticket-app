import { Concert } from '@concert/shared';

// Types สำหรับ Admin Dashboard
export interface AdminDashboardTab {
  id: 'overview' | 'create';
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

export interface CreateConcertForm {
  name: string;
  description: string;
  date: string;
  venue: string;
  totalSeats: number;
}

export interface CreateConcertFormProps {
  onSubmit: (data: CreateConcertForm) => void;
  isLoading?: boolean;
}

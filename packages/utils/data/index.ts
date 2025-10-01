// Data utilities - self-contained without external dependencies

// Browser globals declaration
declare const localStorage: any;
declare const console: any;

// Type definitions (copied locally to avoid circular imports)
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API Response Helpers
export const createApiResponse = <T>(
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

export const createSuccessResponse = <T>(data: T, message?: string): ApiResponse<T> => {
  return createApiResponse(true, data, message);
};

export const createErrorResponse = (error: string): ApiResponse => {
  return createApiResponse(false, undefined, undefined, error);
};

// Data Transformation Helpers
export const transformToSelectOptions = <T>(
  items: T[],
  labelKey: keyof T,
  valueKey: keyof T
): Array<{ label: string; value: string }> => {
  return items.map(item => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }));
};

// Array Data Helpers
export const sortByDate = <T extends { createdAt: Date | string }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const sortByField = <T>(
  items: T[],
  field: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...items].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];
    
    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Pagination Helpers
export const paginateArray = <T>(
  items: T[],
  page: number = 1,
  limit: number = 10
): {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = items.slice(startIndex, endIndex);
  
  return {
    data,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
    },
  };
};

// Filter Helpers
export const filterByText = <T>(
  items: T[],
  searchText: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchText) return items;
  
  const lowerSearchText = searchText.toLowerCase();
  
  return items.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return String(value).toLowerCase().includes(lowerSearchText);
    })
  );
};

export const filterByStatus = <T extends { status: string }>(
  items: T[],
  status?: string
): T[] => {
  if (!status) return items;
  return items.filter(item => item.status === status);
};

// Deep Clone Helper
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

// Safe JSON Parse
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};

// LocalStorage Helpers
export const setLocalStorageItem = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

export const getLocalStorageItem = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
};
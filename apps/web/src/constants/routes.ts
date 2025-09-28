import { Role } from '@concert/shared';

export const ROUTES = {
  // Public routes
  PUBLIC: {
    UNAUTHORIZED: '/unauthorized',
  },
  
  // Admin routes
  ADMIN: {
    HOME: '/admin/home',
    HISTORY: '/admin/history',
    // DASHBOARD: '/admin/dashboard',
    // USERS: '/admin/users',
    // SETTINGS: '/admin/settings',
  },
  
  // User routes
  USER: {
    HOME: '/user/home',
  },
  
  ROOT: '/',
} as const;

export const ROLE_ROUTES: Record<Role, {
  home: string;
  default: string;
  allowed: string[];
}> = {
  admin: {
    home: ROUTES.ADMIN.HOME,
    default: ROUTES.ADMIN.HOME,
    allowed: Object.values(ROUTES.ADMIN),
  },
  user: {
    home: ROUTES.USER.HOME,
    default: ROUTES.USER.HOME,
    allowed: Object.values(ROUTES.USER),
  },
};


export const ROUTE_ACCESS = {
  [ROUTES.ROOT]: ['admin', 'user'] as Role[],
  [ROUTES.PUBLIC.UNAUTHORIZED]: ['admin', 'user'] as Role[],

  ...Object.values(ROUTES.ADMIN).reduce((acc, route) => ({
    ...acc,
    [route]: ['admin'] as Role[],
  }), {}),
  
  ...Object.values(ROUTES.USER).reduce((acc, route) => ({
    ...acc,
    [route]: ['user'] as Role[],
  }), {}),
} as const;

export type RouteKey = keyof typeof ROUTE_ACCESS;

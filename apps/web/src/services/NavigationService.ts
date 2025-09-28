import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Role } from '@concert/shared';
import { ROUTES, ROLE_ROUTES, ROUTE_ACCESS, RouteKey } from '@/constants/routes';

export class NavigationService {
  private router: AppRouterInstance;
  private currentRole: Role;

  constructor(router: AppRouterInstance, role: Role) {
    this.router = router;
    this.currentRole = role;
  }

  goToHome() {
    const homePath = ROLE_ROUTES[this.currentRole].home;
    this.router.replace(homePath);
  }

  goToRoleHome(role: Role) {
    const homePath = ROLE_ROUTES[role].home;
    this.router.replace(homePath);
  }

  canAccess(path: string): boolean {
    const allowedRoles = ROUTE_ACCESS[path as RouteKey];
    if (!allowedRoles) return false;
    return allowedRoles.includes(this.currentRole);
  }

  navigateTo(path: string, options: { replace?: boolean } = {}) {
    if (!this.canAccess(path)) {
      this.router.replace(ROUTES.PUBLIC.UNAUTHORIZED);
      return;
    }

    if (options.replace) {
      this.router.replace(path);
    } else {
      this.router.push(path);
    }
  }

  safeNavigateTo(path: string) {
    if (this.canAccess(path)) {
      this.router.push(path);
    } else {
      this.goToHome();
    }
  }

  handleRoleSwitch(newRole: Role, onRoleChange: (role: Role) => void) {
    onRoleChange(newRole);
    this.updateRole(newRole);
    
    this.goToRoleHome(newRole);
  }

  getMenuItems() {
    const roleConfig = ROLE_ROUTES[this.currentRole];
    
    switch (this.currentRole) {
      case 'admin':
        return [
          { label: 'Home', path: ROUTES.ADMIN.HOME, icon: 'Home' },
          { label: 'History', path: ROUTES.ADMIN.HISTORY, icon: 'Inbox' },
          // { label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD, icon: 'BarChart3' },
          // { label: 'Users', path: ROUTES.ADMIN.USERS, icon: 'Users' },
          // { label: 'Settings', path: ROUTES.ADMIN.SETTINGS, icon: 'Settings' },
        ];
      
      case 'user':
        return [
          { label: 'Home', path: ROUTES.USER.HOME, icon: 'Home' },
        ];
      
      default:
        return [];
    }
  }

  updateRole(role: Role) {
    this.currentRole = role;
  }
}

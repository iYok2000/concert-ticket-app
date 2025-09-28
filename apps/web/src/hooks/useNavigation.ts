import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { NavigationService } from '@/services/NavigationService';
import useUser from './useUser';

export const useNavigation = () => {
  const router = useRouter();
  const { role } = useUser();

  // Create navigation service instance
  const navigationService = useMemo(() => {
    return new NavigationService(router, role);
  }, [router, role]);

  // Update role when it changes
  useMemo(() => {
    navigationService.updateRole(role);
  }, [navigationService, role]);

  return {
    // Core navigation methods
    goToHome: () => navigationService.goToHome(),
    goToRoleHome: (targetRole: 'admin' | 'user') => navigationService.goToRoleHome(targetRole),
    navigateTo: (path: string, options?: { replace?: boolean }) => navigationService.navigateTo(path, options),
    safeNavigateTo: (path: string) => navigationService.safeNavigateTo(path),
    
    // Access control
    canAccess: (path: string) => navigationService.canAccess(path),
    
    // Menu items
    getMenuItems: () => navigationService.getMenuItems(),
    
    // Direct access to service for complex operations
    service: navigationService,
  };
};

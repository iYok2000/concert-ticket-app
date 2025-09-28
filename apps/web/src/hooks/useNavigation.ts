import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { NavigationService } from '@/services/NavigationService';
import useUser from './useUser';

export const useNavigation = () => {
  const router = useRouter();
  const { role } = useUser();

  const navigationService = useMemo(() => {
    return new NavigationService(router, role);
  }, [router, role]);

  useMemo(() => {
    navigationService.updateRole(role);
  }, [navigationService, role]);

  return {
    goToHome: () => navigationService.goToHome(),
    goToRoleHome: (targetRole: 'admin' | 'user') => navigationService.goToRoleHome(targetRole),
    navigateTo: (path: string, options?: { replace?: boolean }) => navigationService.navigateTo(path, options),
    safeNavigateTo: (path: string) => navigationService.safeNavigateTo(path),
    canAccess: (path: string) => navigationService.canAccess(path),
    getMenuItems: () => navigationService.getMenuItems(),
    service: navigationService,
  };
};

import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@concert/shared";
import { ROUTES } from "@/constants/routes";
import useUser from "@/hooks/useUser";

export function withRoleGuard<P extends {}>(
  Component: ComponentType<P>,
  allowedRoles: readonly Role[]
) {
  const GuardedComponent = function Guarded(props: P) {
    const { role } = useUser();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        setIsChecking(true);

        setTimeout(() => {
          const authorized = allowedRoles.includes(role);
          
          if (!authorized) {
            router.replace(ROUTES.PUBLIC.UNAUTHORIZED);
            return;
          }

          setIsAuthorized(true);
          setIsChecking(false);
        }, 300);
      };

      checkAuth();
    }, [role, allowedRoles, router]);

    if (isChecking || !isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };

  GuardedComponent.displayName = `withRoleGuard(${Component.displayName || Component.name})`;
  
  return GuardedComponent;
}
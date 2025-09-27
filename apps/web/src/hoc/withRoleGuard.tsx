import { ComponentType } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export function withRoleGuard<P extends {}>(
  Component: ComponentType<P>,
  allowedRoles: string[]
) {
  return function Guarded(props: P) {
    useAuthGuard(allowedRoles);
    return <Component {...props} />;
  };
}
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUser from "./useUser";

export const useAuthGuard = (allowedRoles: string[]) => {
  const { role, isRoleSwitching } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect to unauthorized if we're in the middle of a role switch
    if (isRoleSwitching) {
      return;
    }

    // Add a small delay to allow role switch redirects to happen first
    const timeoutId = setTimeout(() => {
      if (!allowedRoles.includes(role)) {
        router.replace("/unauthorized");
      }
    }, 100); // 100ms delay

    return () => clearTimeout(timeoutId);
  }, [role, allowedRoles, router, isRoleSwitching]);
};
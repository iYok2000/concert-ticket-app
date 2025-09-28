import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { ROLE_ROUTES } from "@/constants/routes";
import { Role } from "@concert/shared";
import { useEffect, useRef } from "react";

const useUser = () => {
  const { role, setRole, loadingState, setLoadingState } = useUserContext();
  const router = useRouter();
  const pendingNavigation = useRef<string | null>(null);

  // Handle navigation after role change
  useEffect(() => {
    if (pendingNavigation.current) {
      const targetPath = pendingNavigation.current;
      pendingNavigation.current = null;
      
      router.replace(targetPath);
      
      // Complete the loading state after navigation
      setTimeout(() => {
        setLoadingState({
          isRoleSwitching: false,
          loadingMessage: ""
        });
      }, 100);
    }
  }, [role, router, setLoadingState]);

    const switchRole = async () => {
    try {
      setLoadingState({
        isRoleSwitching: true,
        loadingMessage: "กำลังเปลี่ยน Role"
      });

      const newRole: Role = role === 'admin' ? 'user' : 'admin';
      const targetPath = ROLE_ROUTES[newRole].home;
      
      // Store the target path for after role update
      pendingNavigation.current = targetPath;
      
      // Update the role - navigation will happen in useEffect
      setRole(newRole);

    } catch (error) {
      console.error("Error switching role:", error);
      pendingNavigation.current = null;
  
      setLoadingState({
        isRoleSwitching: false,
        loadingMessage: ""
      });
    }
  };

  const isLoading = loadingState.isRoleSwitching;

  return { 
    role, 
    switchRole, 
    loadingState,
    isLoading
  };
}

export default useUser;
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { ROLE_ROUTES } from "@/constants/routes";

const useUser = () => {
  const { role, setRole, loadingState, setLoadingState } = useUserContext();
  const router = useRouter();

    const switchRole = async () => {
    const newRole = role === "admin" ? "user" : "admin";
    
    try {
      setLoadingState({
        isRoleSwitching: true,
        loadingMessage: `Switching to ${newRole} role`
      });

      setRole(newRole);
      
      await new Promise(resolve => setTimeout(resolve, 100));

      const targetPath = ROLE_ROUTES[newRole].home;
      router.replace(targetPath);

      await new Promise(resolve => setTimeout(resolve, 200));

      setLoadingState({
        isRoleSwitching: false,
        loadingMessage: ""
      });

    } catch (error) {
      console.error("Error switching role:", error);
  
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
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const useUser = () => {
  const { role, setRole, isRoleSwitching, setIsRoleSwitching } = useUserContext();
  const router = useRouter();

  const switchRole = () => {
    const newRole = role === "admin" ? "user" : "admin";
    
    setIsRoleSwitching(true);
    setRole(newRole);
    
    setTimeout(() => {
      if (newRole === "admin") {
        router.replace("/admin/home");
      } else {
        router.replace("/user/home");
      }
      
      setTimeout(() => {
        setIsRoleSwitching(false);
      }, 100);
    }, 50);
  };

  const switchRoleWithoutRedirect = () => {
    setRole(role === "admin" ? "user" : "admin");
  };

  return { 
    role, 
    switchRole, 
    switchRoleWithoutRedirect,
    isRoleSwitching
  };
}

export default useUser;
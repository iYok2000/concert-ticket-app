"use client";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

type Role = "admin" | "user";

interface UserContextType {
    role: Role;
    setRole: (role: Role) => void;
    isRoleSwitching: boolean;
    setIsRoleSwitching: (switching: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [role, setRole] = useState<Role>("admin");
    const [isRoleSwitching, setIsRoleSwitching] = useState(false);

    return (
        <UserContext.Provider value={{ 
            role, 
            setRole, 
            isRoleSwitching, 
            setIsRoleSwitching 
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

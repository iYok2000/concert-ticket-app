"use client";
import { Role } from "@concert/shared";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

interface LoadingState {
    isRoleSwitching: boolean;
    loadingMessage: string;
}

interface UserContextType {
    role: Role;
    setRole: (role: Role) => void;
    loadingState: LoadingState;
    setLoadingState: (state: Partial<LoadingState>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [role, setRole] = useState<Role>("admin");
    const [loadingState, setLoadingStateInternal] = useState<LoadingState>({
        isRoleSwitching: false,
        loadingMessage: ""
    });

    const setLoadingState = (newState: Partial<LoadingState>) => {
        setLoadingStateInternal((prev: LoadingState) => ({ ...prev, ...newState }));
    };

    return (
        <UserContext.Provider value={{ 
            role, 
            setRole, 
            loadingState, 
            setLoadingState 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

"use client";

import { FC, PropsWithChildren } from "react";
import SideBar from "../sections/SideBar";
import RoleSwitchLoading from "../ui/RoleSwitchLoading";
import useUser from "@/hooks/useUser";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { loadingState, isLoading } = useUser();

  return (
    <>
      <div className="flex h-screen">
        <SideBar onLogout={() => alert("Logged out")} />
        <main className="flex-grow p-6 overflow-auto">{children}</main>
      </div>
      
      {isLoading && (
        <RoleSwitchLoading 
          message={loadingState.loadingMessage || "Loading..."}
        />
      )}
    </>
  );
};

export default MainLayout;

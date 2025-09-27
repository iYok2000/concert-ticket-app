"use client";

import { FC, PropsWithChildren, useState } from "react";
import SideBar from "../sections/SideBar";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const [role, setRole] = useState<"admin" | "user">("admin");

  return (
    <div className="flex h-screen">
      <SideBar
        role={role}
        onSwitchRole={() => setRole(role === "admin" ? "user" : "admin")}
        onLogout={() => alert("Logged out")}
      />
      <main className="flex-grow p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
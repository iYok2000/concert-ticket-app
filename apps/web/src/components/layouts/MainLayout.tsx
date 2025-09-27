"use client";

import { FC, PropsWithChildren, useState } from "react";
import SideBar from "../sections/SideBar";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideBar onLogout={() => alert("Logged out")} />
      <main className="flex-grow p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default MainLayout;

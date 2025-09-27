"use client";

import { FC, useState } from "react";
import { Menu, X, Home, Inbox, RefreshCcw } from "lucide-react";

interface SideBarProps {
  role: "admin" | "user";
  onSwitchRole?: () => void;
  onLogout?: () => void;
}

const SideBar: FC<SideBarProps> = ({ role, onSwitchRole, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const MenuItems = () => (
    <nav className="flex flex-col gap-2.5 px-2 py-2">
      {role === "admin" && (
        <>
          <button className="text-left hover:text-blue-600 hover:bg-[#EAF5F9] hover:rounded-lg flex gap-[10px] p-3 transition-all duration-200">
            <Home />
            Home
          </button>
          <button className="text-left hover:text-blue-600 hover:bg-[#EAF5F9] hover:rounded-lg flex gap-[10px] p-3 transition-all duration-200">
            <Inbox />
            History
          </button>
        </>
      )}
      <button
        className="text-left hover:text-blue-600 hover:bg-[#EAF5F9] hover:rounded-lg flex gap-[10px] p-3 transition-all duration-200"
        onClick={onSwitchRole}
      >
        <RefreshCcw />
        {role === "admin" ? "Switch to User" : "Switch to Admin"}
      </button>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
          hidden md:flex
          w-[240px] h-screen flex-col justify-between
          border-r border-gray-300 pt-10 pb-10
        "
      >
        <div>
          <h2 className="px-6 mb-8 font-semibold text-[40px] leading-[150%]">
            {role === "admin" ? "Admin" : "User"}
          </h2>
          <MenuItems />
        </div>

        {role === "admin" && (
          <div className="px-6">
            <button
              onClick={onLogout}
              className="w-full text-left text-red-600 hover:text-red-800 hover:bg-[#EAF5F9] hover:rounded-lg p-3 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-gray-300">
        <h2 className="text-lg font-bold">
          {role === "admin" ? "Admin" : "User"}
        </h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-50 bg-black bg-opacity-30
            flex
          "
        >
          <div
            className="
              w-[240px] h-full bg-white flex flex-col justify-between
              pt-10 pb-10
            "
          >
            <div>
              <h2 className="px-6 text-xl font-bold mb-8">
                {role === "admin" ? "Admin" : "User"}
              </h2>
              <MenuItems />
            </div>

            {role === "admin" && (
              <div className="px-6">
                <button
                  onClick={onLogout}
                  className="w-full text-left text-red-600 hover:text-red-800 hover:bg-[#EAF5F9] hover:rounded-lg p-3 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default SideBar;

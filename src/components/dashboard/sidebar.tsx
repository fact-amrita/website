"use client"; 
import React, { useState, createContext, useContext, ReactNode, FC } from 'react';
import {ChevronLast, ChevronFirst } from 'lucide-react'; // Fallback icons
import {SignOutfromAll} from "@/lib/signout";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    // Implement your logout logic here
    SignOutfromAll();
    console.log('Logging out...');
  };

  return (
      <aside className="fixed left-1 top-1 h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-md rounded-lg">
          <div className="p-2 pb-1 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? 'w-32' : 'w-0'
              }`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t p-3">
            <div className="flex items-center mb-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                alt="User Avatar"
                className="w-10 h-10 rounded-md"
              />
              {expanded && (
                <div className="flex flex-col justify-center ml-3">
                  <h4 className="font-semibold">John Doe</h4>
                  <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                </div>
              )}
            </div>
            {expanded && (
              <button
                className="w-full py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </aside>
  );
};

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, text, active, alert = false }) => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('SidebarItem must be used within a Sidebar');
  }

  const { expanded } = context;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'
      }`}
    >
      {icon}
      {expanded && (
        <span className="overflow-hidden transition-all w-52 ml-3">{text}</span>
      )}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export { Sidebar, SidebarItem };

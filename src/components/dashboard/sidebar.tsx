"use client";
import React, { useState, createContext, useContext, ReactNode, FC } from 'react';
import { ChevronLast, ChevronFirst } from 'lucide-react'; // Fallback icons
import Image from "next/image";
import getTitle from "@/functions/titleget";
import logo from "@/images/logo_black.png";
import Link from 'next/link'; 

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
    image: string;
    factId: string;
  }
}

const Sidebar: FC<SidebarProps> = ({ children, user }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="fixed left-1 top-1 h-screen">
      <nav className="h-full flex flex-col bg-white shadow-md rounded-lg">
        <div className=" p-2 pb-2 flex justify-between items-center relative">
          <Image
            src={logo}
            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'
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

        <div className="p-3">
        <Link href={`/app/profile/${user.factId}`}>
          <div className="flex items-center mb-3">
            <Image
              src={user.image || "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"}
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-md"
            />
            {expanded && (
              <div className="flex flex-col justify-center ml-3">
                <h4 className="font-semibold">{user.name}</h4>
                <span className="text-xs text-gray-600">{user.email}</span>
                <span className="text-xs text-gray-600">{getTitle(user.role)}</span>
              </div>
            )}
          </div>
          </Link>
          {expanded && (
            <Link href="/app/auth/logout">
              <button
                className="w-full py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Logout

              </button>
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  router: string; 
  icon: ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, text, router, active, alert = false }) => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('SidebarItem must be used within a Sidebar');
  }

  const { expanded } = context;

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 rounded-md' : 'hover:bg-indigo-50 text-gray-600 rounded-md'">
      <Link href={router} legacyBehavior>
        <a className={`flex items-center w-full ${active ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 rounded-md h-8 w-10' : 'hover:bg-indigo-50 text-gray-600 rounded-md h-8 w-10'}`}>
          {icon}
          {expanded && (
            <span className="overflow-hidden transition-all w-45 ml-3">{text}</span>
          )}
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
            />
          )}
          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </a>
      </Link>
    </li>
  );
};

export { Sidebar, SidebarItem };

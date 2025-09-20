"use client";

import { Key, FolderOpen, Terminal, FileText } from "lucide-react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "keyvalues", label: "Key-Value Store", icon: Key },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "commands", label: "Commands", icon: Terminal },
    { id: "notes", label: "Notes", icon: FileText },
  ];

  return (
    <div className="hidden md:flex md:flex-col md:w-56 lg:w-64 bg-card p-3 sm:p-4 border-r border-card-hover">
      <h1 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-brand-blue">
        DevTools
      </h1>
      <nav className="space-y-1 sm:space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                activeSection === item.id
                  ? "bg-brand-blue text-white shadow-md"
                  : "text-secondary hover:bg-card-hover hover:text-foreground"
              }`}
            >
              <Icon size={18} className="sm:w-5 sm:h-5" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

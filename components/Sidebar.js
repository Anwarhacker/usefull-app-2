"use client";

import {
  Key,
  FolderOpen,
  Terminal,
  FileText,
  BarChart3,
  Globe,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "keyvalues", label: "Key-Value Store", icon: Key },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "websites", label: "Websites", icon: Globe },
    { id: "commands", label: "Commands", icon: Terminal },
    { id: "notes", label: "Notes", icon: FileText },
  ];

  return (
    <div className="hidden md:flex md:flex-col w-64 lg:w-72 xl:w-80 bg-card p-4 lg:p-6 border-r border-card-hover">
      <div className="flex items-center justify-between mb-8 lg:mb-10">
        <h1 className="text-xl lg:text-2xl font-bold text-brand-blue">
          DevTools
        </h1>
        <ThemeToggle />
      </div>
      <nav className="space-y-2 lg:space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full touch-target flex items-center space-x-3 lg:space-x-4 px-3 lg:px-4 py-3 lg:py-4 rounded-lg transition-all duration-200 text-base lg:text-lg font-medium ${
                activeSection === item.id
                  ? "bg-brand-blue text-white shadow-lg transform scale-[1.02]"
                  : "text-secondary hover:bg-card-hover hover:text-foreground hover:translate-x-1"
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

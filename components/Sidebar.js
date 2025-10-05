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
    <div className="hidden md:flex md:flex-col w-72 lg:w-80 xl:w-96 glass p-6 lg:p-8 border-r border-border/20">
      <div className="flex items-center justify-between mb-10 lg:mb-12">
        <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          DevTools
        </h1>
        <ThemeToggle />
      </div>
      <nav className="space-y-3 lg:space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full touch-target flex items-center space-x-4 lg:space-x-5 px-4 lg:px-5 py-4 lg:py-5 rounded-xl transition-all duration-200 text-base lg:text-lg font-medium ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-primary to-primary-hover text-white shadow-xl transform scale-[1.02]"
                  : "text-foreground-secondary hover:bg-surface-hover hover:text-foreground hover:translate-x-2"
              }`}
            >
              <Icon size={22} className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

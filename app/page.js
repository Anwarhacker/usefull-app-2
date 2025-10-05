"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Key,
  FolderOpen,
  Terminal,
  FileText,
  BarChart3,
  Globe,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import KeyValueSection from "../components/KeyValueSection";
import ProjectsSection from "../components/ProjectsSection";
import CommandsSection from "../components/CommandsSection";
import NotesSection from "../components/NotesSection";
import WebsitesSection from "../components/WebsitesSection";
import StatisticsDashboard from "../components/StatisticsDashboard";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "keyvalues", label: "Key-Value Store", icon: Key },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "websites", label: "Websites", icon: Globe },
    { id: "commands", label: "Commands", icon: Terminal },
    { id: "notes", label: "Notes", icon: FileText },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <StatisticsDashboard />;
      case "keyvalues":
        return <KeyValueSection />;
      case "projects":
        return <ProjectsSection />;
      case "websites":
        return <WebsitesSection />;
      case "commands":
        return <CommandsSection />;
      case "notes":
        return <NotesSection />;
      default:
        return <StatisticsDashboard />;
    }
  };

  // Close mobile menu when clicking outside or on navigation
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".mobile-nav")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <div className="md:hidden bg-card border-b border-card-hover sticky top-0 z-40">
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
          <h1 className="text-lg sm:text-xl font-bold text-brand-blue">
            DevTools
          </h1>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-secondary hover:text-foreground p-2 rounded-lg hover:bg-card-hover transition-colors-smooth"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-card-hover mobile-nav">
            <nav className="px-3 sm:px-4 py-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-sm sm:text-base ${
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
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="flex-1 overflow-auto bg-background">
          <div className="min-h-screen">{renderSection()}</div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden overflow-auto bg-background">
        {renderSection()}
      </div>
    </div>
  );
}

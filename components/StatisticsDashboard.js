"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  FileText,
  Key,
  FolderOpen,
  Terminal,
  TrendingUp,
} from "lucide-react";
import Card from "./Card";

const StatisticsDashboard = ({ className = "" }) => {
  const [stats, setStats] = useState({
    keyValues: 0,
    projects: 0,
    commands: 0,
    notes: 0,
    totalUrls: 0,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const [keyValuesRes, projectsRes, commandsRes, notesRes] =
        await Promise.all([
          fetch("/api/keyvalues"),
          fetch("/api/projects"),
          fetch("/api/commands"),
          fetch("/api/notes"),
        ]);

      const [keyValues, projects, commands, notes] = await Promise.all([
        keyValuesRes.json(),
        projectsRes.json(),
        commandsRes.json(),
        notesRes.json(),
      ]);

      const totalUrls = projects.reduce(
        (sum, project) => sum + project.urls.length,
        0
      );

      setStats({
        keyValues: keyValues.length,
        projects: projects.length,
        commands: commands.length,
        notes: notes.length,
        totalUrls,
        totalItems:
          keyValues.length + projects.length + commands.length + notes.length,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Key-Value Pairs",
      value: stats.keyValues,
      icon: Key,
      color: "text-brand-blue",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Commands",
      value: stats.commands,
      icon: Terminal,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Notes",
      value: stats.notes,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "Total URLs",
      value: stats.totalUrls,
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "Total Items",
      value: stats.totalItems,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  if (loading) {
    return (
      <div
        className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 ${className}`}
      >
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="skeleton">
            <div className="h-20"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6 ${className}`}
    >
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="animate-fade-in stagger-item">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-secondary mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">
                  {stat.value.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon size={24} className={stat.color} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatisticsDashboard;

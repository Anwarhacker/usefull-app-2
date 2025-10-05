"use client";

import { useState, useEffect, useMemo } from "react";
import { Edit, Trash2, SortAsc, SortDesc } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import CopyButton from "./CopyButton";
import SearchBar from "./SearchBar";

const CommandsSection = () => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ title: "", command: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchCommands();
  }, []);

  // Filter and sort commands
  const filteredAndSortedCommands = useMemo(() => {
    let filtered = commands.filter((command) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        command.title.toLowerCase().includes(searchLower) ||
        command.command.toLowerCase().includes(searchLower)
      );
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "command":
          aValue = a.command.toLowerCase();
          bValue = b.command.toLowerCase();
          break;
        case "createdAt":
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [commands, searchTerm, sortBy, sortOrder]);

  const fetchCommands = async () => {
    try {
      const response = await fetch("/api/commands");
      const data = await response.json();
      setCommands(data);
    } catch (error) {
      console.error("Error fetching commands:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/commands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddModal(false);
        setFormData({ title: "", command: "" });
        fetchCommands();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error adding command:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/commands/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowEditModal(false);
        setSelectedItem(null);
        setFormData({ title: "", command: "" });
        fetchCommands();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error updating command:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/commands/${selectedItem._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setSelectedItem(null);
        fetchCommands();
      }
    } catch (error) {
      console.error("Error deleting command:", error);
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({ title: item.title, command: item.command });
    setShowEditModal(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 sm:py-12 text-sm sm:text-base">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold">Commands</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto"
        >
          Add Command
        </Button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search commands..."
        className="mb-4"
      />

      {/* <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-secondary">Sort by:</span>
        <Button
          onClick={() => toggleSort("title")}
          variant={sortBy === "title" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Title{" "}
          {sortBy === "title" &&
            (sortOrder === "asc" ? (
              <SortAsc size={12} className="ml-1" />
            ) : (
              <SortDesc size={12} className="ml-1" />
            ))}
        </Button>
        <Button
          onClick={() => toggleSort("command")}
          variant={sortBy === "command" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Command{" "}
          {sortBy === "command" &&
            (sortOrder === "asc" ? (
              <SortAsc size={12} className="ml-1" />
            ) : (
              <SortDesc size={12} className="ml-1" />
            ))}
        </Button>
        <Button
          onClick={() => toggleSort("createdAt")}
          variant={sortBy === "createdAt" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Date{" "}
          {sortBy === "createdAt" &&
            (sortOrder === "asc" ? (
              <SortAsc size={12} className="ml-1" />
            ) : (
              <SortDesc size={12} className="ml-1" />
            ))}
        </Button>
      </div> */}

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAndSortedCommands.map((command) => (
          <Card key={command._id} className="relative">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-brand-blue text-sm sm:text-base truncate pr-2">
                {command.title}
              </h3>
              <div className="flex space-x-1 flex-shrink-0">
                <CopyButton text={command.command} />
                <Button
                  onClick={() => openEditModal(command)}
                  variant="secondary"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Edit size={14} className="sm:w-4 sm:h-4" />
                </Button>
                <Button
                  onClick={() => openDeleteModal(command)}
                  variant="danger"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
            <pre className="font-mono text-secondary text-xs sm:text-sm whitespace-pre-wrap break-words line-clamp-4 overflow-hidden">
              {command.command}
            </pre>
          </Card>
        ))}
      </div>

      {commands.length === 0 && !searchTerm && (
        <div className="text-center py-8 sm:py-12 text-secondary text-sm sm:text-base">
          No commands found. Add your first command!
        </div>
      )}

      {commands.length > 0 && filteredAndSortedCommands.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-secondary text-sm sm:text-base">
          No commands match your search "{searchTerm}".
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ title: "", command: "" });
        }}
        title="Add Command"
        footer={
          <>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setFormData({ title: "", command: "" });
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add</Button>
          </>
        }
      >
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter command title"
        />
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-secondary">
            Command
          </label>
          <textarea
            value={formData.command}
            onChange={(e) =>
              setFormData({ ...formData, command: e.target.value })
            }
            placeholder="Enter command"
            className="w-full px-3 py-2 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue font-mono text-sm min-h-[80px] sm:min-h-[100px]"
            rows={3}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedItem(null);
          setFormData({ title: "", command: "" });
        }}
        title="Edit Command"
        footer={
          <>
            <Button
              onClick={() => {
                setShowEditModal(false);
                setSelectedItem(null);
                setFormData({ title: "", command: "" });
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update</Button>
          </>
        }
      >
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter command title"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-secondary">
            Command
          </label>
          <textarea
            value={formData.command}
            onChange={(e) =>
              setFormData({ ...formData, command: e.target.value })
            }
            placeholder="Enter command"
            className="w-full px-3 py-2 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue font-mono"
            rows={4}
          />
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(null);
        }}
        title="Delete Command"
        footer={
          <>
            <Button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedItem(null);
              }}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
          </>
        }
      >
        <p className="text-secondary">
          Are you sure you want to delete the command "{selectedItem?.title}"?
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default CommandsSection;

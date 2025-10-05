"use client";

import { useState, useEffect, useMemo } from "react";
import { Edit, Trash2, Plus, X, SortAsc, SortDesc, Link } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import SearchBar from "./SearchBar";

const WebsitesSection = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "AI",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchWebsites();
  }, []);

  const filteredAndSortedWebsites = useMemo(() => {
    let filtered = websites.filter((website) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        website.title.toLowerCase().includes(searchLower) ||
        website.url.toLowerCase().includes(searchLower) ||
        website.category.toLowerCase().includes(searchLower)
      );
    });

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (website) => website.category === selectedCategory
      );
    }

    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
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
  }, [websites, searchTerm, sortBy, sortOrder, selectedCategory]);

  const fetchWebsites = async () => {
    try {
      const response = await fetch("/api/websites");
      const data = await response.json();
      setWebsites(data);
    } catch (error) {
      console.error("Error fetching websites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/websites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddModal(false);
        setFormData({ title: "", url: "", category: "AI" });
        fetchWebsites();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error adding website:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/websites/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowEditModal(false);
        setSelectedItem(null);
        setFormData({ title: "", url: "", category: "AI" });
        fetchWebsites();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error updating website:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/websites/${selectedItem._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setSelectedItem(null);
        fetchWebsites();
      }
    } catch (error) {
      console.error("Error deleting website:", error);
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({ title: item.title, url: item.url, category: item.category });
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
        <h2 className="text-xl sm:text-2xl font-bold">Websites</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto"
        >
          Add Website
        </Button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search websites..."
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
          onClick={() => toggleSort("category")}
          variant={sortBy === "category" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Category{" "}
          {sortBy === "category" &&
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

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-secondary">Filter by:</span>
        <Button
          onClick={() => setSelectedCategory("All")}
          variant={selectedCategory === "All" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          All
        </Button>
        <Button
          onClick={() => setSelectedCategory("AI")}
          variant={selectedCategory === "AI" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          AI
        </Button>
        <Button
          onClick={() => setSelectedCategory("AI Agent")}
          variant={selectedCategory === "AI Agent" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          AI Agent
        </Button>
        <Button
          onClick={() => setSelectedCategory("Deployed")}
          variant={selectedCategory === "Deployed" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Deployed
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAndSortedWebsites.map((website) => (
          <Card key={website._id} className="relative">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-brand-blue text-sm sm:text-base truncate pr-2">
                {website.title}
              </h3>
              <div className="flex space-x-1 flex-shrink-0">
                <Button
                  onClick={() => openEditModal(website)}
                  variant="secondary"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Edit size={14} className="sm:w-4 sm:h-4" />
                </Button>
                <Button
                  onClick={() => openDeleteModal(website)}
                  variant="danger"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-secondary mb-2">{website.category}</p>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-brand-blue rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Link size={14} className="mr-2" />
              Visit Website
            </a>
          </Card>
        ))}
      </div>

      {websites.length === 0 && !searchTerm && (
        <div className="text-center py-8 sm:py-12 text-secondary text-sm sm:text-base">
          No websites found. Add your first website!
        </div>
      )}

      {websites.length > 0 && filteredAndSortedWebsites.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-secondary text-sm sm:text-base">
          No websites match your search "{searchTerm}".
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ title: "", url: "", category: "AI" });
        }}
        title="Add Website"
        footer={
          <>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setFormData({ title: "", url: "", category: "AI" });
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
          placeholder="Enter website title"
        />
        <Input
          label="URL"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="Enter website URL"
          type="url"
        />
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-secondary">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="flex-1 px-3 py-2 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue text-sm min-h-[40px] w-full"
          >
            <option value="AI">AI</option>
            <option value="AI Agent">AI Agent</option>
            <option value="Deployed">Deployed</option>
          </select>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedItem(null);
          setFormData({ title: "", url: "", category: "AI" });
        }}
        title="Edit Website"
        footer={
          <>
            <Button
              onClick={() => {
                setShowEditModal(false);
                setSelectedItem(null);
                setFormData({ title: "", url: "", category: "AI" });
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
          placeholder="Enter website title"
        />
        <Input
          label="URL"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="Enter website URL"
          type="url"
        />
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-secondary">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="flex-1 px-3 py-2 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue text-sm min-h-[40px] w-full"
          >
            <option value="AI">AI</option>
            <option value="AI Agent">AI Agent</option>
            <option value="Deployed">Deployed</option>
          </select>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(null);
        }}
        title="Delete Website"
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
          Are you sure you want to delete the website "{selectedItem?.title}"?
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default WebsitesSection;

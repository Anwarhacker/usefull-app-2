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
      <div className="flex items-center justify-center py-20">
        <div className="animate-shimmer bg-gradient-to-r from-surface via-surface-hover to-surface rounded-2xl p-8">
          <div className="animate-pulse text-foreground-muted text-lg">
            Loading websites...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 md:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 gap-4 sm:gap-0">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Websites
          </h2>
          <p className="text-foreground-muted">
            Manage your favorite websites and bookmarks
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto animate-float"
          variant="primary"
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

      <div className="flex flex-wrap items-center gap-2 mb-4">
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
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
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
        {/* <Button
          onClick={() => setSelectedCategory("Personal")}
          variant={selectedCategory === "Personal" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Personal
        </Button> */}
      </div>

      <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredAndSortedWebsites.map((website) => (
          <Card key={website._id} className="relative group" variant="gradient">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-primary text-lg sm:text-xl truncate pr-3 group-hover:text-primary-hover transition-colors">
                {website.title}
              </h3>
              <div className="flex space-x-2 flex-shrink-0">
                <Button
                  onClick={() => openEditModal(website)}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-primary/10 hover:text-primary"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  onClick={() => openDeleteModal(website)}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-error/10 hover:text-error"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <p className="text-sm text-foreground-muted mb-4 bg-surface/50 rounded-lg px-3 py-1 inline-block">
              {website.category}
            </p>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-xl hover:shadow-lg hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 hover:scale-105"
            >
              <Link size={16} className="mr-2" />
              Visit Website
            </a>
          </Card>
        ))}
      </div>

      {websites.length === 0 && !searchTerm && (
        <div className="text-center py-20">
          <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
            <div className="text-6xl mb-6">🌐</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No websites yet
            </h3>
            <p className="text-foreground-muted mb-6">
              Start building your collection of favorite websites and bookmarks.
            </p>
            <Button onClick={() => setShowAddModal(true)} variant="primary">
              Add Your First Website
            </Button>
          </div>
        </div>
      )}

      {websites.length > 0 && filteredAndSortedWebsites.length === 0 && (
        <div className="text-center py-20">
          <div className="glass-card p-12 rounded-3xl max-w-md mx-auto">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No matches found
            </h3>
            <p className="text-foreground-muted">
              No websites match your search for "{searchTerm}". Try different
              keywords.
            </p>
          </div>
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
        <div className="mb-4 sm:mb-5">
          <label className="block text-sm sm:text-base font-medium mb-2 sm:mb-3 text-secondary">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full touch-target px-4 py-3 sm:px-4 sm:py-3 bg-card border border-card-hover rounded-lg text-foreground focus-brand-blue focus:ring-2 focus:ring-brand-blue focus:ring-opacity-20 text-base sm:text-base transition-all duration-200"
          >
            <option value="AI">AI</option>
            <option value="AI Agent">AI Agent</option>
            <option value="Deployed">Deployed</option>
            <option value="Personal">Personal</option>
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
        <div className="mb-4 sm:mb-5">
          <label className="block text-sm sm:text-base font-medium mb-2 sm:mb-3 text-secondary">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full touch-target px-4 py-3 sm:px-4 sm:py-3 bg-card border border-card-hover rounded-lg text-foreground focus-brand-blue focus:ring-2 focus:ring-brand-blue focus:ring-opacity-20 text-base sm:text-base transition-all duration-200"
          >
            <option value="AI">AI</option>
            <option value="AI Agent">AI Agent</option>
            <option value="Deployed">Deployed</option>
            <option value="Personal">Personal</option>
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

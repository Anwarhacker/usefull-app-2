"use client";

import { useState, useEffect, useMemo } from "react";
import { Edit, Trash2, SortAsc, SortDesc } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import CopyButton from "./CopyButton";
import SearchBar from "./SearchBar";

const KeyValueSection = () => {
  const [keyValues, setKeyValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ key: "", value: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("key");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchKeyValues();
  }, []);

  // Filter and sort key-values
  const filteredAndSortedKeyValues = useMemo(() => {
    let filtered = keyValues.filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.key.toLowerCase().includes(searchLower) ||
        item.value.toLowerCase().includes(searchLower)
      );
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "key":
          aValue = a.key.toLowerCase();
          bValue = b.key.toLowerCase();
          break;
        case "value":
          aValue = a.value.toLowerCase();
          bValue = b.value.toLowerCase();
          break;
        case "createdAt":
          aValue = new Date(a.createdAt || 0);
          bValue = new Date(b.createdAt || 0);
          break;
        default:
          aValue = a.key.toLowerCase();
          bValue = b.key.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [keyValues, searchTerm, sortBy, sortOrder]);

  const fetchKeyValues = async () => {
    try {
      const response = await fetch("/api/keyvalues");
      const data = await response.json();
      setKeyValues(data);
    } catch (error) {
      console.error("Error fetching key-values:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/keyvalues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddModal(false);
        setFormData({ key: "", value: "" });
        fetchKeyValues();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error adding key-value:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/keyvalues/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowEditModal(false);
        setSelectedItem(null);
        setFormData({ key: "", value: "" });
        fetchKeyValues();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error updating key-value:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/keyvalues/${selectedItem._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setSelectedItem(null);
        fetchKeyValues();
      }
    } catch (error) {
      console.error("Error deleting key-value:", error);
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({ key: item.key, value: item.value });
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
        <h2 className="text-xl sm:text-2xl font-bold">Key-Value Store</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto"
        >
          Add Key-Value
        </Button>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search key-value pairs..."
        className="mb-4"
      />

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-secondary">Sort by:</span>
        <Button
          onClick={() => toggleSort("key")}
          variant={sortBy === "key" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Key{" "}
          {sortBy === "key" &&
            (sortOrder === "asc" ? (
              <SortAsc size={12} className="ml-1" />
            ) : (
              <SortDesc size={12} className="ml-1" />
            ))}
        </Button>
        <Button
          onClick={() => toggleSort("value")}
          variant={sortBy === "value" ? "primary" : "secondary"}
          size="sm"
          className="text-xs"
        >
          Value{" "}
          {sortBy === "value" &&
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

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAndSortedKeyValues.map((item) => (
          <Card key={item._id} className="relative">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <h3 className="font-semibold font-mono text-brand-blue text-sm sm:text-base truncate">
                  {item.key}
                </h3>
                <CopyButton text={item.key} className="flex-shrink-0" />
              </div>
              <div className="flex space-x-1 flex-shrink-0">
                <CopyButton text={`${item.key}: ${item.value}`} />
                <Button
                  onClick={() => openEditModal(item)}
                  variant="secondary"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Edit size={14} className="sm:w-4 sm:h-4" />
                </Button>
                <Button
                  onClick={() => openDeleteModal(item)}
                  variant="danger"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <p className="font-mono text-secondary text-sm sm:text-base break-words line-clamp-3 flex-1">
                {item.value}
              </p>
              <CopyButton text={item.value} className="flex-shrink-0 mt-1" />
            </div>
          </Card>
        ))}
      </div>

      {keyValues.length === 0 && !searchTerm && (
        <div className="text-center py-8 sm:py-12 text-secondary text-sm sm:text-base">
          No key-value pairs found. Add your first one!
        </div>
      )}

      {keyValues.length > 0 && filteredAndSortedKeyValues.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-secondary text-sm sm:text-base">
          No key-value pairs match your search "{searchTerm}".
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ key: "", value: "" });
        }}
        title="Add Key-Value Pair"
        footer={
          <>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setFormData({ key: "", value: "" });
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
          label="Key"
          value={formData.key}
          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
          placeholder="Enter key"
        />
        <Input
          label="Value"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          placeholder="Enter value"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedItem(null);
          setFormData({ key: "", value: "" });
        }}
        title="Edit Key-Value Pair"
        footer={
          <>
            <Button
              onClick={() => {
                setShowEditModal(false);
                setSelectedItem(null);
                setFormData({ key: "", value: "" });
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
          label="Key"
          value={formData.key}
          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
          placeholder="Enter key"
        />
        <Input
          label="Value"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          placeholder="Enter value"
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(null);
        }}
        title="Delete Key-Value Pair"
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
          Are you sure you want to delete the key-value pair "
          {selectedItem?.key}"? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default KeyValueSection;

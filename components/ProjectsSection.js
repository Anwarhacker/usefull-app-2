"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, X } from "lucide-react";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import CopyButton from "./CopyButton";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", urls: [""] });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          urls: formData.urls.filter((url) => url.trim() !== ""),
        }),
      });

      if (response.ok) {
        setShowAddModal(false);
        setFormData({ name: "", urls: [""] });
        fetchProjects();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/projects/${selectedItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          urls: formData.urls.filter((url) => url.trim() !== ""),
        }),
      });

      if (response.ok) {
        setShowEditModal(false);
        setSelectedItem(null);
        setFormData({ name: "", urls: [""] });
        fetchProjects();
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/projects/${selectedItem._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setSelectedItem(null);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({ name: item.name, urls: [...item.urls] });
    setShowEditModal(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const addUrl = () => {
    setFormData({ ...formData, urls: [...formData.urls, ""] });
  };

  const removeUrl = (index) => {
    const newUrls = formData.urls.filter((_, i) => i !== index);
    setFormData({ ...formData, urls: newUrls });
  };

  const updateUrl = (index, value) => {
    const newUrls = [...formData.urls];
    newUrls[index] = value;
    setFormData({ ...formData, urls: newUrls });
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
        <h2 className="text-xl sm:text-2xl font-bold">Projects</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto"
        >
          Add Project
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <Card key={project._id} className="relative">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-brand-blue text-sm sm:text-base truncate pr-2">
                {project.name}
              </h3>
              <div className="flex space-x-1 flex-shrink-0">
                <CopyButton text={project.urls.join("\n")} />
                <Button
                  onClick={() => openEditModal(project)}
                  variant="secondary"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Edit size={14} className="sm:w-4 sm:h-4" />
                </Button>
                <Button
                  onClick={() => openDeleteModal(project)}
                  variant="danger"
                  size="sm"
                  className="p-1 sm:p-2"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1">
              {project.urls.slice(0, 3).map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-secondary hover:text-brand-blue text-xs sm:text-sm break-all truncate"
                  title={url}
                >
                  {url}
                </a>
              ))}
              {project.urls.length > 3 && (
                <span className="text-xs text-secondary">
                  +{project.urls.length - 3} more URLs
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-8 sm:py-12 text-secondary text-sm sm:text-base">
          No projects found. Add your first project!
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({ name: "", urls: [""] });
        }}
        title="Add Project"
        footer={
          <>
            <Button
              onClick={() => {
                setShowAddModal(false);
                setFormData({ name: "", urls: [""] });
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
          label="Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter project name"
        />
        <div className="mb-3 sm:mb-4">
          <label className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2 text-secondary">
            URLs
          </label>
          {formData.urls.map((url, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder="Enter URL"
                className="flex-1 px-3 py-2 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue text-sm min-h-[40px]"
              />
              {formData.urls.length > 1 && (
                <Button
                  onClick={() => removeUrl(index)}
                  variant="danger"
                  size="sm"
                  className="p-1 sm:p-2 flex-shrink-0"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            onClick={addUrl}
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto"
          >
            <Plus size={14} className="sm:w-4 sm:h-4 mr-1" />
            Add URL
          </Button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedItem(null);
          setFormData({ name: "", urls: [""] });
        }}
        title="Edit Project"
        footer={
          <>
            <Button
              onClick={() => {
                setShowEditModal(false);
                setSelectedItem(null);
                setFormData({ name: "", urls: [""] });
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
          label="Project Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter project name"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-secondary">
            URLs
          </label>
          {formData.urls.map((url, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(index, e.target.value)}
                placeholder="Enter URL"
                className="flex-1 px-3 py-2 bg-card border border-card-hover rounded-lg text-foreground placeholder-secondary focus-brand-blue"
              />
              {formData.urls.length > 1 && (
                <Button
                  onClick={() => removeUrl(index)}
                  variant="danger"
                  size="sm"
                  className="p-2"
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addUrl} variant="secondary" size="sm">
            <Plus size={16} className="mr-1" />
            Add URL
          </Button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedItem(null);
        }}
        title="Delete Project"
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
          Are you sure you want to delete the project "{selectedItem?.name}"?
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ProjectsSection;

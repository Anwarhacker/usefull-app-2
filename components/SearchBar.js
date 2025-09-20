"use client";

import { Search, X, Filter } from "lucide-react";
import Button from "./Button";
import Input from "./Input";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  showFilters = false,
  filters = [],
  activeFilter = null,
  onFilterChange,
  className = "",
}) => {
  const clearSearch = () => {
    onSearchChange("");
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 ${className}`}
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute right-3 top-1/3 transform -translate-y-1/2 text-secondary my-auto "
        />
        <Input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            onClick={clearSearch}
            variant="secondary"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto"
          >
            <X size={14} />
          </Button>
        )}
      </div>

      {showFilters && filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Filter size={16} className="text-secondary mt-2 sm:mt-3" />
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              variant={activeFilter === filter.id ? "primary" : "secondary"}
              size="sm"
              className="text-xs"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Card, CardContent } from "@/components/common/Card";

export function SearchFilters({ filters, onFilterChange, onSearchChange }) {
  const [showFilters, setShowFilters] = React.useState(false);

  const popularityOptions = [
    { display: "Most Popular", value: "-userCount" },
    { display: "Highest Rated", value: "-averageRating" },
    { display: "Recently Updated", value: "-updatedAt" },
    { display: "Recently Added", value: "-createdAt" },
  ];

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search manga..."
            className="pl-9"
            value={filters.search || ""}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { MangaCard } from "@/components/features/MangaCard";
import { Pagination } from "@/components/features/Pagination";
import { Search, AlertCircle } from "lucide-react";

export function SearchResults({
  results,
  isLoading,
  isError,
  searchQuery,
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (isError) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <p className="font-medium text-red-400">
            Error loading results. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse rounded-lg bg-[var(--secondary)]"
          />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-full bg-[var(--secondary)] p-6">
          <Search className="h-10 w-10 text-[var(--muted-foreground)]" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-[var(--foreground)]">
          No results found for "{searchQuery}"
        </h3>
        <p className="mt-2 text-[var(--muted-foreground)] max-w-md">
          Try checking your spelling or use different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Results count */}
      <div className="text-sm text-[var(--muted-foreground)]">
        Showing results for "
        <span className="text-[var(--foreground)]">{searchQuery}</span>"
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
        {results.map((manga, index) => (
          <div
            key={manga.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <MangaCard item={manga} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 1}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </div>
  );
}

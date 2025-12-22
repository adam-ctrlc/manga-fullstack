"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/common/Container";
import { MangaCard } from "@/components/features/MangaCard";
import { Pagination } from "@/components/features/Pagination";
import { useManga } from "@/services/manga";
import { ArrowLeft, Search, AlertCircle } from "lucide-react";
import Link from "next/link";

const SORT_OPTIONS = [
  { value: "-userCount", label: "Most Popular" },
  { value: "-averageRating", label: "Highest Rated" },
  { value: "-startDate", label: "New & Trending" },
  { value: "startDate", label: "Classics" },
];

function BrowseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get("sort") || "-userCount";
  const pageParam = parseInt(searchParams.get("page") || "1");

  const [sort, setSort] = useState(sortParam);
  const [page, setPage] = useState(pageParam);

  const {
    data: mangaList,
    meta,
    isLoading,
    isError,
  } = useManga({
    page,
    filters: { sort },
  });

  const totalPages = Math.ceil((meta?.count || 0) / 20);

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sort)?.label || "Most Popular";

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
    router.push(`/browse?sort=${newSort}`, { scroll: false });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(`/browse?sort=${sort}&page=${newPage}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Container className="py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Browse Manga
          </h1>
          <p className="text-[var(--muted-foreground)] mt-2">
            Explore our collection sorted by {currentSortLabel.toLowerCase()}
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                sort === option.value
                  ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                  : "bg-[var(--secondary)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Error State */}
        {isError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6 text-center mb-8">
            <AlertCircle className="h-8 w-8 mx-auto mb-3 text-red-400" />
            <p className="text-red-400">
              Error loading manga. Please try again.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] animate-pulse rounded-lg bg-[var(--secondary)]"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Results */}
            {mangaList.length === 0 ? (
              <div className="text-center py-16">
                <Search className="h-12 w-12 mx-auto mb-4 text-[var(--muted-foreground)]" />
                <p className="text-[var(--muted-foreground)]">No manga found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
                {mangaList.map((manga, index) => (
                  <div
                    key={manga.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <MangaCard item={manga} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

function BrowseSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Container className="py-12">
        <div className="h-8 w-32 bg-[var(--secondary)] rounded animate-pulse mb-4" />
        <div className="h-10 w-64 bg-[var(--secondary)] rounded animate-pulse mb-8" />
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-28 bg-[var(--secondary)] rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] bg-[var(--secondary)] rounded-lg animate-pulse"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<BrowseSkeleton />}>
      <BrowseContent />
    </Suspense>
  );
}

"use client";

import React, { useState, Suspense, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/common/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { MangaSection } from "@/components/sections/MangaSection";
import { SearchResults } from "@/components/sections/SearchResults";
import { useManga } from "@/services/manga";

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function MainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  // Debounce search query by 400ms
  const debouncedSearch = useDebounce(search, 400);

  const isSearching = debouncedSearch.length > 0;

  // Search Data - uses debounced value
  const {
    data: searchResults,
    meta,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useManga({
    page,
    filters: {
      "filter[text]": debouncedSearch || undefined,
    },
  });

  const totalPages = Math.ceil((meta?.count || 0) / 20);

  // Update URL when debounced search changes
  useEffect(() => {
    if (debouncedSearch) {
      router.replace(`?search=${debouncedSearch}`, { scroll: false });
    } else if (search === "") {
      router.replace("/", { scroll: false });
    }
  }, [debouncedSearch, router, search]);

  const handleSearchChange = useCallback((e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setPage(1);
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    if (debouncedSearch) params.set("search", debouncedSearch);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section with Integrated Search */}
      <HeroSection onSearchChange={handleSearchChange} searchValue={search} />

      <Container className="py-12">
        {isSearching ? (
          /* Search Results View */
          <SearchResults
            results={searchResults || []}
            isLoading={isSearchLoading}
            isError={isSearchError}
            searchQuery={debouncedSearch}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : (
          /* Discovery View - Manga Sections with IDs for navigation */
          <div className="space-y-4">
            <section id="popular">
              <MangaSection
                title="Most Popular"
                sort="-userCount"
                isFirstSection
              />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

            <section id="rated">
              <MangaSection title="Highest Rated" sort="-averageRating" />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

            <section id="trending">
              <MangaSection title="New & Trending" sort="-startDate" />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

            <section id="upcoming">
              <MangaSection
                title="Upcoming Releases"
                sort="-userCount"
                extraFilters={{ "filter[status]": "upcoming" }}
              />
            </section>

            <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

            <section id="classics">
              <MangaSection title="All Time Classics" sort="startDate" />
            </section>
          </div>
        )}
      </Container>
    </div>
  );
}

// Loading skeleton for Suspense
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero skeleton */}
      <div className="border-b border-[var(--border)] py-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="h-8 w-48 mx-auto bg-[var(--secondary)] rounded-full animate-pulse" />
            <div className="h-16 w-96 mx-auto bg-[var(--secondary)] rounded-lg animate-pulse" />
            <div className="h-6 w-80 mx-auto bg-[var(--secondary)] rounded animate-pulse" />
            <div className="h-14 w-full max-w-xl mx-auto bg-[var(--secondary)] rounded-xl animate-pulse" />
          </div>
        </Container>
      </div>

      {/* Content skeleton */}
      <Container className="py-12">
        <div className="space-y-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-6">
              <div className="h-8 w-48 bg-[var(--secondary)] rounded animate-pulse" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div
                    key={j}
                    className="aspect-[2/3] bg-[var(--secondary)] rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <MainContent />
    </Suspense>
  );
}

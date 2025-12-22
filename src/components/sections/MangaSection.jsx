"use client";

import { MangaCard } from "@/components/features/MangaCard";
import { useManga } from "@/services/manga";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function MangaSection({
  title,
  sort,
  extraFilters = {},
  isFirstSection = false,
}) {
  const { data, isLoading } = useManga({
    page: 1,
    filters: { sort, "page[limit]": 6, ...extraFilters },
  });

  if (isLoading) {
    return (
      <div className="py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] animate-pulse rounded-lg bg-[var(--secondary)]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
          {title}
        </h2>
        <Link
          href={`/browse?sort=${sort}`}
          className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-6">
        {data.slice(0, 6).map((manga, index) => (
          <div
            key={manga.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <MangaCard item={manga} priority={isFirstSection && index < 4} />
          </div>
        ))}
      </div>
    </div>
  );
}

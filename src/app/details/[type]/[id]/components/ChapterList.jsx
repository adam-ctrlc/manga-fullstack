"use client";

import { useState, useId } from "react";
import { BookOpen, Search, X, ChevronUp, ChevronDown } from "lucide-react";

export function ChapterList({ chapterCount, onChapterClick }) {
  const chapterSearchId = useId();
  const [chapterSearch, setChapterSearch] = useState("");
  const [showAllChapters, setShowAllChapters] = useState(false);
  const [chapterSortOrder, setChapterSortOrder] = useState("asc");

  const allChapters = Array.from({ length: chapterCount || 0 }, (_, index) => ({
    number: index + 1,
    title: `Chapter ${index + 1}`,
  }));

  const sortedChapters =
    chapterSortOrder === "desc" ? [...allChapters].reverse() : allChapters;

  let filteredChapters = sortedChapters;
  if (chapterSearch.trim()) {
    filteredChapters = sortedChapters.filter(
      (chapter) =>
        chapter.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
        chapter.number.toString().includes(chapterSearch)
    );
  }

  if (!showAllChapters && !chapterSearch.trim()) {
    filteredChapters = filteredChapters.slice(0, 50);
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-3">
          <div className="w-1 h-5 bg-[var(--foreground)] rounded-full" />
          Chapters
        </h3>
        {chapterCount > 10 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setChapterSortOrder(chapterSortOrder === "asc" ? "desc" : "asc")
              }
              className="flex items-center gap-2 px-3 py-2 bg-[var(--secondary)] text-[var(--foreground)] rounded-lg border border-[var(--border)] text-sm transition-colors hover:bg-[var(--muted)]"
            >
              {chapterSortOrder === "asc" ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {chapterSortOrder === "asc" ? "Newest" : "Oldest"}
            </button>

            <div className="relative">
              <label htmlFor={chapterSearchId} className="sr-only">
                Search chapters
              </label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] h-4 w-4" />
              <input
                id={chapterSearchId}
                name="chapterSearch"
                type="text"
                placeholder="Search..."
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                autoComplete="off"
                className="pl-9 pr-8 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-lg text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--muted-foreground)] w-32"
              />
              {chapterSearch && (
                <button
                  onClick={() => setChapterSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        {chapterCount > 0 ? (
          <>
            <div className="max-h-[28rem] overflow-y-auto">
              {filteredChapters.map((chapter) => (
                <button
                  key={chapter.number}
                  onClick={() => onChapterClick(chapter.number)}
                  className="w-full flex items-center justify-between p-4 border-b border-[var(--border)] last:border-b-0 transition-colors hover:bg-[var(--secondary)] text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] font-medium text-sm">
                      {chapter.number}
                    </div>
                    <div>
                      <h4 className="text-[var(--foreground)] font-medium text-sm">
                        {chapter.title}
                      </h4>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        Click to read
                      </span>
                    </div>
                  </div>
                  <BookOpen className="h-4 w-4 text-[var(--muted-foreground)]" />
                </button>
              ))}
            </div>
            {chapterCount > 50 && !showAllChapters && !chapterSearch.trim() && (
              <div className="p-4 text-center border-t border-[var(--border)]">
                <p className="text-[var(--muted-foreground)] text-sm mb-3">
                  Showing 50 of {chapterCount} chapters
                </p>
                <button
                  onClick={() => setShowAllChapters(true)}
                  className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] text-sm rounded-lg transition-colors hover:opacity-90"
                >
                  Show All Chapters
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center text-[var(--muted-foreground)]">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No chapters available</p>
          </div>
        )}
      </div>
    </div>
  );
}

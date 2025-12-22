"use client";

import { useId } from "react";
import { Search, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { Container } from "@/components/common/Container";

export function HeroSection({ onSearchChange, searchValue }) {
  const searchInputId = useId();

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]" />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Abstract shapes */}
        <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-white/[0.015] blur-3xl" />
      </div>

      <Container className="relative py-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-4 py-1.5 text-sm text-[var(--muted-foreground)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Discover your next favorite manga</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl">
            Tales in{" "}
            <span className="relative">
              <span className="relative z-10">Panels</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-white/10 -z-0" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-[var(--muted-foreground)] sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our extensive collection of manga. Find stories that
            inspire, thrill, and captivate.
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-xl">
            <label htmlFor={searchInputId} className="sr-only">
              Search manga
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                id={searchInputId}
                name="search"
                type="text"
                placeholder="Search for manga..."
                value={searchValue || ""}
                onChange={onSearchChange}
                autoComplete="off"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)] py-4 pl-12 pr-4 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-colors focus:border-[var(--muted-foreground)] focus:outline-none"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>70,000+ Titles</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Updated Daily</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Kitsu</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

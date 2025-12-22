"use client";

import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Menu, X, Shuffle } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSectionClick = (sectionId) => {
    // If not on homepage, navigate there first
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
    } else {
      // Scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: "popular", label: "Popular" },
    { id: "rated", label: "Top Rated" },
    { id: "trending", label: "Trending" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-[var(--foreground)]">
              TalesInPanels
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSectionClick(link.id)}
                className="px-4 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)]"
              >
                {link.label}
              </button>
            ))}

            {/* Random - actual route */}
            <Link
              href="/random"
              className="ml-2 px-4 py-2 text-sm text-[var(--foreground)] transition-colors rounded-lg bg-[var(--secondary)] border border-[var(--border)] hover:bg-[var(--muted)] inline-flex items-center gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Random
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleSectionClick(link.id)}
                  className="px-4 py-3 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] hover:bg-[var(--secondary)] rounded-lg text-left"
                >
                  {link.label}
                </button>
              ))}
              <Link
                href="/random"
                className="px-4 py-3 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)] rounded-lg flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Shuffle className="h-4 w-4" />
                Random
              </Link>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}

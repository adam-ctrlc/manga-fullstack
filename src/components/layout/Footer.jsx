import Link from "next/link";
import { Container } from "@/components/common/Container";
import { BookOpen, Sparkles, Database } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <Container>
        <div className="py-12">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            {/* Brand Section */}
            <div className="space-y-4 max-w-sm">
              <Link
                href="/"
                className="text-xl font-bold text-[var(--foreground)]"
              >
                TalesInPanels
              </Link>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                A demo manga discovery platform showcasing modern web design.
                Browse, search, and explore thousands of manga titles with a
                clean, intuitive interface.
              </p>
            </div>

            {/* Info Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide">
                About
              </h4>
              <ul className="space-y-3 text-sm text-[var(--muted-foreground)]">
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4 flex-shrink-0" />
                  <span>Data provided by Kitsu API</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 flex-shrink-0" />
                  <span>70,000+ manga titles available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <span>Built as a UI/UX demonstration</span>
                </li>
              </ul>
            </div>

            {/* Disclaimer Section */}
            <div className="space-y-4 max-w-xs">
              <h4 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide">
                Disclaimer
              </h4>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                This is a simulation project for educational purposes. Manga
                content and images are sourced from Kitsu's public API.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-[var(--border)]">
            <p className="text-center text-sm text-[var(--muted-foreground)]">
              © {currentYear} TalesInPanels • Powered by Kitsu API
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

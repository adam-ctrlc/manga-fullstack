import { Container } from "@/components/common/Container";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Cover placeholder */}
      <div className="relative w-full h-64 md:h-80 bg-[var(--secondary)] animate-pulse" />

      <Container className="-mt-24 relative z-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/3">
            <div className="aspect-[2/3] bg-[var(--secondary)] rounded-lg animate-pulse" />
            <div className="mt-6 space-y-4">
              <div className="h-6 bg-[var(--secondary)] rounded animate-pulse" />
              <div className="h-4 bg-[var(--secondary)] rounded animate-pulse w-3/4" />
              <div className="h-4 bg-[var(--secondary)] rounded animate-pulse w-1/2" />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-2/3">
            <div className="h-10 bg-[var(--secondary)] rounded animate-pulse w-3/4 mb-4" />
            <div className="h-6 bg-[var(--secondary)] rounded animate-pulse w-1/2 mb-8" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-[var(--secondary)] rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function ErrorState({ error, onBackClick }) {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-[var(--secondary)] border border-[var(--border)] rounded-lg p-8">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-400" />
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            Error Loading Manga
          </h2>
          <p className="text-[var(--muted-foreground)] mb-6">
            {error?.message || "Something went wrong"}
          </p>
          <button
            onClick={onBackClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg transition-colors hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

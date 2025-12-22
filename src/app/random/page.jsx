"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertTriangle, Home } from "lucide-react";

// Loading fallback
function RandomPageLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-[var(--foreground)] animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
          Preparing random selection...
        </h2>
        <p className="text-[var(--muted-foreground)]">
          Finding the perfect manga for you
        </p>
      </div>
    </div>
  );
}

// Client component that uses useSearchParams
function RandomPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRandomItem() {
      try {
        if (!isMounted) return;

        // Get filter parameters from URL
        const status = searchParams.get("status") || "All";
        const subtype = searchParams.get("subtype") || "All";
        const sort = searchParams.get("sort") || "Most Popular";
        const search = searchParams.get("search") || "";

        const filters = { status, subtype, sort, search };

        // Call our backend API
        const response = await fetch(
          `/api/v1/random?${new URLSearchParams(filters).toString()}`
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP ${response.status}: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch random manga");
        }

        if (isMounted) {
          // Navigate to manga details
          window.location.href = `/details/manga/${data.item.id}`;
        }
      } catch (error) {
        console.error("Error fetching random manga:", error);
        if (isMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    }

    fetchRandomItem();

    return () => {
      isMounted = false;
    };
  }, [router, searchParams]);

  const goToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      {isLoading && (
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[var(--foreground)] animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            Finding something amazing for you...
          </h2>
          <p className="text-[var(--muted-foreground)]">
            Please wait while we search for a random manga
          </p>
        </div>
      )}

      {error && (
        <div className="max-w-md w-full text-center">
          <div className="bg-[var(--secondary)] border border-[var(--border)] rounded-lg p-8">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-[var(--muted-foreground)] mb-6">{error}</p>
            <button
              onClick={goToHome}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg transition-colors hover:opacity-90"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RandomPage() {
  return (
    <Suspense fallback={<RandomPageLoading />}>
      <RandomPageContent />
    </Suspense>
  );
}

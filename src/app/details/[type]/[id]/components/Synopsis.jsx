"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function Synopsis({ synopsis }) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const synopsisText = synopsis || "No synopsis available.";
  const maxLength = 400;
  const shouldTruncate = synopsisText.length > maxLength;

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-3">
        <div className="w-1 h-5 bg-[var(--foreground)] rounded-full" />
        Synopsis
      </h3>
      <div className="p-6 rounded-lg border border-[var(--border)] bg-[var(--card)]">
        {!shouldTruncate ? (
          <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
            {synopsisText}
          </p>
        ) : (
          <div>
            <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line">
              {showFullSynopsis
                ? synopsisText
                : `${synopsisText.substring(0, maxLength)}...`}
            </p>
            <button
              onClick={() => setShowFullSynopsis(!showFullSynopsis)}
              className="mt-4 text-[var(--foreground)] text-sm font-medium transition-colors flex items-center gap-1 hover:opacity-80"
            >
              {showFullSynopsis ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show More
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export function CoverSection({ coverImage, displayTitle, onBackClick }) {
  return (
    <div className="relative w-full h-64 md:h-80">
      {coverImage?.large ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/30 via-[var(--background)]/60 to-[var(--background)] z-10" />
          <Image
            src={coverImage.large}
            alt={`${displayTitle} Cover`}
            fill
            className="object-cover"
            priority
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--secondary)] to-[var(--background)]" />
      )}

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--background)]/80 backdrop-blur-sm text-[var(--foreground)] rounded-lg border border-[var(--border)] transition-colors hover:bg-[var(--secondary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    </div>
  );
}

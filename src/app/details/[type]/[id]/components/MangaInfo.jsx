import Image from "next/image";
import { BookOpen, Star, Users, Calendar } from "lucide-react";

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[var(--muted-foreground)] mt-0.5 flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-[var(--muted-foreground)] text-xs uppercase tracking-wide">
          {label}
        </span>
        <span className="text-[var(--foreground)] text-sm font-medium">
          {value}
        </span>
      </div>
    </div>
  );
}

export function MangaPoster({ posterImage, displayTitle }) {
  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-[var(--card)]">
      {posterImage?.medium ? (
        <Image
          src={posterImage.medium}
          alt={displayTitle}
          width={300}
          height={450}
          className="w-full object-cover"
          priority
        />
      ) : (
        <div className="aspect-[2/3] bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)]">
          <BookOpen className="h-12 w-12" />
        </div>
      )}
    </div>
  );
}

export function MangaInfo({
  subtype,
  status,
  averageRating,
  popularityRank,
  startDate,
  endDate,
  chapterCount,
  volumeCount,
}) {
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="mt-6 p-6 rounded-lg border border-[var(--border)] bg-[var(--card)]">
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-6 flex items-center gap-3">
        <div className="w-1 h-5 bg-[var(--foreground)] rounded-full" />
        Information
      </h3>

      <div className="space-y-4">
        <InfoItem
          icon={<BookOpen className="h-4 w-4" />}
          label="Type"
          value={capitalizeFirstLetter(subtype || "Manga")}
        />

        <InfoItem
          icon={
            <div
              className={`h-2 w-2 rounded-full ${
                status === "finished"
                  ? "bg-neutral-400"
                  : status === "current"
                  ? "bg-white"
                  : "bg-neutral-500"
              }`}
            />
          }
          label="Status"
          value={capitalizeFirstLetter(status || "Unknown")}
        />

        {averageRating && (
          <InfoItem
            icon={<Star className="h-4 w-4 fill-white" />}
            label="Rating"
            value={`${parseFloat(averageRating).toFixed(1)}%`}
          />
        )}

        {popularityRank && (
          <InfoItem
            icon={<Users className="h-4 w-4" />}
            label="Popularity"
            value={`#${popularityRank}`}
          />
        )}

        {startDate && (
          <InfoItem
            icon={<Calendar className="h-4 w-4" />}
            label="Published"
            value={`${formatDate(startDate)}${
              endDate ? ` - ${formatDate(endDate)}` : " - Present"
            }`}
          />
        )}

        {chapterCount && (
          <InfoItem
            icon={<BookOpen className="h-4 w-4" />}
            label="Chapters"
            value={chapterCount}
          />
        )}

        {volumeCount && (
          <InfoItem
            icon={<BookOpen className="h-4 w-4" />}
            label="Volumes"
            value={volumeCount}
          />
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Star, Calendar, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MangaCard({ item, className, priority = false }) {
  const { attributes, type, id } = item;

  const displayTitle =
    attributes.titles?.en ||
    attributes.titles?.en_jp ||
    attributes.canonicalTitle ||
    "No Title";
  const displayImage = attributes.posterImage?.small;
  const rating = attributes.averageRating
    ? (attributes.averageRating / 10).toFixed(1)
    : null;
  const year = attributes.startDate
    ? new Date(attributes.startDate).getFullYear()
    : null;

  const subtype =
    attributes.subtype === "TV" ? "TV" : attributes.subtype || type;
  const status = attributes.status;

  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

  const getStatusStyle = (s) => {
    switch (s) {
      case "finished":
        return "bg-neutral-700 text-neutral-300";
      case "current":
      case "publishing":
        return "bg-neutral-600 text-neutral-200";
      case "upcoming":
      case "unreleased":
        return "bg-neutral-500 text-neutral-100";
      case "tba":
        return "bg-neutral-800 text-neutral-400";
      default:
        return "bg-neutral-700 text-neutral-300";
    }
  };

  return (
    <Link
      href={`/details/${type}/${id}`}
      className={cn("block h-full group", className)}
    >
      <article className="flex flex-col h-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] transition-colors hover:border-[var(--muted-foreground)]">
        {/* Image Container */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--secondary)]">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={displayTitle}
              fill
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--muted-foreground)]">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}

          {/* Rating Badge */}
          {rating && (
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Star className="h-3 w-3 fill-white" />
              <span>{rating}</span>
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
            {subtype}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 space-y-3">
          <h3
            className="line-clamp-1 text-sm font-medium text-[var(--foreground)] group-hover:text-white transition-colors"
            title={displayTitle}
          >
            {displayTitle}
          </h3>

          <p className="line-clamp-2 text-xs text-[var(--muted-foreground)] leading-relaxed flex-1">
            {attributes.synopsis || "No description available."}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <span
              className={cn(
                "inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide",
                getStatusStyle(status)
              )}
            >
              {status}
            </span>

            {year && (
              <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                <Calendar className="h-3 w-3" />
                {year}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

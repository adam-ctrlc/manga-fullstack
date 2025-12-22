export function MangaTitle({ titles, canonicalTitle, subtype, status }) {
  const displayTitle =
    titles?.en || titles?.en_jp || canonicalTitle || "Unknown Title";

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getStatusStyle = (s) => {
    switch (s) {
      case "finished":
        return "bg-neutral-700 text-neutral-200";
      case "current":
      case "publishing":
        return "bg-neutral-600 text-neutral-100";
      case "upcoming":
        return "bg-neutral-500 text-neutral-100";
      default:
        return "bg-neutral-700 text-neutral-300";
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">
        {displayTitle}
      </h1>

      {titles?.ja_jp && (
        <h2 className="text-lg text-[var(--muted-foreground)] mb-4">
          {titles.ja_jp}
        </h2>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-3 py-1.5 text-sm rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]">
          {capitalizeFirstLetter(subtype || "Manga")}
        </span>
        {status && (
          <span
            className={`px-3 py-1.5 text-sm rounded-lg ${getStatusStyle(
              status
            )}`}
          >
            {capitalizeFirstLetter(status)}
          </span>
        )}
      </div>
    </div>
  );
}

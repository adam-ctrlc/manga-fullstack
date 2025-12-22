import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  className,
}) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === 1) params.delete("page");
    else params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (e, page) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    if (onPageChange) {
      e.preventDefault(); // If onPageChange is provided, prevent navigation and call handler
      onPageChange(page);
    }
  };

  // Simplified range generation logic
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range; // Basic implementation, can be improved to match original "perfect" overflow if needed
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      aria-label="Pagination"
    >
      <Button
        variant="outline"
        size="icon"
        asChild={currentPage > 1}
        disabled={currentPage <= 1 || isLoading}
        onClick={(e) => currentPage > 1 && handlePageChange(e, currentPage - 1)}
      >
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      {pages.map((page, i) => {
        if (page === "...") {
          return (
            <MoreHorizontal key={i} className="h-4 w-4 text-muted-foreground" />
          );
        }
        const isCurrent = page === currentPage;
        return (
          <Button
            key={i}
            variant={isCurrent ? "primary" : "outline"}
            size="icon"
            asChild
            disabled={isLoading}
            onClick={(e) => handlePageChange(e, page)}
            className={cn("w-10", isCurrent && "pointer-events-none")}
          >
            <Link href={createPageUrl(page)}>{page}</Link>
          </Button>
        );
      })}

      <Button
        variant="outline"
        size="icon"
        asChild={currentPage < totalPages}
        disabled={currentPage >= totalPages || isLoading}
        onClick={(e) =>
          currentPage < totalPages && handlePageChange(e, currentPage + 1)
        }
      >
        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </nav>
  );
}

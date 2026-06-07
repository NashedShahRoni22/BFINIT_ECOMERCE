import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const getPageNumbers = (totalPages, currentPage) => {
  const pages = [];
  const showPages = 5;

  if (totalPages <= showPages) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "ellipsis", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "ellipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        totalPages,
      );
    }
  }

  return pages;
};

export default function TablePagination({ meta, itemLabel = "items" }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = meta?.page || 1;
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.total || 0;
  const perPage = meta?.limit || 20;

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    searchParams.set("page", page.toString());
    setSearchParams(searchParams, { replace: true });
  };

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <div className="flex items-center justify-between gap-4 px-2">
      <p
        className="text-muted-foreground text-xs whitespace-nowrap"
        aria-live="polite"
      >
        Showing {startItem} to {endItem} of {totalItems} {itemLabel}
      </p>

      {totalPages > 1 && (
        <Pagination className="mx-0 w-fit">
          <PaginationContent className="gap-0 divide-x overflow-hidden rounded-lg border">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={`cursor-pointer rounded-none text-xs ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>

            {pageNumbers.map((page, index) =>
              page === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className={cn(
                      "cursor-pointer rounded-none border-none text-xs",
                      currentPage === page && "bg-accent pointer-events-none",
                    )}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={`cursor-pointer rounded-none text-xs ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

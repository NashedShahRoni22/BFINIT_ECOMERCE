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
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
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

export default function InventoryPagination({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = data?.page || 1;
  const totalPages = data?.totalPages || 1;
  const totalProducts = data?.total || 0;
  const perPageProducts = data?.limit || 20;

  const startItem = (currentPage - 1) * perPageProducts + 1;
  const endItem = Math.min(currentPage * perPageProducts, totalProducts);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set("page", page.toString());
    setSearchParams(searchParams, { replace: true });
  };

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <div className="flex items-center justify-between gap-4 px-5">
      <p
        className="text-muted-foreground text-xs whitespace-nowrap"
        aria-live="polite"
      >
        Showing <span className="text-foreground">{startItem}</span> to{" "}
        <span className="text-foreground">{endItem}</span> of{" "}
        <span className="text-foreground">{totalProducts}</span> products
      </p>

      {totalPages > 1 && (
        <Pagination className="mx-0 w-fit">
          <PaginationContent className="gap-0 divide-x overflow-hidden rounded-lg border">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={`cursor-pointer rounded-none text-xs ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
                disabled={currentPage === 1}
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
                    disabled={currentPage === page}
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
                className={`cursor-pointer rounded-none text-xs ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

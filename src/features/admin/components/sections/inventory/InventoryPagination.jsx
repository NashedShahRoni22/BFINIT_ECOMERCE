import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function InventoryPagination() {
  return (
    <div className="flex items-center justify-start gap-4 px-5">
      <div className="text-muted-foreground flex items-center justify-end whitespace-nowrap max-sm:justify-center">
        <p
          className="text-muted-foreground text-xs whitespace-nowrap"
          aria-live="polite"
        >
          Showing <span className="text-foreground">1</span> to{" "}
          <span className="text-foreground">10</span> of{" "}
          <span className="text-foreground">100</span> products
        </p>
      </div>

      <Pagination className="mx-0 w-fit justify-end">
        <PaginationContent className="gap-0 divide-x overflow-hidden rounded-lg border">
          <PaginationItem className="text-xs">
            <PaginationPrevious href="#" className="rounded-none text-xs" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="rounded-none border-none text-xs"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              className="rounded-none border-none text-xs"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" className="rounded-none text-xs" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

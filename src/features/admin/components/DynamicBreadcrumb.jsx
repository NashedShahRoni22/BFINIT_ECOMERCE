import { Link } from "react-router";
import { SlashIcon, ChevronDownIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DynamicBreadcrumb({ items = [], className = "" }) {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="contents">
              <BreadcrumbItem>
                {item.dropdown ? (
                  // Dropdown item
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs font-normal transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0">
                      {item.label}
                      <ChevronDownIcon className="h-3 w-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <DropdownMenuItem
                          key={dropdownIndex}
                          asChild
                          className="cursor-pointer"
                        >
                          <Link to={dropdownItem.href}>
                            {dropdownItem.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : isLast ? (
                  // Last item (current page)
                  <BreadcrumbPage className="text-foreground text-xs font-medium">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  // Regular link
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-foreground text-xs font-normal transition-colors"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  <SlashIcon className="text-muted-foreground h-3 w-3" />
                </BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

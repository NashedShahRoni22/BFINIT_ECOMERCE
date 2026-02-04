import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import useSelectedStore from "@/hooks/useSelectedStore";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function BlogTableRow({ blog }) {
  const queryClient = useQueryClient();
  const { storeId } = useSelectedStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { blogName, blogImage, blogId } = blog;

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/blog/delete/${blog?.blogId}`,
    token: true,
    clientId: true,
  });

  const handleBlogDelete = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success("Blog deleted!");
        close();
        queryClient.invalidateQueries(["blogs", storeId]);
      },
      onError: () => {
        toast.error("Something went wrong!");
        close();
      },
    });
  };

  return (
    <>
      <TableRow>
        {/* <TableCell className="w-10 border border-l-0">
          <Checkbox />
        </TableCell> */}

        <TableCell className="border">
          <div className="flex items-start gap-3">
            <div className="aspect-square size-10 overflow-hidden rounded-md border">
              <img
                src={`https://ecomback.bfinit.com${blogImage}`}
                alt={blogName}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="mt-1 text-xs">
              <p title={blogName} className="max-w-xs truncate font-medium">
                {blogName}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="border border-r-0 text-right">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  target="_blank"
                  to={`/stores/${storeId}/blog/${blogId}`}
                  className="cursor-pointer text-xs font-medium"
                >
                  <Eye />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to={`/blogs/edit/${blogId}`}
                  className="cursor-pointer text-xs font-medium"
                >
                  <Pencil />
                  Edit
                </Link>
              </DropdownMenuItem>

              {/* delete menu item */}
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer text-xs font-medium"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDeleteDialogOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <Trash2 className="text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Delete Modal */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete blog?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">&quot;{blogName}&quot;</span>? This
            action cannot be undone.
          </>
        }
        onConfirm={handleBlogDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        loadingText="Deleting"
        variant="destructive"
      />
    </>
  );
}

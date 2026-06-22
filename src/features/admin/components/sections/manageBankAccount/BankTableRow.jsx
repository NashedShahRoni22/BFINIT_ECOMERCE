import { useState } from "react";
import { Link } from "react-router";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import ConfirmationDialog from "../../modals/ConfirmationDialog";
import useSelectedStore from "@/hooks/useSelectedStore";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";

export default function BankTableRow({ bank }) {
  const queryClient = useQueryClient();
  const { activeStore } = useSelectedStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { account_number, bank_name, account_name, routing_number, id } = bank;

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/api/v1/bankPayment/delete/${activeStore?.id}/${id}`,
    token: true,
    clientId: true,
  });

  const handleBankDelete = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success("Blog deleted!");
        close();
        queryClient.invalidateQueries(["blogs", activeStore?.id]);
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
        <TableCell className="border">
          <div className="mt-1 flex items-center justify-center text-xs">
            <p title={bank_name} className="max-w-xs truncate font-medium">
              {bank_name}
            </p>
          </div>
        </TableCell>

        <TableCell className="border">
          <div className="mt-1 flex items-center justify-center text-xs">
            <p title={account_name} className="max-w-xs truncate font-medium">
              {account_name}
            </p>
          </div>
        </TableCell>

        <TableCell className="border">
          <div className="mt-1 flex items-center justify-center text-xs">
            <p title={account_number} className="max-w-xs truncate font-medium">
              {account_number}
            </p>
          </div>
        </TableCell>

        <TableCell className="border">
          <div className="mt-1 flex items-center justify-center text-xs">
            <p title={routing_number} className="max-w-xs truncate font-medium">
              {routing_number}
            </p>
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
                  to={`/stores/${activeStore?.id}/blog/${id}`}
                  className="cursor-pointer text-xs font-medium"
                >
                  <Eye />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to={`/payment/edit/${id}`}
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
            <span className="font-medium">&quot;{bank_name}&quot;</span>? This
            action cannot be undone.
          </>
        }
        onConfirm={handleBankDelete}
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

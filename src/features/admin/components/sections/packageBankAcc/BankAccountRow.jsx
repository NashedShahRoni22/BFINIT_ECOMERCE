import { useState } from "react";
import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmationDialog from "../../modals/ConfirmationDialog";

export default function BankAccountRow({ account }) {
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/api/v1/platform-bank-payment/delete/${account.id}`,
    newBaseUrl: true,
  });

  const handleDelete = () => {
    mutate(null, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["platform_banks"]);
        close();
        toast.success(data?.message);
      },
      onError: (error) => {
        close();
        toast.error(error?.message);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="text-xs font-medium">
          {account.bank_name}
        </TableCell>
        <TableCell className="text-muted-foreground text-xs">
          {account.account_name}
        </TableCell>
        <TableCell className="text-muted-foreground font-mono text-xs">
          ••••••{account.account_number.slice(-4)}
        </TableCell>
        <TableCell className="text-muted-foreground font-mono text-xs">
          {account.routing_number}
        </TableCell>
        <TableCell className="text-muted-foreground font-mono text-xs">
          {account.swift_code}
        </TableCell>
        <TableCell className="text-xs">
          {account.is_active ? (
            <Badge variant="success" className="text-xs">
              Active
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs">
              Inactive
            </Badge>
          )}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                  <Link to={`/bank-accounts/edit/${account.id}`}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 w-7"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title="Delete Bank Account?"
        description={
          <>
            Are you sure you want to delete{" "}
            <span className="font-medium">
              &quot;{account?.bank_name}&quot;
            </span>
            ? This action cannot be undone.
          </>
        }
        onConfirm={handleDelete}
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

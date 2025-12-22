import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/auth/useAuth";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";

export default function StoreDeleteModal({
  store = {},
  showDeleteDialog,
  setShowDeleteDialog,
}) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { storeName, storeId } = store;

  // custom delete hook
  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/store/delete/${storeId}`,
    token: true,
    clientId: true,
  });

  // handle store delete
  const handleDelete = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success("Store deleted successfully!");
        queryClient.invalidateQueries([
          "admin",
          "stores",
          user?.data?.clientid,
        ]);
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm font-semibold">
            Delete Store?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-xs">
            Are you sure you want to delete <strong>{storeName}</strong>? This
            action cannot be undone. All store data, products and customizations
            will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 min-w-[115px] overflow-hidden text-xs"
          >
            {isPending ? (
              <>
                <Spinner /> Deleting...
              </>
            ) : (
              <>
                <Trash2 />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
import { Trash2 } from "lucide-react";

export default function CountryRemoveModal({
  open,
  setOpen,
  country,
  onConfirm,
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm font-semibold">
            Remove {country?.country_name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground text-xs">
            Removing <strong>{country?.country_name}</strong> will delete all
            product prices in <strong>{country?.currency_code}</strong> (
            {country?.currency_symbol}). Re-adding this country later will{" "}
            <strong>not</strong> restore those prices — each product will need
            to be manually repriced.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs"
          >
            <Trash2 />
            Remove Country
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

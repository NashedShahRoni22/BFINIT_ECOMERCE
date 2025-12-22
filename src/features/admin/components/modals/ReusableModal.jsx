import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ReusableModal({ children, isOpen, close, maxWidth }) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div>
        <div className="flex min-h-full items-center justify-center py-5">
          <DialogContent transition>{children}</DialogContent>
        </div>
      </div>
    </Dialog>
  );
}

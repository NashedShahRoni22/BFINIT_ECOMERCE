import { useState } from "react";
import { Trash, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ConfirmationDialog from "../../../modals/ConfirmationDialog";
import toast from "react-hot-toast";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";
import { useParams } from "react-router";

export default function AttributeCard({
  attribute,
  isEditMode,
  onDelete,
  onUpdateName,
  onAddValues,
  onRemoveValue,
  onToggleRequired,
}) {
  const { productId } = useParams();

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/product/delete/attribute/${productId}?attributeId=${attribute.id}`,
    token: true,
    clientId: true,
  });

  const [inputValue, setInputValue] = useState("");
  const [nameValue, setNameValue] = useState(attribute.name);
  const [isEditingName, setIsEditingName] = useState(!attribute.name);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setNameValue(newName);
    onUpdateName(newName);
  };

  const handleNameSubmit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      if (nameValue.trim()) {
        setIsEditingName(false);
      }
    }
  };

  const handleAttributeDelete = () => {
    if (isEditMode) {
      setIsDeleteDialogOpen(true);
    } else {
      onDelete();
    }
  };

  const confirmDeleteAttribute = () => {
    if (attribute) {
      mutate(null, {
        onSuccess: () => {
          onDelete();
          setIsDeleteDialogOpen(false);
          toast.success("Attribute deleted successfully");
        },

        onError: () => {
          onDelete();
          setIsDeleteDialogOpen(false);
          toast.success("Attribute deleted successfully");
        },
      });
    }
  };

  const handleAddValues = () => {
    if (inputValue.trim()) {
      onAddValues(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="rounded-lg border p-4">
      {/* Attribute name */}
      <div className="mb-4 flex w-full items-center justify-between gap-2">
        {isEditingName ? (
          <Input
            value={nameValue}
            onChange={handleNameChange}
            onKeyPress={handleNameSubmit}
            onBlur={handleNameSubmit}
            placeholder="Enter attribute name (e.g., Color, Size)"
            className="text-xs font-medium"
            autoFocus
          />
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <p className="truncate text-xs font-medium">{nameValue}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditingName(true)}
              className="text-muted-foreground hover: h-auto shrink-0 p-1 text-xs"
            >
              Edit
            </Button>
          </div>
        )}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleAttributeDelete}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive size-8 shrink-0"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      {/* Rendered variant values */}
      {attribute.values.length > 0 && (
        <div className="mb-4">
          <ul className="flex flex-wrap items-center gap-2">
            {attribute.values.map((value) => (
              <li key={value.id} className="group relative">
                <div className="bg-card flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs">
                  <span className="max-w-[120px] truncate md:max-w-none">
                    {value.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveValue(value.id)}
                    className="text-destructive hover:bg-destructive/10 shrink-0 rounded-full p-0.5"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add attribute value input field */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="flex flex-1 gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddValues();
              }
            }}
            placeholder="Press Enter or use commas for multiple (e.g., Red, Blue, Green)"
          />
          <Button
            onClick={handleAddValues}
            disabled={!inputValue.trim()}
            size="sm"
            variant="outline"
            className="shrink-0 text-xs"
          >
            Add
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id={`required-${attribute.id}`}
            checked={attribute.required}
            onCheckedChange={onToggleRequired}
          />
          <Label
            htmlFor={`required-${attribute.id}`}
            className="flex cursor-pointer items-center gap-1.5 text-xs"
          >
            Required
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="text-muted-foreground h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    Customers must choose this option before checkout
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
        </div>
      </div>

      {/* Attribute delete confirmation modal */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete attribute?"
        description={
          <>
            Are you sure you want to delete the{" "}
            {attribute.name ? (
              <>
                <span className="font-medium">
                  &quot;{attribute.name}&quot;
                </span>{" "}
                attribute
              </>
            ) : (
              "this attribute"
            )}
            ? This will also delete all its variants. This action cannot be
            undone.
          </>
        }
        onConfirm={confirmDeleteAttribute}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
        }}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        loadingText="Deleting"
        variant="destructive"
      />
    </div>
  );
}

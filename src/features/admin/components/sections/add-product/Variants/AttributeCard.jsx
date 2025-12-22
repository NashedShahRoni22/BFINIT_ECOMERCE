import { useState } from "react";
import { Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AttributeCard({
  attribute,
  onDelete,
  onUpdateName,
  onAddValues,
  onRemoveValue,
  onToggleRequired,
}) {
  const [inputValue, setInputValue] = useState("");
  const [nameValue, setNameValue] = useState(attribute.name);
  const [isEditingName, setIsEditingName] = useState(!attribute.name); // Show input if no name initially

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
            <p className="text-foreground truncate text-xs font-medium">
              {nameValue}
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditingName(true)}
              className="text-muted-foreground hover:text-foreground h-auto shrink-0 p-1 text-xs"
            >
              Edit
            </Button>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
          className="size-8 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-700"
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
                <div className="flex items-center gap-1.5 rounded-md border bg-white px-2.5 py-1.5 text-xs">
                  <span className="max-w-[120px] truncate md:max-w-none">
                    {value.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveValue(value.id)}
                    className="shrink-0 rounded-full p-0.5 text-red-500 hover:bg-red-50"
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
            className="shrink-0"
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
            className="cursor-pointer"
          >
            Required
          </Label>
        </div>
      </div>
    </div>
  );
}

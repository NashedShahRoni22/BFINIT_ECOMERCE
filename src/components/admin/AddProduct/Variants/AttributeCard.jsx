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
    <div className="rounded-lg border bg-[#F9FAFB] p-3 md:p-4">
      {/* attribute name */}
      <div className="mb-3 flex w-full items-center justify-between gap-2 md:mb-4">
        {isEditingName ? (
          <Input
            value={nameValue}
            onChange={handleNameChange}
            onKeyPress={handleNameSubmit}
            onBlur={handleNameSubmit}
            placeholder="Enter attribute name (e.g., Color, Size)"
            className="rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium shadow-none"
            autoFocus
          />
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <p className="truncate text-sm font-medium text-gray-700">
              {nameValue}
            </p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditingName(true)}
              className="h-auto shrink-0 p-1 text-xs text-gray-500 hover:text-gray-700 md:text-sm"
            >
              Edit
            </Button>
          </div>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={onDelete}
          className="size-7 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-700 md:size-8"
        >
          <Trash className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </Button>
      </div>

      {/* rendered variant values */}
      {attribute.values.length > 0 && (
        <div className="mb-3 md:mb-4">
          <ul className="flex flex-wrap items-center gap-2">
            {attribute.values.map((value) => (
              <li key={value.id} className="group relative">
                <div className="flex items-center gap-1 rounded-md border bg-white px-2 py-1 text-xs md:px-2.5 md:py-1.5 md:text-sm">
                  <span className="max-w-[120px] truncate md:max-w-none">
                    {value.name}
                  </span>

                  <button
                    type="button"
                    onClick={() => onRemoveValue(value.id)}
                    className="shrink-0 rounded-full p-0.5 text-red-500 hover:bg-red-50"
                  >
                    <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* add attribute value input field */}
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
            placeholder="Add values (separate with | for multiple)"
            className="border-gray-200 bg-white text-sm shadow-none"
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
            className="cursor-pointer"
          />
          <Label
            htmlFor={`required-${attribute.id}`}
            className="cursor-pointer text-sm font-medium text-gray-700"
          >
            Required
          </Label>
        </div>
      </div>
    </div>
  );
}

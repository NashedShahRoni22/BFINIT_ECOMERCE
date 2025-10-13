import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Store, Info } from "lucide-react";
import useGetStores from "@/hooks/stores/useGetStores";

export default function SelectStore({
  form,
  storeId,
  title,
  description,
  placeholder = "Select a store",
  alertMessage,
  showHeader = true,
}) {
  // fetch all stores
  const { data, isLoading } = useGetStores();

  const stores = data?.data || [];
  const hasStores = stores.length > 0;

  return (
    <div className="bg-card rounded-lg border p-6">
      {/* Header Section */}
      {showHeader && (title || description) && (
        <div className="mb-5 space-y-1">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      )}

      {/* Form Field */}
      <FormField
        control={form.control}
        name="storeId"
        rules={{ required: "Please select a store" }}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isLoading || !hasStores}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  {isLoading ? (
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Loading stores...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder={placeholder} />
                  )}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {hasStores ? (
                  stores.map((store) => (
                    <SelectItem
                      key={store?.storeId}
                      value={store?.storeId}
                      className="cursor-pointer text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Store className="text-muted-foreground h-3.5 w-3.5" />
                        <span>{store?.storeName}</span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-muted-foreground py-6 text-center text-sm">
                    No stores available
                  </div>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Info Alert */}
      {!storeId && alertMessage && (
        <Alert className="mt-4 border-blue-200 bg-blue-50/50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-xs text-blue-900/90">
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

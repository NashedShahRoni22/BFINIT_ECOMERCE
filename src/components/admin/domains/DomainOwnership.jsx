import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const DomainOwnership = ({ form }) => {
  return (
    <div className="bg-card rounded-lg border p-6">
      {/* Header Section */}
      <div className="mb-5 space-y-1">
        <h2 className="text-base font-semibold">Domain Ownership Check</h2>
        <p className="text-muted-foreground text-sm">
          Tell us about your domain situation so we can guide you through the
          right process
        </p>
      </div>

      <FormField
        control={form.control}
        name="domainOwnership"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-3"
              >
                <div className="flex gap-2 rounded-[10px] border px-4 py-3">
                  <RadioGroupItem
                    value="has-domain"
                    id="has-domain"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="has-domain"
                    className="w-full cursor-pointer flex-col items-start gap-1.5"
                  >
                    <p>Yes, I have a domain</p>
                    <p className="text-muted-foreground text-sm">
                      I already own a domain and want to connect it to my store
                    </p>
                  </Label>
                </div>
                <div className="flex gap-2 rounded-[10px] border px-4 py-3">
                  <RadioGroupItem
                    value="need-domain"
                    id="need-domain"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="need-domain"
                    className="w-full cursor-pointer flex-col items-start gap-1.5"
                  >
                    <p>No, I need to buy one</p>
                    <p className="text-muted-foreground text-sm">
                      Help me purchase a domain from trusted registrars
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DomainOwnership;

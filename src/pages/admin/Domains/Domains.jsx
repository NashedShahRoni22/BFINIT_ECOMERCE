import DomainField from "@/components/admin/domains/DomainField";
import DomainOwnership from "@/components/admin/domains/DomainOwnership";
import NewDomain from "@/components/admin/domains/NewDomain";
import SelectStore from "@/components/admin/domains/SelectStore";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function Domains() {
  const form = useForm({
    defaultValues: {
      domainOwnership: "has-domain",
    },
    mode: "onChange",
  });
  const { handleSubmit } = form;

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <SelectStore form={form} />
        <DomainOwnership form={form} />

        {/* Conditional Domain field Rendering based on selection */}
        {form.watch("domainOwnership") === "need-domain" && <NewDomain />}
        {form.watch("domainOwnership") === "has-domain" && (
          <DomainField form={form} />
        )}

        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <Button variant="outline" size="lg" asChild>
            <Link to="/">
              <ChevronLeft /> Back to stores
            </Link>
          </Button>

          {/* optional submit button for custom domain */}
          {form.watch("domainOwnership") !== "need-domain" && (
            <div className="flex flex-col-reverse gap-4 lg:flex-row">
              <Button variant="outline" size="lg" className="cursor-pointer">
                Save as Draft
              </Button>

              <Button type="submit" size="lg" className="cursor-pointer">
                Complete Integration
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}

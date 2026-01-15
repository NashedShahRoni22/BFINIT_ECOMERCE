import { useEffect, useState } from "react";
import {
  Landmark,
  AlertCircle,
  Building2,
  User,
  Hash,
  Code,
} from "lucide-react";
import { useForm } from "react-hook-form";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import usePostMutation from "@/hooks/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import toast from "react-hot-toast";
import useGetQuery from "@/hooks/api/useGetQuery";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";

const fillFormWithBankData = (bankPayment, form) => {
  const { bankName, accountName, accountNumber, routingNumber, swiftCode } =
    bankPayment.data;

  form.reset({
    bankName,
    accountName,
    accountNumber,
    routingNumber,
    swiftCode,
  });
};

export default function BankPayment() {
  const { selectedStore } = useSelectedStore();

  const { data: bankPayment } = useGetQuery({
    endpoint: `/bankpayment/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
    queryKey: ["bankpayment", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });

  const { mutate, isPending } = usePostMutation({
    endpoint: `/bankpayment/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = usePatchMutaion({
    endpoint: `/bankpayment/${bankPayment?.data?._id}`,
    token: true,
    clientId: true,
  });

  const form = useForm({
    defaultValues: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      swiftCode: "",
    },
  });

  useEffect(() => {
    if (bankPayment?.data) {
      fillFormWithBankData(bankPayment, form);
    }
  }, [bankPayment, form]);

  const onSubmit = async (data) => {
    if (!bankPayment?.data) {
      mutate(data, {
        onSuccess: () => {
          toast.success("Bank account connected successfully");
        },

        onError: () => {
          toast.error("Error connecting bank account");
        },
      });
    } else {
      updateMutate(data, {
        onSuccess: () => {
          toast.success("Bank account updated successfully");
        },

        onError: () => {
          toast.error("Error updating bank account");
        },
      });
    }
  };

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.BankPayment} />

      {/* Page Header */}
      <PageHeader
        icon={Landmark}
        title="Bank Account Integration"
        description="Connect your bank account to accept direct bank transfers"
        showStoreName={false}
      />

      {/* Info Alert */}
      <Alert className="bg-muted border-border">
        <AlertCircle className="text-muted-foreground h-4 w-4" />
        <AlertDescription className="text-muted-foreground text-sm">
          Your bank account details will be displayed to customers for making
          direct transfers. Ensure all information is accurate.
        </AlertDescription>
      </Alert>

      {/* Bank Account Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bank Account Details</CardTitle>
          <CardDescription className="text-sm">
            Enter your bank account information to receive payments
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Bank Name */}
              <FormField
                control={form.control}
                name="bankName"
                rules={{
                  required: "Bank name is required",
                  minLength: {
                    value: 2,
                    message: "Bank name must be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Building2 className="text-muted-foreground h-4 w-4" />
                      Bank Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., ABC Bank"
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      The official name of your bank
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Account Name */}
              <FormField
                control={form.control}
                name="accountName"
                rules={{
                  required: "Account holder name is required",
                  minLength: {
                    value: 2,
                    message:
                      "Account holder name must be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <User className="text-muted-foreground h-4 w-4" />
                      Account Holder Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., John Doe"
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Name as it appears on your bank account
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Account Number */}
              <FormField
                control={form.control}
                name="accountNumber"
                rules={{
                  required: "Account number is required",
                  minLength: {
                    value: 8,
                    message: "Account number must be at least 8 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Hash className="text-muted-foreground h-4 w-4" />
                      Account Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 1234567890"
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Your bank account number
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Routing Number */}
              <FormField
                control={form.control}
                name="routingNumber"
                rules={{
                  required: "Routing number is required",
                  minLength: {
                    value: 9,
                    message: "Routing number must be 9 digits",
                  },
                  maxLength: {
                    value: 9,
                    message: "Routing number must be 9 digits",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Code className="text-muted-foreground h-4 w-4" />
                      Routing Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 987654321"
                        maxLength={9}
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      9-digit code that identifies your bank
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* SWIFT Code */}
              <FormField
                control={form.control}
                name="swiftCode"
                rules={{
                  required: "SWIFT code is required",
                  minLength: {
                    value: 8,
                    message: "SWIFT code must be 8-11 characters",
                  },
                  maxLength: {
                    value: 11,
                    message: "SWIFT code must be 8-11 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Code className="text-muted-foreground h-4 w-4" />
                      SWIFT/BIC Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., ABCDUS33"
                        maxLength={11}
                        className="text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      International bank identifier code (8-11 characters)
                    </FormDescription>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Separator />

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={isPending || isUpdatePending}
                  className="text-sm"
                >
                  {isPending || isUpdatePending
                    ? "Connecting..."
                    : "Connect Bank Account"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isPending}
                  className="text-sm"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Security Note */}
      <Alert className="bg-muted/50 border-border">
        <AlertCircle className="text-muted-foreground h-4 w-4" />
        <AlertDescription className="text-muted-foreground text-xs">
          Your bank information is securely stored and encrypted. We never share
          your banking details with third parties.
        </AlertDescription>
      </Alert>
    </section>
  );
}

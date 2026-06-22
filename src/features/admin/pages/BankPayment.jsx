import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Landmark,
  AlertCircle,
  Building2,
  User,
  Hash,
  Code,
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import usePostMutation from "@/hooks-v2/api/usePostMutation";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import useAuth from "@/hooks/auth/useAuth";
import { breadcrubms } from "@/utils/constants/breadcrumbs";

const fillFormWithBankData = (bankPayment, form) => {
  const {
    bank_name,
    account_name,
    account_number,
    routing_number,
    swift_code,
    is_active,
  } = bankPayment;

  form.reset({
    bank_name,
    account_name,
    account_number,
    routing_number,
    swift_code,
    is_active,
  });
};

export default function BankPayment({ data }) {
  const { activeStore } = useSelectedStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      bank_name: "",
      account_name: "",
      account_number: "",
      routing_number: "",
      swift_code: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (data) {
      fillFormWithBankData(data, form);
    }
  }, [data, form]);

  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/bankPayment/create",
    isTokenRequired: true,
  });

  const { mutate: updateMutate, isPending: isUpdatePending } = usePatchMutation(
    {
      endpoint: `/api/v1/bankPayment/update/${activeStore?.id}/${data?.id}`,
      isTokenRequired: true,
    },
  );

  const onSubmit = async (accountData) => {
    accountData.id = user.data.packageStatus[0].id;
    accountData.user_id = user.data.packageStatus[0].user_id;
    accountData.store_id = activeStore.id;
    accountData.tenant_id = user.data.roles[0].tenant_id;
    if (!data?.id) {
      mutate(accountData, {
        onSuccess: () => {
          toast.success("Bank account connected successfully");
          navigate("/payments/manage-bank");
        },

        onError: () => {
          toast.error("Error connecting bank account");
        },
      });
    } else {
      updateMutate(accountData, {
        onSuccess: () => {
          toast.success("Bank account updated successfully");
          navigate("/payments/manage-bank");
        },

        onError: () => {
          toast.error("Error updating bank account");
        },
      });
    }
  };

  let btnText = null;
  if (isPending) {
    btnText = "Connecting...";
  }
  if (isUpdatePending) {
    btnText = "Updating...";
  }
  if (data?.id && !isPending && !isUpdatePending) {
    btnText = "Update Bank Account";
  }
  if (!data?.id && !isPending && !isUpdatePending) {
    btnText = "Connect Bank Account";
  }

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
                name="bank_name"
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
                name="account_name"
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
                name="account_number"
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
                name="routing_number"
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
                name="swift_code"
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

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm">Active Bank</FormLabel>
                      <FormDescription className="text-xs">
                        Enable or disable active bank
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
                  {btnText}
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

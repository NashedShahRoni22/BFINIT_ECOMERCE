import OrderDetails from "@/features/super-admin/pages/OrderDetails";
import { lazy, Suspense } from "react";
const SuperAdminLayout = lazy(() => import("@/layouts/SuperAdminLayout"));
const Packages = lazy(() => import("@/features/super-admin/pages/Packages"));
const PackageForm = lazy(
  () => import("@/features/super-admin/pages/PackageForm"),
);
const BankAccounts = lazy(
  () => import("@/features/super-admin/pages/BankAccounts"),
);
const BankForm = lazy(
  () =>
    import("@/features/super-admin/components/sections/bank-accounts/BankForm"),
);
const Orders = lazy(() => import("@/features/super-admin/pages/Orders"));

export const superAdminRoutes = {
  path: "/super-admin",
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <SuperAdminLayout />
    </Suspense>
  ),
  children: [
    { path: "packages", element: <Packages /> },
    { path: "packages/add-package", element: <PackageForm /> },
    { path: "packages/edit/:id", element: <PackageForm /> },
    { path: "orders", element: <Orders /> },
    { path: "orders/:invoiceId", element: <OrderDetails /> },
    { path: "bank-accounts", element: <BankAccounts /> },
    { path: "bank-accounts/new", element: <BankForm /> },
    { path: "bank-accounts/edit/:id", element: <BankForm /> },
  ],
};

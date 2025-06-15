import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TourProvider } from "@reactour/tour";
import { Toaster } from "react-hot-toast";
import CartProvider from "./Providers/CartProvider.jsx";
import CategoryProvider from "./Providers/CategoryProvider.jsx";
import ThemeProvider from "./Providers/ThemeProvider.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import "./index.css";

const queryClient = new QueryClient();

const steps = [
  {
    selector: '[data-tour-element=""]',
    content: (
      <div className="space-y-3 text-center">
        <h2 className="text-xl font-bold text-blue-600">
          👋 Welcome to BFINIT Ecommerce
        </h2>
        <p className="text-sm text-gray-700">
          BFINIT helps you launch and manage your own online store in just a few
          steps — no coding required.
        </p>
        <p className="text-sm text-gray-700">
          In this quick tour, we&apos;ll guide you through everything you need
          to get started:
        </p>
        <ul className="list-inside list-disc text-left text-sm text-gray-600">
          <li>⚙️ Setting up your store</li>
          <li>🎨 Customizing the design</li>
          <li>📦 Adding your first product</li>
          <li>💳 Enabling payments</li>
          <li>🚀 Publishing your storefront</li>
        </ul>
        <p className="text-sm text-gray-700">Let&apos;s get started!</p>
        <button className="mt-3 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          Start the Tour
        </button>
      </div>
    ),
  },
  {
    selector: "[data-tour-element='create-store']",
    content: <p>Create your first store by click on this</p>,
  },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CategoryProvider>
          <CartProvider>
            <ThemeProvider>
              <TourProvider
                steps={steps}
                onClickMask={({
                  setCurrentStep,
                  currentStep,
                  steps,
                  setIsOpen,
                }) => {
                  if (steps) {
                    if (currentStep === steps.length - 1) {
                      setIsOpen(false);
                    }
                    setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
                  }
                }}
                prevButton={({ currentStep, setCurrentStep }) => {
                  const first = currentStep === 0;
                  if (first) {
                    return null;
                  }
                  return (
                    <button
                      onClick={() => setCurrentStep((s) => s - 1)}
                      className="bg-dashboard-primary rounded px-4 py-2 text-white"
                    >
                      Back
                    </button>
                  );
                }}
                nextButton={({
                  currentStep,
                  stepsLength,
                  setIsOpen,
                  setCurrentStep,
                  steps,
                }) => {
                  const last = currentStep === stepsLength - 1;
                  return (
                    <button
                      onClick={() => {
                        if (last) {
                          setIsOpen(false);
                        } else {
                          setCurrentStep((s) =>
                            s === steps?.length - 1 ? 0 : s + 1,
                          );
                        }
                      }}
                      className="bg-dashboard-primary rounded px-4 py-2 text-white"
                    >
                      {last ? "Close!" : "Next"}
                    </button>
                  );
                }}
              >
                <RouterProvider router={router} />
              </TourProvider>
            </ThemeProvider>
          </CartProvider>
        </CategoryProvider>
      </AuthProvider>
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>,
);

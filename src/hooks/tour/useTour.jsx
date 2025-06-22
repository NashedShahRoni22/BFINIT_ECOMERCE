import { useNavigate } from "react-router";
import Shepherd from "shepherd.js";

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    exitOnEsc: true,
    cancelIcon: { enabled: true },
  },
  useModalOverlay: true,
});

export default function useTour() {
  const navigate = useNavigate();

  const TOUR_COMPLETE_KEY = "bfinit_tour_complete";

  const startTour = (startFromId = "") => {
    const isComplete = localStorage.getItem(TOUR_COMPLETE_KEY) === "true";
    if (isComplete) return;

    if (startFromId) {
      tour.start();
      tour.show(startFromId);
    } else {
      tour.start();
    }
  };

  const addSteps = () => {
    if (tour.steps.length) return;

    tour.addStep({
      id: "step-1",
      text: `
        <div class="text-gray-700 text-sm leading-relaxed space-y-3">
          <h2 class="text-xl font-semibold text-gray-800">Welcome to BFINIT Ecommerce Admin Dashboard</h2>
          <p>
            In this short tutorial, we'll walk you through the key features of your admin dashboard —
            from creating your first store, customizing its settings, and adding products to managing your business efficiently.
          </p>
          <p>
            This is a general overview to help you get started quickly. You’ll be able to explore each step with guided highlights.
          </p>
          <p>
            Prefer reading instead? We’ve got you covered! A full PDF guide is available — just look at the bottom of your navigation bar
            labeled <span class="font-medium text-gray-800">"Get Help Guide"</span>, or access it via the second dropdown menu at the top right corner of your dashboard.
          </p>
          <p class="text-sm text-gray-500 italic">
            Let’s get started!
          </p>
        </div>`,
      attachTo: {
        element: '[data-tour="step-1"]',
        on: "right-end",
      },
      buttons: [
        {
          text: "Skip",
          action: () => {
            localStorage.setItem("bfinit_tour_complete", "true");
            tour.cancel();
          },
        },
        {
          text: "Next",
          action: () => {
            navigate("/");
            tour.next();
          },
        },
      ],
    });

    tour.addStep({
      id: "step-2",
      text: `
        <p class="text-sm text-gray-700">
          Clicking your name in the top-right corner opens a dropdown with useful links — like your profile, store access, Help Center, the downloadable <span class="font-medium text-gray-800">Get Help Guide</span>, and the logout option.
        </p>`,
      attachTo: {
        element: '[data-tour="step-2"]',
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-3",
      text: `
        <p class="text-sm text-gray-700">
          Click the bell icon at the top to view your latest notifications. This dropdown keeps you updated on new orders, messages, and important alerts — so you never miss a thing.
        </p>`,
      attachTo: {
        element: '[data-tour="step-3"]',
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-4",
      text: `
        <p class="text-sm text-gray-700">
          Create your first store by clicking here.
        </p>`,
      attachTo: {
        element: '[data-tour="step-4"]',
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: () => {
            navigate("/create-store");
            tour.next();
          },
        },
      ],
    });

    tour.addStep({
      id: "step-5",
      text: `
        <div class="text-sm text-gray-700 space-y-3">
          <p>
            This is where you'll <strong>create your first store</strong>. Just fill in the required fields marked with an asterisk (<span class="text-red-500">*</span>).
          </p>
          <p>
            <strong>Logo</strong> and <strong>Favicon</strong> uploads are required. Make sure to follow the recommended dimensions and formats for best results.
          </p>
          <p>
            When you choose a <strong>Country</strong>, the <strong>Currency</strong> fields will be auto-filled based on your selection.
          </p>
          <p>
            Don't forget to pick a <strong>Store Theme</strong> at the bottom — this will control how your storefront looks. <span class="text-gray-600">By default,</span> the <strong class="text-dashboard-primary">Midnight Blaze</strong> theme is selected, but feel free to explore and choose the one that best suits your brand.
          </p>
          <p class="italic text-gray-500">
            Once everything is set, click the <strong>Create New Store</strong> button to finish setup.
          </p>
        </div>`,
      attachTo: {
        element: '[data-tour="step-5"]',
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: () => {
            navigate("/");
            tour.back();
          },
        },
        {
          text: "Next",
          action: tour.complete,
        },
      ],
    });

    tour.addStep({
      id: "step-6",
      text: `
        <p class="text-sm text-gray-700">
          This is your <strong>Stores</strong> section — here you can see a list of all the stores you've created.
          From this page, you can <strong>preview</strong> a store, <strong>customize</strong> its appearance, or even <strong>delete</strong> a store if needed.
          We'll guide you through each of these actions in the next steps.
        </p>`,
      attachTo: {
        element: '[data-tour="step-6"]',
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-7",
      text: `
        <p class="text-sm text-gray-700">
          This section shows how many stores you've created out of your total allowed limit.
          For example, <strong>(2/5)</strong> means you've created 2 stores out of your 5-store limit.
          It helps you keep track of your usage and know when you're nearing the limit.
        </p>`,
      attachTo: {
        element: '[data-tour="step-7"]',
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-8",
      text: `
        <p class="text-sm text-gray-700">
          Each row shows a created store with quick action buttons. Click the <strong>eye icon</strong> to preview your store as customers will see it. The <strong>pencil icon</strong> lets you customize your layout, sections, and theme. The <strong>trash icon</strong> will permanently delete the store and all its products.
        </p>`,
      attachTo: {
        element:
          "#root > main > div > section > div.mt-6 > div.mt-4.w-full.overflow-x-auto > table > tbody > tr:nth-child(1)",
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-9",
      text: `
        <p class="text-sm text-gray-700">
          The <strong>Products</strong> menu gives access to tools like Category, Brand and Product Management. Click to get started.
        </p>`,
      attachTo: {
        element: "[data-tour='step-9']",
        on: "right-start",
      },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          const el = document.querySelector("[data-tour='step-9']");
          if (el) el.click();
          resolve();
        });
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-10",
      text: `
        <p class="text-sm text-gray-700">
          To manage categories, first select a store from the "Select Store" dropdown at the top right corner. Then, you can upload a category icon and enter a name to add a new category. On the right side, under "All Categories", you can update the category name or image, or delete a category if needed.
        </p>`,
      attachTo: {
        element: "[data-tour='step-10']",
        on: "right-start",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: () => {
            navigate("/products/category");
            tour.next();
          },
        },
      ],
    });

    tour.addStep({
      id: "step-11",
      text: `
        <p class="text-sm text-gray-700">
          here select the store. that you want to add the new category
        </p>`,
      attachTo: {
        element: "[data-tour='step-11']",
        on: "left-start",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-12",
      text: `
        <p class="text-sm text-gray-700">
          here you can see your currently selected store name.
        </p>`,
      attachTo: {
        element: "[data-tour='step-12']",
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-13",
      text: `
        <p class="text-sm text-gray-700">
          in this field upload the category image & name. to add a new category. after adding the new category the tour will take you to next step.
        </p>`,
      attachTo: {
        element: "[data-tour='step-13']",
        on: "right",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-14",
      text: `
        <p class="text-sm text-gray-700">
          from this section you can see all the existing categories list for currently selected store.
        </p>`,
      attachTo: {
        element: "[data-tour='step-14']",
        on: "right",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });

    tour.addStep({
      id: "step-15",
      text: `
        <p class="text-sm text-gray-700">
          to simply update or delete a category just come here.
        </p>`,
      attachTo: {
        element:
          "#root > main > div > section > div.mt-6.grid.grid-cols-12.gap-y-12.lg\\:gap-x-12 > div > ul > li > div.flex.items-center.gap-4",
        on: "bottom",
      },
      buttons: [
        {
          text: "Back",
          action: tour.back,
        },
        {
          text: "Next",
          action: tour.next,
        },
      ],
    });
  };

  return { startTour, addSteps };
}

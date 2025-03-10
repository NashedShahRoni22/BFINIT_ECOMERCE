import { createContext } from "react";

export const CategoryContext = createContext(null);

export default function CategoryProvider({ children }) {
  const categoryLists = [
    {
      name: "Phone & Tablets",
      path: "/phone-and-tablets",
      children: [
        {
          name: "iPhone",
          path: "/",
        },
        {
          name: "Samsung",
          path: "/",
        },
        {
          name: "Google",
          path: "/",
        },
        {
          name: "Honor",
          path: "/",
        },
        {
          name: "Xiaomi",
          path: "/",
        },
        {
          name: "Realme",
          path: "/",
        },
      ],
    },
    {
      name: "Laptop & Desktop",
      path: "/laptop-and-desktop",
      children: [
        {
          name: "Dell",
          path: "/",
        },
        {
          name: "HP",
          path: "/",
        },
        {
          name: "Lenovo",
          path: "/",
        },
        {
          name: "Asus",
          path: "/",
        },
        {
          name: "MSI",
          path: "/",
        },
      ],
    },
    {
      name: "Sound Equipment",
      path: "/sound-equipment",
    },
    {
      name: "Power & Accessories",
      path: "/power-accessories",
    },
    {
      name: "Fitness & Wearable",
      path: "/",
    },
    {
      name: "Peripherals",
      path: "/",
    },
    {
      name: "Cover & Glass",
      path: "/",
    },
    {
      name: "Smart Electronics",
      path: "/",
    },
    {
      name: "Used Device",
      path: "/",
    },
  ];

  return (
    <CategoryContext.Provider value={categoryLists}>
      {children}
    </CategoryContext.Provider>
  );
}

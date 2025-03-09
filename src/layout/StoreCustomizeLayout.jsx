import { useState } from "react";
import BaseAdminLayout from "./BaseAdminLayout";
// import Navbar1 from "../components/store/Navbar1";
// import Navbar2 from "../components/store/Navbar2";
// import Header1 from "../components/store/Header1";
// import Header2 from "../components/store/Header2";

import { BsArrow90DegDown } from "react-icons/bs";
import {
  MdOutlineHome,
  MdStorefront,
  MdShoppingCart,
  MdCategory,
  MdPeople,
  MdLibraryBooks,
  MdPayment,
} from "react-icons/md";

const componentLinks = [
  {
    name: "Navbar",
    subCategories: [
      {
        name: "Category",
        url: "/products/category",
      },
      {
        name: "Sub Category",
        url: "/products/sub-category",
      },
      {
        name: "Brands",
        url: "/products/brands",
      },
      {
        name: "Add Product",
        url: "/products/add-product",
      },
      {
        name: "Manage Product",
        url: "/products/manage-product",
      },
    ],
  },
  {
    name: "Header",
    subCategories: [
      {
        name: "Category",
        url: "/products/category",
      },
      {
        name: "Sub Category",
        url: "/products/sub-category",
      },
    ],
  },
];

export default function StoreCustomizeLayout() {
  const [selectedComponents, setSelectedComponents] = useState({
    navbar: "navbar1",
    header: "header1",
  });

  const renderComponent = (type, value) => {
    const components = {
      navbar: {
        navbar1: "nav 1",
        navbar2: "nav 2",
      },
      header: {
        header1: "head 1",
        header2: "head 2",
      },
    };
    return components[type]?.[value] || null;
  };

  return (
    <BaseAdminLayout>
      {/* <nav
        className={`absolute h-[calc(100dvh-55px)] bg-neutral-100 transition-all duration-300 ease-in-out md:px-4 md:py-2 lg:static lg:w-1/6 lg:translate-x-0`}
      >
        <h3 className="text-lg font-bold">Customize Store</h3>

        <div className="mt-4">
          <h4 className="font-semibold">Navbar</h4>
          <label>
            <input
              type="radio"
              name="navbar"
              value="navbar1"
              checked={selectedComponents.navbar === "navbar1"}
              onChange={() =>
                setSelectedComponents((prev) => ({
                  ...prev,
                  navbar: "navbar1",
                }))
              }
            />
            Navbar 1
          </label>
          <label>
            <input
              type="radio"
              name="navbar"
              value="navbar2"
              checked={selectedComponents.navbar === "navbar2"}
              onChange={() =>
                setSelectedComponents((prev) => ({
                  ...prev,
                  navbar: "navbar2",
                }))
              }
            />
            Navbar 2
          </label>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold">Header</h4>
          <label>
            <input
              type="radio"
              name="header"
              value="header1"
              checked={selectedComponents.header === "header1"}
              onChange={() =>
                setSelectedComponents((prev) => ({
                  ...prev,
                  header: "header1",
                }))
              }
            />
            Header 1
          </label>
          <label>
            <input
              type="radio"
              name="header"
              value="header2"
              checked={selectedComponents.header === "header2"}
              onChange={() =>
                setSelectedComponents((prev) => ({
                  ...prev,
                  header: "header2",
                }))
              }
            />
            Header 2
          </label>
        </div>
      </nav> */}

      <ul
        className={`absolute h-[calc(100dvh-55px)] bg-neutral-100 transition-all duration-300 ease-in-out md:px-4 md:py-2 lg:static lg:w-1/6 lg:translate-x-0`}
      >
        {componentLinks.map((link, i) => (
          <li key={i}>{link.name}</li>
        ))}
      </ul>

      <div className="h-[calc(100dvh-55px)] w-full overflow-y-auto p-5">
        {/* Render selected components dynamically */}
        {renderComponent("navbar", selectedComponents.navbar)}
        {renderComponent("header", selectedComponents.header)}
      </div>
    </BaseAdminLayout>
  );
}

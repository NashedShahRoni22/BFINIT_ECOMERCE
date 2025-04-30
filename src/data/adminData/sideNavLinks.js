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

export const sideNavLinks = [
  {
    icon: MdOutlineHome,
    name: "Home",
    url: "/",
  },
  {
    icon: MdStorefront,
    name: "Stores",
    url: "/all-stores",
  },
  {
    icon: MdCategory,
    name: "Products",
    subCategories: [
      {
        name: "Category",
        url: "/products/category",
        icon: BsArrow90DegDown,
      },
      {
        name: "Sub Category",
        url: "/products/sub-category",
        icon: BsArrow90DegDown,
      },
      {
        name: "Brands",
        url: "/products/brands",
        icon: BsArrow90DegDown,
      },
      {
        name: "Add Product",
        url: "/products/add-product",
        icon: BsArrow90DegDown,
      },
      {
        name: "Manage Product",
        url: "/products/manage-product",
        icon: BsArrow90DegDown,
      },
    ],
  },
  {
    icon: MdShoppingCart,
    name: "Orders",
    url: "/orders",
  },
  // TODO: customers api not ready that's why hidden
  /* {
    icon: MdPeople,
    name: "Customers",
    url: "/customers",
  }, */
  {
    icon: MdLibraryBooks,
    name: "Blogs",
    subCategories: [
      {
        name: "Add Blog",
        url: "/blogs/add",
        icon: BsArrow90DegDown,
      },
      {
        name: "Manage Blog",
        url: "/blogs/manage",
        icon: BsArrow90DegDown,
      },
    ],
  },
  {
    icon: MdPayment,
    name: "Payments",
    url: "/payments",
  },
];

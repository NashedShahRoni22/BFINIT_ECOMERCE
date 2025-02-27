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
    icon: MdShoppingCart,
    name: "Orders",
    url: "/orders",
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
    ],
  },
  {
    icon: MdPeople,
    name: "Customers",
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
    ],
  },
  {
    icon: MdLibraryBooks,
    name: "Blogs",
    url: "/blogs",
  },
  {
    icon: MdPayment,
    name: "Payments",
    url: "/payments",
  },
];

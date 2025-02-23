import {
  MdOutlineHome,
  MdStorefront,
  MdHelpOutline,
  MdShoppingCart,
  MdCategory,
  MdPeople,
  MdLibraryBooks,
  MdPayment
} from "react-icons/md";

export const sideNavLinks = [
  {
    icon: MdOutlineHome,
    name: "Home",
    url: "/home",
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
    url: "/products",
  },
  {
    icon: MdPeople,
    name: "Customers",
    url: "/customers",
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

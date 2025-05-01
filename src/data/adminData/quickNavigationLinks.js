import {
  FaShoppingCart,
  FaProductHunt,
  FaUsers,
  FaBlog,
  FaCreditCard,
} from "react-icons/fa";

export const quickNavigationLinks = [
  { name: "Orders", icon: FaShoppingCart, url: "/orders" },
  { name: "Products", icon: FaProductHunt, url: "/products/manage-product" },
  // { name: "Customers", icon: FaUsers, url: "" },
  { name: "Blogs", icon: FaBlog, url: "/blogs/manage" },
  // { name: "Payments", icon: FaCreditCard, url: "" },
];

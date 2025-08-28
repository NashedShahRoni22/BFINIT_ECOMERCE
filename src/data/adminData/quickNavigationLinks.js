import { Newspaper, Package, ShoppingCart } from "lucide-react";
import { FaUsers, FaCreditCard } from "react-icons/fa";

export const quickNavigationLinks = [
  { name: "Orders", icon: ShoppingCart, url: "/orders" },
  { name: "Products", icon: Package, url: "/products/manage-product" },
  // { name: "Customers", icon: FaUsers, url: "" },
  { name: "Blogs", icon: Newspaper, url: "/blogs/manage" },
  // { name: "Payments", icon: FaCreditCard, url: "" },
];

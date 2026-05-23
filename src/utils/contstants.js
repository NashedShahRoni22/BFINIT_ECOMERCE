import { Store, Newspaper, Package, ShoppingCart, User } from "lucide-react";

export const adminDropdownLinks = [
  {
    icon: Store,
    name: "Stores",
    url: "/stores",
  },
  // {
  //   icon: MessageCircleQuestionMark,
  //   name: "Help Center",
  //   url: "/",
  // },
];

export const quickNavigationLinks = [
  { name: "Orders", icon: ShoppingCart, url: "/orders" },
  { name: "Products", icon: Package, url: "/products/inventory" },
  { name: "Customers", icon: User, url: "/customers" },
  { name: "Blogs", icon: Newspaper, url: "/blogs/manage" },
];

export const ecommerceTips = [
  {
    question: "How do I create my store on Bfinit?",
    answer:
      "To create your store, simply sign up, choose a template, and start customizing it with your store details like logo, name, and description. You can also choose from pre-selected templates that suit your business.",
  },
  {
    question: "How can I upload my products?",
    answer:
      "Once your store is set up, go to the 'Products' section in your dashboard, click 'Add Product', and fill in the product details like name, description, price, images, and categories. You can upload multiple products in bulk if needed.",
  },
  {
    question: "Can I manage my orders easily?",
    answer:
      "Yes! In the 'Orders' section, you'll see all the customer orders with real-time updates. You can view, process, or mark orders as shipped directly from your dashboard, making order management quick and simple.",
  },
  {
    question: "What about handling payments?",
    answer:
      "Bfinit integrates with various payment gateways like PayPal, Stripe, and others. To manage payments, link your payment provider in the settings. You can easily track payments and manage your transactions from the 'Payments' section.",
  },
  {
    question: "How do I manage my customers?",
    answer:
      "In the 'Customers' section, you'll have access to a list of all customers who have purchased from your store. You can view customer profiles, their order history, and communicate with them directly if needed.",
  },
  {
    question: "Can I create blogs for my store?",
    answer:
      "Yes! In the 'Blogs' section, you can write and publish blog posts to promote your products, share news, or provide useful tips. These blogs can help engage your audience and improve SEO for your store.",
  },
  {
    question: "How do I customize the template of my store?",
    answer:
      "To customize the template, go to the 'Theme' or 'Design' section. From there, you can change colors, fonts, layouts, and more, all without needing coding knowledge. Simply choose the options that best reflect your brand.",
  },
  {
    question: "Is Bfinit easy to use for beginners?",
    answer:
      "Yes! Bfinit is designed with user-friendliness in mind. You don't need technical skills to get started. The drag-and-drop interface, intuitive dashboard, and step-by-step guides make it easy for anyone to set up and manage their store.",
  },
];

export const productTypes = [
  { value: "fashion", label: "Fashion" },
  { value: "electronics", label: "Electronics" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "home-living", label: "Home & Living" },
  { value: "food-beverage", label: "Food & Beverage" },
  { value: "health-wellness", label: "Health & Wellness" },
  { value: "sports", label: "Sports & Outdoor" },
  { value: "automotive", label: "Automotive" },
  { value: "handmade", label: "Handmade & Crafts" },
  { value: "toys", label: "Toys & Games" },
  { value: "digital-products", label: "Digital Products" },
  { value: "services", label: "Professional Services" },
];

export const themes = [
  {
    id: 1,
    name: "Midnight Blaze",
    primary: "#000000",
    accent: "#ff6900",
    text: "#fff",
  },
  {
    id: 2,
    name: "Sky Burst",
    primary: "#1e96fc",
    accent: "#FF8C42",
    text: "#fff",
  },
  {
    id: 3,
    name: "Forest Lime",
    primary: "#2f855a",
    accent: "#84cc16",
    text: "#fff",
  },
  {
    id: 4,
    name: "Lilac Cream",
    primary: "#faf3e0",
    accent: "#c084fc",
    text: "#000",
  },
];

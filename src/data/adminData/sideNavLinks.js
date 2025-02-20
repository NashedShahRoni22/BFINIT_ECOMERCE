import {
  MdOutlineHome,
  MdStorefront,
  MdHelpOutline,
  MdHandshake,
  MdManageAccounts,
  MdLogout,
} from "react-icons/md";

export const sideNavLinks = [
  {
    icon: MdOutlineHome,
    name: "Home",
    url: "/home",
  },
  {
    icon: MdStorefront,
    name: "All Stores",
    url: "/all-stores",
  },
  {
    icon: MdHelpOutline,
    name: "Help Center",
    url: "/help-center",
  },
  {
    icon: MdHandshake,
    name: "Hire a BFINIT Partner",
    url: "/hire-partner",
  },
  {
    icon: MdManageAccounts,
    name: "Manage Accounts",
    url: "/manage-accounts",
  },
  {
    icon: MdLogout,
    name: "Log Out",
    url: "/logout",
  },
];

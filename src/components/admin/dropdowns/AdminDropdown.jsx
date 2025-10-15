import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LogOut, UserCircle, FileDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useAuth from "../../../hooks/auth/useAuth";
import { adminDropdownLinks } from "../../../data/adminData/adminDropdownLinks";

export default function AdminDropdown() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // fetch client info
  const { data: clientInfo } = useGetQuery({
    endpoint: `/clients/${user?.data?.clientid}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["clientInfo", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });

  const handleLogOut = () => {
    localStorage.removeItem("authInfo");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 transition-all duration-200 ease-linear outline-none hover:border-neutral-100 hover:bg-neutral-50 focus:border-neutral-100 focus:bg-neutral-50">
          <div className="bg-dashboard-primary flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-semibold text-white sm:h-5 sm:w-5 sm:text-[10px]">
            {clientInfo?.data?.clientFname?.[0]}
            {clientInfo?.data?.clientLname?.[0]}
          </div>
          <span className="hidden text-xs font-medium sm:block">
            {clientInfo?.data?.clientFname} {clientInfo?.data?.clientLname}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        {/* User Info */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-semibold">
              {clientInfo?.data?.clientFname} {clientInfo?.data?.clientLname}
            </p>
            <p className="text-xs leading-none text-neutral-500">
              {clientInfo?.data?.clientEmail}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* My Profile */}
        <DropdownMenuItem asChild>
          <Link
            to="/accounts"
            className="flex cursor-pointer items-center gap-2"
          >
            <UserCircle className="h-4 w-4" />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Nav Links */}
        {adminDropdownLinks.map((link, i) => (
          <DropdownMenuItem key={i} asChild>
            <Link
              to={link.url}
              className="flex cursor-pointer items-center gap-2"
            >
              <link.icon className="h-4 w-4" />
              <span className="capitalize">{link.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        {/* Help Guide Download */}
        <DropdownMenuItem asChild>
          <a
            href="https://ecomback.bfinit.com/uploads/ecom/guide/BFINIT%20E-Commerce%20Guide.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            <span>Get Help Guide</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogOut}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  LogOut,
  UserCircle,
  FileDown,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks/api/useGetQuery";
import { adminDropdownLinks } from "@/utils/contstants";

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleSetStore } = useSelectedStore();

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
    localStorage.removeItem("store");
    handleSetStore(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <div className="bg-dashboard-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold text-white sm:h-5 sm:w-5 sm:text-[10px]">
            {clientInfo?.data?.clientFname?.[0]}
            {clientInfo?.data?.clientLname?.[0]}
          </div>
          <span className="hidden max-w-[120px] items-center truncate text-xs font-medium sm:inline-block">
            {clientInfo?.data?.clientFname} {clientInfo?.data?.clientLname}{" "}
          </span>
          <ChevronDown size={14} className="text-muted-foreground shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        {/* User Info Section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="max-w-[200px] truncate text-sm font-semibold">
              {clientInfo?.data?.clientFname} {clientInfo?.data?.clientLname}
            </p>
            <p
              className="text-muted-foreground max-w-[200px] truncate text-xs"
              title={clientInfo?.data?.clientEmail}
            >
              {clientInfo?.data?.clientEmail}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Account Management */}
        {/* <DropdownMenuItem asChild>
          <Link
            to="/accounts"
            className="flex cursor-pointer items-center gap-2"
          >
            <UserCircle className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        {/* Dynamic Navigation Links */}
        {adminDropdownLinks.map((link) => (
          <DropdownMenuItem key={link.url} asChild>
            <Link
              to={link.url}
              className="flex cursor-pointer items-center gap-2"
            >
              <link.icon className="h-4 w-4" />
              <span className="capitalize">{link.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        {/* Help & Support */}
        <DropdownMenuItem asChild>
          <a
            href="https://ecomback.bfinit.com/uploads/ecom/guide/BFINIT%20E-Commerce%20Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center gap-2"
          >
            <FileDown className="h-4 w-4" />
            <span>Help Guide</span>
            <ExternalLink className="ml-auto h-3 w-3 opacity-50" />
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Destructive Action */}
        <DropdownMenuItem
          onClick={handleLogOut}
          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

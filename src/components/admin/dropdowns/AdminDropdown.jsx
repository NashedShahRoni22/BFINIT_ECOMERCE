import { Link, useNavigate } from "react-router";
import { PopoverPanel } from "@headlessui/react";
import { MdOutlineManageAccounts, MdOutlineLogout } from "react-icons/md";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useAuth from "../../../hooks/auth/useAuth";
import { adminDropdownLinks } from "../../../data/adminData/adminDropdownLinks";

export default function AdminDropdown({ close }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // fetch client info
  const { data: clientInfo } = useGetQuery({
    endpoint: `/clients/${user?.data?.clientid}`,
    token: user?.token,
    queryKey: ["clientInfo", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });

  const handleLogOut = () => {
    localStorage.removeItem("authInfo");
    close();
    navigate("/login");
  };

  return (
    <PopoverPanel
      transition
      anchor="bottom"
      className="!top-[60px] !right-5 !left-auto flex flex-col gap-2 rounded-lg border border-neutral-100 bg-white px-0.5 text-sm text-black shadow-lg transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
    >
      {/* name, email & account manage */}
      <div className="space-y-1.5 border-b border-neutral-100 pt-3 pb-1.5">
        <div className="px-3">
          <p className="font-semibold">
            {clientInfo?.data?.clientFname} {clientInfo?.data?.clientLname}
          </p>
          <p className="text-neutral-500">{clientInfo?.data?.clientEmail}</p>
        </div>

        <Link
          className="group flex items-center gap-1 rounded-md p-1 px-3 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-neutral-100"
          to="/accounts"
          onClick={close}
        >
          <MdOutlineManageAccounts className="group-hover:text-dashboard-primary text-xl" />
          <span>My Profile</span>
        </Link>
      </div>

      {/* nav links */}
      {adminDropdownLinks.map((link, i) => (
        <Link
          key={i}
          className="group flex items-center gap-1 rounded-md p-1 px-3 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-neutral-100"
          to={link.url}
          onClick={close}
        >
          <link.icon className="group-hover:text-dashboard-primary text-xl" />
          {link.name}
        </Link>
      ))}

      {/* logout */}
      <div className="border-t border-neutral-100 py-2">
        <button
          className="group flex w-full cursor-pointer items-center gap-1 rounded-md p-1 px-3 text-sm capitalize transition-all duration-200 ease-in-out hover:bg-neutral-100"
          onClick={handleLogOut}
        >
          <MdOutlineLogout className="group-hover:text-dashboard-primary text-xl" />{" "}
          Log Out
        </button>
      </div>
    </PopoverPanel>
  );
}

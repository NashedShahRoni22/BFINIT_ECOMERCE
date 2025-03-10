import { Link } from "react-router";
import { BiEdit } from "react-icons/bi";
import logo from "../../../assets/store_logo.png";

export default function StoreCard() {
  return (
    <div className="w-[250px] rounded p-2 shadow">
      <img className="h-[200px] w-full rounded" src={logo} alt="" />
      <div className="mt-2.5 flex min-w-full items-center justify-between">
        <h5 className="text-sm">First Store</h5>
        <Link
          to="/customize-store"
          className="bg-dashboard-primary rounded-full p-2.5 duration-300 ease-linear hover:bg-blue-500"
        >
          <BiEdit className="text-xl text-white" />
        </Link>
      </div>
    </div>
  );
}

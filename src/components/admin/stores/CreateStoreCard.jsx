import { Link } from "react-router";
import { BsPlus } from "react-icons/bs";

export default function CreateStoreCard() {
  return (
    <Link to="/create-store" className="w-[250px] rounded p-2 shadow">
      <div className="flex h-[200px] items-center justify-center">
        <BsPlus className="text-9xl text-gray-400" />
      </div>
      <h5 className="mt-2.5 text-center text-sm">Create Store</h5>
    </Link>
  );
}

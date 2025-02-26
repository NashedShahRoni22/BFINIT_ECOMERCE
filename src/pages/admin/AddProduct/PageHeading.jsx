import { Link } from "react-router";
import { BsArrowLeft } from "react-icons/bs";

export default function PageHeading() {
  return (
    <div className="flex h-full w-full items-center gap-3 p-5">
      <Link
        to="/"
        className="hover:text-primary grid size-10 place-items-center rounded border border-neutral-200 transition-all hover:bg-neutral-100"
      >
        <BsArrowLeft className="text-xl" />
      </Link>
      <div>
        <p className="text-xs text-gray-400">Back to Home</p>
        <h3 className="font-poppins text-xl font-semibold">Add New Product</h3>
      </div>
    </div>
  );
}

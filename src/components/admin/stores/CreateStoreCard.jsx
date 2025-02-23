import React from "react";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router";

export default function CreateStoreCard() {
  return (
    <Link className="w-[250px] rounded p-2 shadow">
      <div className="flex h-[200px] items-center justify-center">
        <BsPlus className="text-9xl text-gray-400" />
      </div>
      <h5 className="text-center mt-2.5 text-sm">Create Store</h5>
    </Link>
  );
}

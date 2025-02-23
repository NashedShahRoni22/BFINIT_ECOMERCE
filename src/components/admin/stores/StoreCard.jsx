import React from "react";
import logo from "../../../assets/store_logo.png";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router";

export default function StoreCard() {
  return (
    <div className="w-[250px] rounded p-2 shadow">
      <img className="rounded h-[200px] w-full" src={logo} alt="" />
      <div className="mt-2.5 flex justify-between items-center min-w-full">
        <h5 className="text-sm">First Store</h5>
        <Link className="p-2.5 bg-primary hover:bg-blue-500 rounded-full duration-300 ease-linear">
          <BiEdit className="text-xl text-white" />
        </Link>
      </div>
    </div>
  );
}

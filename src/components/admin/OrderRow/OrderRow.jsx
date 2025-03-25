import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

export default function OrderRow() {
  return (
    <tr className="border-y border-neutral-200">
      <td className="text-sm">#123456</td>
      <td className="text-sm">
        <div className="flex items-center gap-2.5 py-1.5">
          <img
            src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            loading="lazy"
            className="size-11 rounded-full object-cover"
          />
          <p>Mouse Pad</p>
        </div>
      </td>
      <td className="text-sm">5</td>
      <td className="text-sm">$ 20</td>
      <td>Processing</td>
      <td className="py-1.5 text-sm">
        <span className="flex items-center gap-1.5">
          <BiUserCircle className="text-xl text-orange-500" />
          User Name
        </span>
        <span className="my-1.5 flex items-center gap-1.5">
          <BsTelephoneFill className="text-xl text-green-500" />
          0123456789
        </span>
        <span className="flex items-center gap-1.5">
          <MdEmail className="mt-1.5 text-xl text-blue-500" />
          user@gmail.com
        </span>
      </td>
      <td className="flex gap-1.5 py-1.5 text-sm">
        <FaLocationDot className="text-xl text-red-500" />
        <div>
          <span>6A, BFIN IT, 2/23, Rajia Sultana Road.</span>
          <br />
          <span className="font-semibold">Zone:</span> Mohammadpur
          <br />
          <span className="font-semibold">City:</span> Dhaka
        </div>
      </td>
      <td className="py-1.5 text-sm">
        <span>Paid</span>
        <br />
        <span>Paypal</span>
        <br />
        <span>ID: 123456789</span>
      </td>
      <td className="text-sm">
        <div className="space-x-2">
          <button className="cursor-pointer rounded-full bg-blue-100 p-2 duration-300 ease-linear hover:bg-blue-200">
            <MdOutlineEdit className="text-dashboard-primary text-xl" />
          </button>
          <button className="cursor-pointer rounded-full bg-red-100 p-2 duration-300 ease-linear hover:bg-red-200">
            <MdOutlineDelete className="text-xl text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}

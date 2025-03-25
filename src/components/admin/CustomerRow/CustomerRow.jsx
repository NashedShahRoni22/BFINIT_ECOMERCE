import React from "react";
import { MdEmail, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";

export default function CustomerRow() {
  return (
    <tr className="border-y border-neutral-200 text-left">
      <td className="text-sm">
        <div className="flex items-center gap-2.5 py-1.5">
          <img
            src="https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-701751694975293fcgzulxp2k.png?v=2025030913"
            alt=""
            loading="lazy"
            className="size-8 rounded-full object-cover"
          />
          <p>User Name</p>
        </div>
      </td>
      <td className="py-1.5 text-sm">
        <span className="flex items-center gap-1.5">
          <BsTelephoneFill className="text-xl text-green-500" />
          0123456789
        </span>
        <span className="flex items-center gap-1.5">
          <MdEmail className="mt-1.5 text-xl text-blue-500" />
          user@gmail.com
        </span>
      </td>
      <td className="text-sm flex gap-1.5 py-1.5">
        <FaLocationDot className="text-xl text-red-500" />
        <div>
          <span>6A, BFIN IT, 2/23, Rajia Sultana Road.</span>
          <br />
          <span className="font-semibold">Zone:</span> Mohammadpur
          <br />
          <span className="font-semibold">City:</span> Dhaka
        </div>
      </td>
      <td className="text-sm">
        <span className="flex items-center gap-1.5">
          <FiPackage className="text-xl text-orange-500" />
          10
        </span>
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

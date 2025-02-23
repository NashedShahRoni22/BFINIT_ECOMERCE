import React from "react";
import { quickNavigationLinks } from "../../../data/adminData/quickNavigationLinks";
import { Link } from "react-router";

export default function QuickNavs() {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-4">
      {quickNavigationLinks.map((quickNav, index) => (
        <Link key={index} className="size-[120px] flex flex-col gap-2.5 justify-center items-center p-2 shadow rounded">
          <quickNav.icon className="text-4xl text-primary" />
          <p className="text-sm">{quickNav.name}</p>
        </Link>
      ))}
    </div>
  );
}

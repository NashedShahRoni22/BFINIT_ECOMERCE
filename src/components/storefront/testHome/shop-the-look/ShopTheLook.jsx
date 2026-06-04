import { Plus } from "lucide-react";
import React from "react";

export default function ShopTheLook() {
  return (
    <div className="flex flex-col gap-6 py-20 md:flex-row">
      <div className="font-inter w-full text-center">
        <h2 className="mb-6 text-3xl font-medium">Shop The Look</h2>
        <div>
          <div className="group relative mx-auto w-1/2">
            <img
              src="https://release-main.myshopify.com/cdn/shop/files/BouckleTexturedCoat432-min.jpg?v=1709476517"
              alt=""
              className="mx-auto"
            />
            <div className="absolute right-5 bottom-30 hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black text-white transition duration-500 group-hover:flex md:right-7 md:bottom-25">
              <Plus size={24} />
            </div>
            <h2 className="font-inter text-[18px] font-medium">
              Knit Comfort Turn-Up Sleeve Coat
            </h2>
            <p>€ 78.79</p>
            <p>Available in 3 size</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <img
          src="https://stylestore.com/wp-content/uploads/2025/06/Wbllennon_Ls_Shirt_Blush_Rose2.jpg"
          alt="shop the look image"
          className="h-[550px] w-full object-cover"
        />
      </div>
    </div>
  );
}

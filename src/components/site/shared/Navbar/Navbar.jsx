import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  HiBars3,
  HiMiniXMark,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { BsCart3, BsHeart, BsPersonCircle } from "react-icons/bs";
import MobileNav from "./MobileNav";
import useCart from "../../../../hooks/cart/useCart";
import useGetStorePreference from "../../../../hooks/stores/useGetStorePreference";

export default function Navbar() {
  const { storeId } = useParams();
  const { cartItems } = useCart();
  const [showMenu, setShowMenu] = useState(false);

  // store preference
  const { data: storePreference } = useGetStorePreference(storeId);

  // handle mobile hamburger menu
  const handleShowMenu = () => {
    setShowMenu(showMenu ? false : true);
  };

  const mariasStore = storeId === "6893084dcf19613323046c70";

  return (
    <nav className="w-full">
      <div className="bg-primary text-on-primary py-4">
        <div className="mx-5 flex items-center justify-between gap-8 md:container md:mx-auto md:justify-normal">
          {/* Mobile Menu Toggler */}
          <div className="md:hidden">
            <button onClick={handleShowMenu} className="text-2xl">
              {showMenu ? <HiMiniXMark /> : <HiBars3 />}
            </button>
          </div>

          {/* logo */}
          <Link
            to={`/preview/${storeId}`}
            className="font-merriweather text-accent text-2xl font-semibold italic"
          >
            <div className="max-w-[200px]">
              {mariasStore ? (
                <img
                  src={`https://ecomback.bfinit.com${storePreference?.storeLogo}`}
                  alt="brand logo"
                  loading="lazy"
                  className="h-10 w-auto rounded-full object-cover md:h-12"
                />
              ) : (
                <img
                  src={`https://ecomback.bfinit.com${storePreference?.storeLogo}`}
                  alt="brand logo"
                  loading="lazy"
                  className="h-10 w-auto object-contain md:h-12"
                />
              )}
            </div>
          </Link>

          {/* Mobile Search Button */}
          <button className="md:hidden">
            <HiOutlineMagnifyingGlass className="text-accent text-2xl" />
          </button>

          {/* Large Device search field */}
          <div className="relative mx-auto hidden max-w-xl flex-1 md:block">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="w-full rounded-full border-none bg-white px-4 py-2.5 text-black outline-none"
            />
            <HiOutlineMagnifyingGlass className="text-accent absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-2xl" />
          </div>

          {/* Large Device Offers */}
          <div className="hidden items-center gap-6 md:flex">
            {/* cart items */}
            <Link to={`/preview/${storeId}/cart`} className="relative">
              <BsCart3 className="text-2xl" />
              <div className="bg-accent absolute -top-3 -right-3.5 grid size-5 place-items-center rounded-full text-center text-sm text-white tabular-nums">
                {cartItems?.length < 100 ? cartItems?.length : "99+"}
              </div>
            </Link>
            {/* favourite items */}
            {/* <Link to="/wishlist" className="relative">
              <BsHeart className="text-2xl" />
              <div className="bg-accent absolute -top-3 -right-3.5 grid size-5 place-items-center rounded-full text-center text-sm text-white">
                0
              </div>
            </Link> */}
            {/* login */}
            {/* <Link to="/login">
              <BsPersonCircle className="hover:text-accent text-2xl transition-all duration-200 ease-in-out" />
            </Link> */}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <MobileNav storeId={storeId} handleShowMenu={handleShowMenu} />
      )}
    </nav>
  );
}

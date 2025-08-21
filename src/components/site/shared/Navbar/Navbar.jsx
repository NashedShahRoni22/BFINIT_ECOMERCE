import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  HiBars3,
  HiMiniXMark,
  HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { BsCart3, BsHeart, BsPersonCircle } from "react-icons/bs";
import { LuSearch, LuUserRound } from "react-icons/lu";
import MobileNav from "./MobileNav";
import useCart from "../../../../hooks/cart/useCart";
import useGetStorePreference from "../../../../hooks/stores/useGetStorePreference";

export default function Navbar() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");

  // store preference
  const { data: storePreference } = useGetStorePreference(storeId);

  // handle mobile hamburger menu
  const handleShowMenu = () => {
    setShowMenu(showMenu ? false : true);
  };

  // handle product search
  const handleProductSearch = (e) => {
    e.preventDefault();
    const searchKeyword = keyword.trim().replace(/\s+/g, " ").toLowerCase();
    if (searchKeyword) {
      navigate(`products/search/${searchKeyword}`);
      setKeyword("");
    }
  };

  const mariasStore = storeId === "6893084dcf19613323046c70";

  return (
    <nav className="w-full">
      <div className="bg-primary text-on-primary py-4">
        <div className="flex items-center justify-between gap-8 px-5 md:container md:mx-auto">
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

          <div className="flex flex-1 items-end gap-2">
            <Link to="blogs" className="text-xs">
              Blogs
            </Link>

            <Link to="contact" className="text-xs">
              Contact Us
            </Link>
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden">
            <HiOutlineMagnifyingGlass className="text-accent text-2xl" />
          </button>

          {/* Large Device search field */}
          {/* <form
            onSubmit={handleProductSearch}
            className="relative mx-auto hidden max-w-xl flex-1 md:block"
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="w-full rounded-full border-none bg-white px-4 py-2.5 text-black outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button type="submit">
              <HiOutlineMagnifyingGlass className="text-accent absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-2xl" />
            </button>
          </form> */}

          {/* Large Device Offers */}
          <div className="hidden items-end gap-6 md:flex">
            <Link>
              <LuSearch to="login" className="text-2xl" />
            </Link>

            {/* cart items */}
            <Link to={`/preview/${storeId}/cart`} className="relative">
              <BsCart3 className="text-2xl" />
              <div className="bg-accent absolute -top-3 -right-3.5 grid size-5 place-items-center rounded-full text-center text-sm text-white tabular-nums">
                {cartItems?.length < 100 ? cartItems?.length : "99+"}
              </div>
            </Link>

            <Link>
              <LuUserRound to="login" className="text-2xl" />
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

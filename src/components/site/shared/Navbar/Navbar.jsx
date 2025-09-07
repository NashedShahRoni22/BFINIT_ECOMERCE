import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { BsCart3, BsHeart, BsPersonCircle } from "react-icons/bs";
import { LuMenu, LuSearch, LuUserRound, LuX } from "react-icons/lu";
import MobileNav from "./MobileNav";
import useCart from "../../../../hooks/cart/useCart";
import useGetStorePreference from "../../../../hooks/stores/useGetStorePreference";
import useDebounce from "../../../../hooks/debounce/useDebounce";
import useGetQuery from "../../../../hooks/queries/useGetQuery";
import useCustomer from "../../../../hooks/auth/useCustomer";

export default function Navbar() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const { cartItems } = useCart();

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const searchKeyword = keyword.trim().replace(/\s+/g, " ").toLowerCase();
  const isMariaStore = storeId === "6893084dcf19613323046c70";

  // store preference
  const { data: storePreference } = useGetStorePreference(storeId);
  const debouncedValue = useDebounce(searchKeyword, 1000);

  const { data: searchedProducts } = useGetQuery({
    endpoint: `/product/by-keyword/?storeId=${storeId}&keyword=${debouncedValue}`,
    queryKey: ["search", storeId, debouncedValue],
    enabled: !!storeId && !!debouncedValue,
  });

  // handle mobile hamburger menu
  const handleShowMenu = () => {
    setShowMenu(showMenu ? false : true);
  };

  // handle see more products
  const handleMoreProducts = () => {
    navigate(`products/search/${searchKeyword}`);
    setShowSearch(false);
    setKeyword("");
  };

  // handle product search
  const handleProductSearch = (e) => {
    e.preventDefault();
    if (searchKeyword) {
      navigate(`products/search/${searchKeyword}`);
      setKeyword("");
      setShowSearch(false);
    } else {
      setShowSearch(false);
    }
  };

  return (
    <nav className="w-full">
      <div className="bg-primary text-on-primary py-4">
        <div className="relative flex items-center justify-between gap-8 px-5 md:container md:mx-auto">
          {/* logo */}
          <Link
            to={`/preview/${storeId}`}
            onClick={() => {
              setKeyword("");
              setShowSearch(false);
            }}
            className="font-merriweather text-accent shrink-0 text-2xl font-semibold italic"
          >
            <div className="max-w-[200px]">
              <img
                src={`https://ecomback.bfinit.com${storePreference?.storeLogo}`}
                alt="brand logo"
                loading="lazy"
                className={`h-10 w-auto md:h-12 ${isMariaStore && "rounded-full"}`}
              />
            </div>
          </Link>

          <div className="hidden flex-1 items-end gap-2 md:flex">
            <Link to="blogs" className="text-xs">
              Blogs
            </Link>

            <Link to="contact" className="text-xs">
              Contact Us
            </Link>
          </div>

          {/* Large Device Offers */}
          <div className="flex items-center gap-6">
            {showSearch ? (
              <div className="md:relative">
                <form
                  onSubmit={handleProductSearch}
                  className="relative mx-auto max-w-xs flex-1"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-full border-none bg-white px-4 py-1.5 text-black outline-none md:py-2.5"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    autoFocus
                  />
                  <button type="submit">
                    <HiOutlineMagnifyingGlass className="text-accent absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-lg md:text-2xl" />
                  </button>
                </form>

                {/* searched list */}
                {debouncedValue && showSearch && (
                  <div className="overflow-hidden px-4">
                    <div className="absolute top-16 left-0 z-[100] mt-2 w-full overflow-hidden rounded-md bg-white shadow-lg md:top-full">
                      {searchedProducts?.data?.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                          {searchedProducts.data.slice(0, 5).map((product) => (
                            <li
                              key={product.productId}
                              className="flex cursor-pointer items-center gap-3 p-3 hover:bg-gray-100"
                              onClick={() => {
                                navigate(
                                  `/preview/${storeId}/products/${product.productId}`,
                                );
                                setShowSearch(false);
                                setKeyword("");
                              }}
                            >
                              {/* Product Image */}
                              <img
                                src={`https://ecomback.bfinit.com${product.productImage}`}
                                alt={product.productName}
                                className="h-12 w-12 rounded-md object-cover"
                              />

                              {/* Product Info */}
                              <div className="flex-1">
                                <p className="line-clamp-2 text-sm font-medium text-gray-900">
                                  {product.productName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {product.productBrand} •{" "}
                                  {product.productCategory}
                                </p>
                              </div>

                              {/* Price */}
                              <div className="text-accent text-sm font-semibold">
                                {product.productDiscountPrice?.$numberDecimal
                                  ? `$${product.productDiscountPrice.$numberDecimal}`
                                  : `$${product.productPrice.$numberDecimal}`}
                              </div>
                            </li>
                          ))}

                          {/* See More Button */}
                          {searchedProducts.data.length > 5 && (
                            <li className="p-3 text-center">
                              <button
                                onClick={handleMoreProducts}
                                className="text-accent text-sm font-medium hover:underline"
                              >
                                See More Products
                              </button>
                            </li>
                          )}
                        </ul>
                      ) : (
                        <div className="p-3 text-center text-sm text-gray-500">
                          No products found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowSearch(!showSearch)}>
                <LuSearch className="text-lg md:text-2xl" />
              </button>
            )}

            {/* cart items */}
            <Link
              to={`/preview/${storeId}/cart`}
              className={`relative ${showSearch && "hidden md:block"}`}
            >
              <BsCart3 className="text-lg md:text-2xl" />
              <div className="bg-accent absolute -top-3 -right-3.5 grid size-5 place-items-center rounded-full text-center text-sm text-white tabular-nums">
                {cartItems?.length < 100 ? cartItems?.length : "99+"}
              </div>
            </Link>

            <Link
              to={`/preview/${storeId}/${customer?.token ? "account" : "login"}`}
              className={`${showSearch && "hidden md:block"}`}
            >
              <LuUserRound to="login" className="text-lg md:text-2xl" />
            </Link>

            {/* Mobile Menu Toggler */}
            <button
              onClick={handleShowMenu}
              className="text-lg md:hidden md:text-2xl"
            >
              {showMenu ? <LuX /> : <LuMenu />}
            </button>

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

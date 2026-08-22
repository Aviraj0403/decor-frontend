import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getMenuCategories } from "../../services/categoryApi";
import { useAuth } from "../../context/AuthContext";
import logo from "../../image/divya-mantra-logo-transparent.png";

const shopLinks = [
  { label: "All Products", to: "/new-products" },
  { label: "Divine Arrivals", to: "/new-products" },
  { label: "Popular Products", to: "/new-products" },
  { label: "Combo Products", to: "/#combo-products" },
];

export default function DesktopHeader() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user } = useAuth();
  const { items: cartItems } = useSelector((state) => state.cart);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const { data: menuItems, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getMenuCategories,
  });

  const handleProfileClick = () => {
    if (user) navigate("/profile");
    else navigate("/signin?redirect=/profile");
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBar(window.scrollY <= lastScrollY || window.scrollY < 20);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="relative z-[999] w-full">
      <div
        className={`fixed left-0 top-0 z-[999] flex h-[34px] w-full items-center bg-accent px-8 text-[12px] font-medium text-[#fff9f0] shadow-sm transition-transform duration-300 ${showTopBar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-center gap-20">
          <p className="flex items-center gap-2 whitespace-nowrap">
            <Sparkles size={13} className="text-secondary-300" />
            Welcome to Divya Mantra — Where Spirituality Meets Purity
          </p>
          <p className="flex items-center gap-2 whitespace-nowrap">
            <Truck size={14} className="text-secondary-200" />
            Free Shipping on Orders Above ₹999
          </p>
        </div>
      </div>

      <nav
        className="fixed left-0 z-[998] h-[88px] w-full border-b border-secondary-200/70 bg-brand-bg/95 shadow-[0_5px_22px_rgba(139,30,30,0.08)] backdrop-blur-lg transition-all duration-300"
        style={{ top: showTopBar ? "34px" : "0px" }}
      >
        <div className="mx-auto grid h-full max-w-[1280px] grid-cols-[235px_1fr_150px] items-center gap-6 px-7 xl:px-4">
          <Link
            to="/"
            className="flex h-[62px] w-[225px] items-center justify-center overflow-hidden"
            aria-label="Divya Mantra home"
          >
            <img
              src={logo}
              alt="Divya Mantra"
              className="w-[215px] max-w-none object-contain"
            />
          </Link>

          <ul className="flex items-center justify-center gap-7 whitespace-nowrap text-[15px] font-semibold text-[#3E2723] xl:gap-8">
            <li>
              <Link to="/" className="text-primary-600 transition hover:text-primary-600">
                Home
              </Link>
            </li>

            <li
              className="relative"
              onMouseEnter={() => setActiveMenu("shop")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link to="/new-products" className="flex items-center gap-1 py-8 transition hover:text-primary-600">
                Shop <ChevronDown size={13} />
              </Link>
              {activeMenu === "shop" && (
                <div className="absolute left-1/2 top-[70px] w-48 -translate-x-1/2 rounded-lg border border-secondary-200 bg-brand-bg py-2 shadow-xl">
                  {shopLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="block px-4 py-2.5 text-[12px] text-[#4b463c] transition hover:bg-secondary-50 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li
              className="relative"
              onMouseEnter={() => setActiveMenu("categories")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button type="button" className="flex items-center gap-1 py-8 transition hover:text-primary-600">
                Categories <ChevronDown size={13} />
              </button>
              {activeMenu === "categories" && (
                <div className="absolute left-1/2 top-[70px] max-h-[360px] w-60 -translate-x-1/2 overflow-y-auto rounded-lg border border-secondary-200 bg-brand-bg py-2 shadow-xl">
                  {isLoading && <p className="px-4 py-3 text-xs text-[#777064]">Loading categories...</p>}
                  {isError && <p className="px-4 py-3 text-xs text-red-600">Unable to load categories</p>}
                  {!isLoading &&
                    !isError &&
                    menuItems?.map((item) => (
                      <div key={item._id} className="group/category relative">
                        <Link
                          to={`/${item.slug}`}
                          className="flex items-center justify-between px-4 py-2.5 text-[12px] text-[#4b463c] transition hover:bg-secondary-50 hover:text-accent"
                        >
                          {item.name}
                          {item.subcategories?.length > 0 && <ChevronDown size={12} className="-rotate-90" />}
                        </Link>
                        {item.subcategories?.length > 0 && (
                          <div className="hidden border-y border-secondary-200 bg-secondary-50 py-1 group-hover/category:block">
                            {item.subcategories.map((sub) => (
                              <Link
                                key={sub._id || sub.slug}
                                to={`/${item.slug}/${sub.slug}`}
                                className="block px-7 py-2 text-[11px] text-[#696154] hover:text-accent"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </li>

            <li><Link to="/#combo-products" className="transition hover:text-primary-600">Combo Offers</Link></li>
            <li><Link to="/#best-sellers" className="transition hover:text-primary-600">Best Sellers</Link></li>
            <li><Link to="/new-products" className="transition hover:text-primary-600">Products</Link></li>
            <li><Link to="/about-us" className="transition hover:text-primary-600">About</Link></li>
            <li><Link to="/contact-us" className="transition hover:text-primary-600">Contact</Link></li>
          </ul>

          <div className="flex items-center justify-end gap-5 text-[#3E2723]">
            <button
              type="button"
              onClick={() => navigate("/search")}
              className="transition hover:text-primary-600"
              aria-label="Search"
            >
              <Search size={22} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={handleProfileClick}
              className="transition hover:text-primary-600"
              aria-label={user ? "Open profile" : "Sign in"}
            >
              <UserRound size={22} strokeWidth={1.8} />
            </button>

            <Link to="/cart" className="relative transition hover:text-primary-600" aria-label="Cart">
              <ShoppingBag size={23} strokeWidth={1.8} />
              {totalQuantity > 0 && (
                <span className="absolute -right-3 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <div className="h-[122px]" />
    </header>
  );
}

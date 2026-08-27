import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  CircleUserRound,
  Grid2X2,
  Home,
  LogOut,
  Menu,
  PackageSearch,
  Search,
  ShoppingBasket,
  Sparkles,
  Store,
  Tag,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getMenuCategories } from "../../services/categoryApi";
import { useAuth } from "../../context/AuthContext";

const logo = "/logo.png";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { items: cartItems } = useSelector((state) => state.cart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const { data: menuItems = [], isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getMenuCategories,
  });

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenSubMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/signin");
  };

  const handleProfileClick = () => {
    setIsMenuOpen(false);
    if (user) navigate("/profile");
    else navigate("/signin?redirect=/profile");
  };

  const isActive = (tab) => {
    const path = location.pathname;
    if (tab === "home") return path === "/";
    if (tab === "search") return path === "/search";
    if (tab === "shop") return path.startsWith("/new-product");
    if (tab === "account") return path.startsWith("/profile") || path.startsWith("/signin");
    return false;
  };

  const bottomItemClass = (active) =>
    `flex min-w-[52px] flex-col items-center justify-center gap-1 text-[10px] font-semibold transition ${active ? "text-primary-600" : "text-[#2D545E]"
    }`;

  return (
    <div className="w-full bg-brand-bg md:hidden">
      <header className="fixed inset-x-0 top-0 z-[90] border-b border-secondary-200/70 bg-brand-bg/95 shadow-[0_5px_20px_rgba(139,30,30,0.09)] backdrop-blur-xl">
        <div className="grid h-[72px] grid-cols-[44px_1fr_auto] items-center gap-2 px-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-secondary-200 bg-secondary-50 text-accent transition active:scale-95"
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>

          <Link
            to="/"
            className="mx-auto flex h-[58px] w-[182px] min-w-0 items-center justify-center"
            aria-label="Life n Colors home"
          >
            <img
              src={logo}
              alt="Life n Colors"
              className="h-[54px] w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleProfileClick}
              className="grid h-10 w-10 place-items-center rounded-full text-[#103438] transition hover:bg-secondary-50 hover:text-accent active:scale-95"
              aria-label={user ? "Open profile" : "Sign in"}
            >
              <CircleUserRound size={24} strokeWidth={1.7} />
            </button>

            <Link
              to="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-[#103438] transition hover:bg-secondary-50 hover:text-accent active:scale-95"
              aria-label="Open cart"
            >
              <ShoppingBasket size={24} strokeWidth={1.7} />
              {totalQuantity > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                  {totalQuantity > 99 ? "99+" : totalQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div className="h-[72px]" />

      <nav className="fixed inset-x-0 bottom-0 z-[80] border-t border-secondary-200/80 bg-brand-bg/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(139,30,30,0.11)] backdrop-blur-xl">
        <div className="mx-auto grid max-w-md grid-cols-5 items-end">
          <Link to="/" className={bottomItemClass(isActive("home"))}>
            <Home size={21} strokeWidth={isActive("home") ? 2.3 : 1.8} />
            <span>Home</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className={bottomItemClass(isMenuOpen)}
          >
            <Grid2X2 size={21} strokeWidth={isMenuOpen ? 2.3 : 1.8} />
            <span>Menu</span>
          </button>

          <Link
            to="/search"
            className="group -mt-7 flex flex-col items-center gap-1 text-[10px] font-bold text-primary-600"
            aria-label="Search products"
          >
            <span
              className={`grid h-12 w-12 place-items-center rounded-full border-[3px] border-white shadow-[0_5px_16px_rgba(139,30,30,0.28)] transition active:scale-95 ${isActive("search") ? "bg-accent text-white" : "bg-primary-500 text-white"
                }`}
            >
              <Search size={22} strokeWidth={2.1} />
            </span>
            <span>Search</span>
          </Link>

          <Link to="/new-products" className={bottomItemClass(isActive("shop"))}>
            <Store size={21} strokeWidth={isActive("shop") ? 2.3 : 1.8} />
            <span>Shop</span>
          </Link>

          <button
            type="button"
            onClick={handleProfileClick}
            className={bottomItemClass(isActive("account"))}
          >
            <CircleUserRound size={21} strokeWidth={isActive("account") ? 2.3 : 1.8} />
            <span>Account</span>
          </button>
        </div>
      </nav>

      <aside
        className={`fixed inset-y-0 left-0 z-[110] flex w-[88%] max-w-[350px] flex-col overflow-hidden rounded-r-[28px] bg-brand-bg shadow-[18px_0_50px_rgba(28,18,8,0.2)] transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-accent via-primary-700 to-brand-text px-5 pb-5 pt-4 text-white">
          <span className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-white/10" />
          <span className="absolute -right-2 top-8 h-20 w-20 rounded-full border border-secondary-300/35" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-secondary-300/50 bg-brand-bg/10">
                <Home size={19} className="text-secondary-200" />
              </span>
              <div>
                <p className="font-serif text-lg font-semibold leading-5">Ayraj</p>
                <p className="mt-1 text-[9px] tracking-[0.12em] text-secondary-100">CURATING BEAUTIFUL SPACES</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full bg-brand-bg/10 transition hover:bg-brand-bg/20"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleProfileClick}
            className="relative mt-5 flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-brand-bg/10 p-3 text-left backdrop-blur-sm"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-50 text-primary-700">
              <CircleUserRound size={25} strokeWidth={1.7} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">
                {user?.name || user?.displayName || (user ? "My Account" : "Welcome")}
              </span>
              <span className="mt-0.5 block text-[11px] text-white/70">
                {user ? "View profile and orders" : "Sign in to your account"}
              </span>
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain pb-24">
          <div className="grid grid-cols-3 gap-2 px-4 py-4">
            <Link
              to="/new-products"
            className="flex flex-col items-center gap-2 rounded-2xl border border-secondary-200 bg-brand-bg px-2 py-3 text-center text-[10px] font-semibold text-[#103438] shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary-50 text-accent">
                <Sparkles size={18} />
              </span>
              Products
            </Link>
            <Link
              to="/#combo-products"
              className="flex flex-col items-center gap-2 rounded-2xl border border-secondary-200 bg-brand-bg px-2 py-3 text-center text-[10px] font-semibold text-[#103438] shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary-50 text-accent">
                <Tag size={18} />
              </span>
              Combo
            </Link>
            <Link
              to="/#best-sellers"
              className="flex flex-col items-center gap-2 rounded-2xl border border-secondary-200 bg-brand-bg px-2 py-3 text-center text-[10px] font-semibold text-[#103438] shadow-sm"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary-50 text-accent">
                <PackageSearch size={18} />
              </span>
              Best Sellers
            </Link>
          </div>

          <div className="px-5 pb-2 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent">Shop by category</p>
          </div>

          <ul className="mx-3 overflow-hidden rounded-2xl border border-secondary-200 bg-brand-bg shadow-sm">
            {isLoading && (
              <li className="px-4 py-5 text-center text-xs text-[#2D545E]">Loading categories...</li>
            )}
            {isError && (
              <li className="px-4 py-5 text-center text-xs text-primary-700">Unable to load categories</li>
            )}
            {!isLoading && !isError && menuItems.length === 0 && (
              <li className="px-4 py-5 text-center text-xs text-[#2D545E]">No categories available</li>
            )}

            {menuItems.map((item, index) => {
              const hasSubcategories = item.subcategories?.length > 0;
              const isOpen = openSubMenu === index;

              return (
                <li key={item._id || item.slug} className="border-b border-secondary-200 last:border-b-0">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-4 py-3.5 text-left text-[13px] font-semibold transition ${isOpen ? "bg-secondary-50 text-accent" : "text-[#103438] hover:bg-secondary-50"
                      }`}
                    onClick={() => {
                      if (hasSubcategories) setOpenSubMenu(isOpen ? null : index);
                      else navigate(`/${item.slug}`);
                    }}
                  >
                    <span>{item.name}</span>
                    {hasSubcategories && (
                      <ChevronDown
                        size={17}
                        className={`text-primary-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {isOpen && hasSubcategories && (
                    <ul className="border-t border-secondary-200 bg-secondary-50/70 py-1.5">
                      <li>
                        <Link
                          to={`/${item.slug}`}
                          className="block px-6 py-2.5 text-xs font-semibold text-accent"
                        >
                          View all {item.name}
                        </Link>
                      </li>
                      {item.subcategories.map((sub) => (
                        <li key={sub._id || sub.slug}>
                          <Link
                            to={`/${item.slug}/${sub.slug}`}
                            className="block px-6 py-2.5 text-xs text-[#2D545E] transition hover:bg-secondary-100 hover:text-accent"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {user && (
            <div className="px-4 py-5">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary-500/20 bg-primary-50 py-3 text-sm font-semibold text-primary-700 transition hover:bg-primary-600 hover:text-white"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      />
    </div>
  );
}

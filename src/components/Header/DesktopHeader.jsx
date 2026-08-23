import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { FaInstagram, FaPinterestP, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import logo from "../../image/lifencolors-logo.webp";

const shopLinks = [
  {
    title: "Popular",
    links: [
      { label: "Best Sellers", to: "/new-products" },
      { label: "New Arrivals", to: "/new-products" },
      { label: "Shop All", to: "/new-products" },
    ],
  },
  {
    title: "By Style",
    links: [
      { label: "Indian Heritage", to: "/new-products" },
      { label: "Chinoiserie", to: "/new-products" },
      { label: "Tropical", to: "/new-products" },
      { label: "European", to: "/new-products" },
      { label: "Modern & Abstract", to: "/new-products" },
      { label: "Pichwai", to: "/new-products" },
    ],
  },
  {
    title: "By Room",
    links: [
      { label: "Bedrooms", to: "/new-products" },
      { label: "Living Rooms", to: "/new-products" },
      { label: "Kids & Nursery", to: "/new-products" },
      { label: "Pooja Room", to: "/new-products" },
      { label: "Commercial", to: "/new-products" },
      { label: "Ceiling", to: "/new-products" },
      { label: "Powder Room", to: "/new-products" },
      { label: "Wardrobes", to: "/new-products" },
      { label: "All Rooms", to: "/new-products" },
    ],
  },
  {
    title: "By Collection",
    links: [
      { label: "2026 Edit", to: "/new-products" },
      { label: "Suneherii", to: "/new-products" },
      { label: "Amazora", to: "/new-products" },
      { label: "Neelvana", to: "/new-products" },
      { label: "Atarangi", to: "/new-products" },
      { label: "Sparkle & Shine", to: "/new-products" },
    ],
  },
];

const fabricHomeMenu = [
  {
    title: "Textiles",
    links: [
      { label: "Curtains", to: "/new-products" },
      { label: "Upholstery Fabrics", to: "/new-products" },
      { label: "Cushion Covers", to: "/new-products" },
      { label: "Table Linen", to: "/new-products" },
    ],
  },
  {
    title: "Decor",
    links: [
      { label: "Embroidered Wall Arts", to: "/new-products" },
      { label: "Printed Wall Arts", to: "/new-products" },
      { label: "Curtain Tiebacks", to: "/new-products" },
    ],
  },
];

export default function DesktopHeader({ isHomePage = false }) {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const megaMenuRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const { user } = useAuth();
  const { items: cartItems } = useSelector((state) => state.cart);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 72);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!activeMenu) return undefined;

    const handlePointerMove = (event) => {
      const isInsideHeader = navRef.current?.contains(event.target);
      const isInsideMegaMenu = megaMenuRef.current?.contains(event.target);

      if (!isInsideHeader && !isInsideMegaMenu) {
        setActiveMenu(null);
        setIsHeaderHovered(false);
      }
    };

    document.addEventListener("mousemove", handlePointerMove);
    return () => document.removeEventListener("mousemove", handlePointerMove);
  }, [activeMenu]);

  const handleProfileClick = () => {
    if (user) navigate("/profile");
    else navigate("/signin?redirect=/profile");
  };

  const overlayMode = isHomePage && !isScrolled;
  const transparentMode = overlayMode && !isHeaderHovered && !activeMenu;
  const textClass = transparentMode ? "text-white" : "text-black";
  const hoverClass = transparentMode ? "hover:text-white/75" : "hover:text-black";

  return (
    <header className="relative z-[999] w-full">
      <div className="fixed left-0 top-0 z-[999] flex h-[42px] w-full items-center bg-[#cbb58e] px-8 text-[16px] font-semibold text-white transition-colors duration-300">
        <div className="mx-auto grid w-full max-w-[1220px] grid-cols-[1fr_auto_1fr] items-center">
          <ChevronLeft size={18} className="justify-self-end text-white/70" strokeWidth={1.5} />
          <p className="px-28 text-center">Shipping to 28+ Countries</p>
          <ChevronRight size={18} className="text-white/70" strokeWidth={1.5} />
        </div>
      </div>

      <nav
        ref={navRef}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => {
          setIsHeaderHovered(false);
          setActiveMenu(null);
        }}
        className={`fixed left-0 top-[42px] z-[998] w-full transition-all duration-300 ${transparentMode
          ? "h-[154px] border-b border-transparent bg-transparent"
          : `${overlayMode ? "h-[154px]" : "h-[92px]"} border-b border-black/10 bg-[#f7f5f2] shadow-[0_5px_22px_rgba(0,0,0,0.08)]`
          }`}
      >
        <div
          className={`relative mx-auto flex h-full max-w-[1800px] items-center justify-center px-12 transition-all duration-300 ${overlayMode ? "pt-7" : ""
            }`}
        >
          <Link
            to="/"
            className={`absolute left-1/2 flex -translate-x-1/2 items-center justify-center overflow-hidden transition-all duration-300 ${overlayMode ? "top-3 h-[50px] w-[175px] opacity-100" : "pointer-events-none top-0 h-0 w-0 opacity-0"
              }`}
            aria-label="Life n Colors home"
          >
            <img
              src={logo}
              alt="Life n Colors"
              className={overlayMode ? "w-[160px] max-w-none object-contain" : "w-[160px] max-w-none object-contain"}
            />
          </Link>

          <button
            type="button"
            onClick={() => navigate("/search")}
            className={`absolute left-12 transition ${textClass} ${hoverClass}`}
            aria-label="Search"
          >
            <Search size={31} strokeWidth={1.7} />
          </button>

          <ul className={`mx-auto flex items-center justify-center gap-8 whitespace-nowrap text-[14px] font-medium uppercase transition-colors xl:gap-9 ${textClass}`}>
            <li
              className="relative"
              onMouseEnter={() => setActiveMenu("shop")}
            >
              <Link to="/new-products" className={`flex items-center gap-2 py-8 transition ${hoverClass}`}>
                Wallpapers <ChevronDown size={16} />
              </Link>
              {activeMenu === "shop" && (
                <div ref={megaMenuRef} className={`fixed left-0 z-[997] w-screen border-y border-black/20 bg-white text-black shadow-[0_12px_26px_rgba(0,0,0,0.08)] ${overlayMode ? "top-[196px]" : "top-[134px]"}`}>
                  <div className="grid min-h-[330px] grid-cols-4">
                    {shopLinks.map((column, index) => (
                      <div
                        key={column.title}
                        className={`px-8 py-7 text-left ${index > 0 ? "border-l border-black/15" : ""}`}
                      >
                        <h3 className="mb-2 text-[17px] font-bold leading-none tracking-normal text-black">
                          {column.title}
                        </h3>
                        <ul className="space-y-2.5 text-[15px] font-normal normal-case tracking-normal text-[#555]">
                          {column.links.map((item) => (
                            <li key={item.label}>
                              <Link to={item.to} className="transition hover:text-black">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <li
              className="relative"
              onMouseEnter={() => setActiveMenu("categories")}
            >
              <button type="button" className={`flex items-center gap-2 py-8 transition ${hoverClass}`}>
                Fabric & Home <ChevronDown size={16} />
              </button>
              {activeMenu === "categories" && (
                <div ref={megaMenuRef} className={`fixed left-0 z-[997] w-screen border-y border-black/20 bg-white text-black shadow-[0_12px_26px_rgba(0,0,0,0.08)] ${overlayMode ? "top-[196px]" : "top-[134px]"}`}>
                  <div className="grid min-h-[210px] grid-cols-2">
                    {fabricHomeMenu.map((column, index) => (
                      <div
                        key={column.title}
                        className={`px-8 py-6 text-left ${index > 0 ? "border-l border-black/15" : ""}`}
                      >
                        <h3 className="mb-2 text-[17px] font-bold leading-none tracking-normal text-black">
                          {column.title}
                        </h3>
                        <ul className="space-y-2.5 text-[15px] font-normal normal-case tracking-normal text-[#555]">
                          {column.links.map((item) => (
                            <li key={item.label}>
                              <Link to={item.to} className="transition hover:text-black">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <li onMouseEnter={() => setActiveMenu(null)}>
              <Link to="/#best-sellers" className={`transition ${hoverClass}`}>Lookbook</Link>
            </li>
            <li onMouseEnter={() => setActiveMenu(null)}>
              <Link to="/new-products" className={`transition ${hoverClass}`}>Prasanaakshi</Link>
            </li>
            <li onMouseEnter={() => setActiveMenu(null)}>
              <Link to="/#combo-products" className={`transition ${hoverClass}`}>Gifting</Link>
            </li>
            <li onMouseEnter={() => setActiveMenu(null)}>
              <Link to="/about-us" className={`flex items-center gap-2 transition ${hoverClass}`}>
                About Us <ChevronDown size={16} />
              </Link>
            </li>
          </ul>

          {overlayMode && (
            <div className={`absolute right-12 top-2 flex items-center gap-4 text-[15px] font-medium transition-colors ${transparentMode ? "text-white" : "text-black"}`}>
              <a href="https://www.instagram.com/lifencolorsdesigns/" target="_blank" rel="noopener noreferrer" aria-label="Life n Colors on Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="https://in.pinterest.com/lifencolorsDesigns/" target="_blank" rel="noopener noreferrer" aria-label="Life n Colors on Pinterest">
                <FaPinterestP size={19} />
              </a>
              <a href="https://wa.me/918700986208" target="_blank" rel="noopener noreferrer" aria-label="Life n Colors on WhatsApp">
                <FaWhatsapp size={18} />
              </a>
              <Phone size={21} strokeWidth={2.1} />
              <a href="tel:+919310845706" className="tracking-wide">093108 45706</a>
            </div>
          )}

          <div className={`absolute right-12 flex items-center justify-end gap-5 transition-all duration-300 ${textClass}`}>
            <button
              type="button"
              onClick={handleProfileClick}
              className={`transition ${hoverClass}`}
              aria-label={user ? "Open profile" : "Sign in"}
            >
              <UserRound size={27} strokeWidth={1.7} />
            </button>

            <Link to="/cart" className={`relative transition ${hoverClass}`} aria-label="Cart">
              <ShoppingBag size={28} strokeWidth={1.6} />
              <span className="absolute -bottom-1 -left-2 grid h-5 min-w-5 place-items-center rounded-full bg-black px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            </Link>

            <span className="h-[18px] w-[34px] overflow-hidden shadow-sm">
              <span className="block h-1/3 bg-[#ff9933]" />
              <span className="block h-1/3 bg-white" />
              <span className="block h-1/3 bg-[#138808]" />
            </span>
          </div>
        </div>
      </nav>

      <div className={isHomePage ? "h-0" : "h-[134px]"} />
    </header>
  );
}

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

const logo = "/logo.png";

const shopLinks = [
  {
    title: "Popular",
    links: [
      { label: "Best Sellers", to: "/collections/best-selling-wallpapers" },
      { label: "New Arrivals", to: "/collections/latest-wallpaper-collection" },
      { label: "Shop All", to: "/collections/buy-wallpapers-online" },
    ],
  },
  {
    title: "By Style",
    links: [
      { label: "Indian Heritage", to: "/collections/indian-traditional-wallpapers" },
      { label: "Chinoiserie", to: "/collections/chinoiserie-room-wallpapers" },
      { label: "Tropical", to: "/collections/tropical-theme-room-wallpapers" },
      { label: "European", to: "/collections/amazora-world-art-wallpapers-fabrics" },
      { label: "Modern & Abstract", to: "/collections/abstract-wallpapers-for-room" },
      { label: "Pichwai", to: "/collections/pichwai-theme-wallpapers" },
    ],
  },
  {
    title: "By Room",
    links: [
      { label: "Bedrooms", to: "/collections/bedroom-wallpaper-collection" },
      { label: "Living Rooms", to: "/collections/living-room-wallpaper-collection" },
      { label: "Kids & Nursery", to: "/collections/kids-room-wallpapers" },
      { label: "Pooja Room", to: "/collections/pooja-room-wallpapers" },
      { label: "Commercial", to: "/collections/commercial-areas-wallpapers" },
      { label: "Ceiling", to: "/collections/ceiling-wallpapers" },
      { label: "Powder Room", to: "/collections/powder-room-wallpapers" },
      { label: "Wardrobes", to: "/collections/wardrobe-wallpapers" },
      { label: "All Rooms", to: "/collections/buy-wallpapers-online" },
    ],
  },
  {
    title: "By Collection",
    links: [
      { label: "2026 Edit", to: "/collections/2026-wallpaper-collection" },
      { label: "Suneherii", to: "/collections/suneherii-wallpaper-collection" },
      { label: "Amazora", to: "/collections/amazora-world-art-wallpapers-fabrics" },
      { label: "Neelvana", to: "/collections/neelvana-collection-by-life-n-colors-shabnam-gupta" },
      { label: "Atarangi", to: "/collections/atarangi-affordable-wallpaper-collection" },
      { label: "Sparkle & Shine", to: "/collections/kids-room-wallpapers" },
    ],
  },
];

const fabricHomeMenu = [
  {
    title: "Textiles",
    links: [
      { label: "Curtains", to: "/collections/ready-made-curtains" },
      { label: "Upholstery Fabrics", to: "/collections/sofa-and-chair-fabric" },
      { label: "Cushion Covers", to: "/collections/cushion-covers" },
      { label: "Table Linen", to: "/collections/tabler-runners-mats" },
    ],
  },
  {
    title: "Decor",
    links: [
      { label: "Embroidered Wall Arts", to: "/collections/stitched-stories-hand-embroidered-wall-art" },
      { label: "Printed Wall Arts", to: "/collections/wallart-posters" },
      { label: "Curtain Tiebacks", to: "/collections/beautiful-curtain-tie-backs" },
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

  const homeOverlayMode = isHomePage && !isScrolled;
  const nonHomeExpandedMode = !isHomePage && !isScrolled;
  const expandedMode = homeOverlayMode || nonHomeExpandedMode;
  const transparentMode = homeOverlayMode && !isHeaderHovered && !activeMenu;
  const navTopClass = isHomePage ? "top-[42px]" : "top-0";
  const expandedHeightClass = isHomePage || isScrolled ? "h-[154px]" : "h-[118px]";
  const spacerHeightClass = isScrolled ? "h-[92px]" : "h-[118px]";
  const expandedInnerPadding = isHomePage ? "pt-7" : "pt-5";
  const expandedSocialClass = isHomePage ? "right-12 top-2 gap-4 text-[15px]" : "right-12 top-2 gap-3 text-[13px]";
  const megaTopClass = isHomePage
    ? expandedMode
      ? "top-[196px]"
      : "top-[134px]"
    : expandedMode
      ? "top-[118px]"
      : "top-[92px]";
  const textClass = transparentMode ? "text-white" : "text-black";
  const hoverClass = transparentMode ? "hover:text-white/75" : "hover:text-black";

  return (
    <header className="relative z-[999] w-full">
      {isHomePage && (
        <div className="fixed left-0 top-0 z-[999] flex h-[42px] w-full items-center bg-[#C99665] px-8 text-[16px] font-semibold text-white transition-colors duration-300">
          <div className="mx-auto grid w-full max-w-[1220px] grid-cols-[1fr_auto_1fr] items-center">
            <ChevronLeft size={18} className="justify-self-end text-white/70" strokeWidth={1.5} />
            <p className="px-28 text-center">Shipping to 28+ Countries</p>
            <ChevronRight size={18} className="text-white/70" strokeWidth={1.5} />
          </div>
        </div>
      )}

      <nav
        ref={navRef}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => {
          setIsHeaderHovered(false);
          setActiveMenu(null);
        }}
        className={`fixed left-0 ${navTopClass} z-[998] w-full transition-all duration-300 ${transparentMode
          ? "h-[154px] border-b border-transparent bg-transparent"
          : `${expandedMode ? expandedHeightClass : "h-[92px]"} border-b border-black/10 bg-[#D7D7D7] shadow-[0_5px_22px_rgba(0,0,0,0.08)]`
          }`}
      >
        <div
          className={`relative mx-auto flex h-full max-w-[1800px] items-center justify-center px-12 transition-all duration-300 ${expandedMode ? expandedInnerPadding : ""
            }`}
        >
          <div className={`absolute left-12 flex items-center gap-1 transition-colors ${textClass}`}>
            <Link
              to="/"
              className="flex h-[82px] w-[248px] items-center justify-start"
              aria-label="Life n Colors home"
            >
              <img
                src={logo}
                alt="Life n Colors"
                className="h-[80px] w-auto object-contain"
              />
            </Link>

            <button
              type="button"
              onClick={() => navigate("/search")}
              className={`-ml-24 transition ${hoverClass}`}
              aria-label="Search"
            >
              <Search size={27} strokeWidth={1.7} />
            </button>
          </div>

          <ul className={`mx-auto flex items-center justify-center gap-8 whitespace-nowrap text-[14px] font-medium uppercase transition-colors xl:gap-9 ${textClass}`}>
            <li
              className="relative"
              onMouseEnter={() => setActiveMenu("shop")}
            >
              <Link to="/new-products" className={`flex items-center gap-2 py-8 transition ${hoverClass}`}>
                Wallpapers <ChevronDown size={16} />
              </Link>
              {activeMenu === "shop" && (
                <div ref={megaMenuRef} className={`fixed left-0 z-[997] w-screen border-y border-black/20 bg-white text-black shadow-[0_12px_26px_rgba(0,0,0,0.08)] ${megaTopClass}`}>
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
                <div ref={megaMenuRef} className={`fixed left-0 z-[997] w-screen border-y border-black/20 bg-white text-black shadow-[0_12px_26px_rgba(0,0,0,0.08)] ${megaTopClass}`}>
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
              <Link to="/design-inspiration" className={`transition ${hoverClass}`}>Lookbook</Link>
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

          {expandedMode && (
            <div className={`absolute flex items-center font-medium transition-colors ${expandedSocialClass} ${transparentMode ? "text-white" : "text-black"}`}>
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

      <div className={isHomePage ? "h-0" : spacerHeightClass} />
    </header>
  );
}

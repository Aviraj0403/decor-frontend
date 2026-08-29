import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useCartStore, useAuthStore } from '../store';
import { categoryAPI } from '../api/services';

const NAV_LINKS = [
  {
    label: 'Wallpapers',
    href: '/collections/wallpapers',
    children: [
      { label: 'Best Sellers', href: '/collections/best-selling-wallpapers' },
      { label: 'New Arrivals', href: '/collections/new-arrivals' },
      { label: 'Indian Heritage', href: '/collections/indian-heritage-wallpapers' },
      { label: 'Chinoiserie', href: '/collections/chinoiserie-wallpapers' },
      { label: 'Tropical', href: '/collections/tropical-wallpapers' },
      { label: 'By Bedroom', href: '/collections/bedroom-wallpapers' },
      { label: 'By Living Room', href: '/collections/living-room-wallpapers' },
    ],
  },
  {
    label: 'Fabric & Home',
    href: '/collections/fabric-home',
    children: [
      { label: 'Cushion Covers', href: '/collections/cushion-covers' },
      { label: 'Curtains', href: '/collections/curtains' },
      { label: 'Table Linen', href: '/collections/table-linen' },
      { label: 'Upholstery Fabrics', href: '/collections/upholstery-fabrics' },
    ],
  },
  {
    label: 'Decor',
    href: '/collections/decor',
    children: [
      { label: 'Embroidered Wall Arts', href: '/collections/embroidered-wall-art' },
      { label: 'Printed Wall Arts', href: '/collections/printed-wall-art' },
      { label: 'Curtain Tiebacks', href: '/collections/curtain-tiebacks' },
    ],
  },
  { label: 'Collections', href: '/collections/all' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState(NAV_LINKS);
  const { toggleCart, items } = useCartStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await categoryAPI.getMenuCategories();
        if (data && data.success && data.categories) {
          const dynamicLinks = data.categories.map(cat => ({
            label: cat.name,
            href: `/collections/${cat.slug}`,
            children: cat.subcategories && cat.subcategories.length > 0
              ? cat.subcategories.map(sub => ({
                  label: sub.name,
                  href: `/collections/${sub.slug}`
                }))
              : null
          }));
          setNavLinks([
            ...dynamicLinks,
            { label: 'Collections', href: '/collections/all' },
            { label: 'About', href: '/about' }
          ]);
        }
      } catch (err) {
        console.error("Failed to load menu categories:", err);
      }
    };
    fetchMenu();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>🌿 Free Shipping on orders above ₹999 &nbsp;|&nbsp; Handcrafted with love &nbsp;|&nbsp; </span>
        <a href="tel:+919999999999" className="inline-flex items-center gap-1 text-white/80 hover:text-white ml-1">
          <Phone size={11} /> +91 99999 99999
        </a>
      </div>

      {/* Navbar */}
      <nav className={`navbar transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="lg:hidden text-charcoal"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center mx-auto lg:mx-0">
              <span className="font-serif text-2xl tracking-widest text-charcoal leading-none">AYRAJ</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="nav-dropdown">
                  <Link
                    to={link.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-charcoal hover:text-green transition-colors"
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} />}
                  </Link>
                  {link.children && (
                    <div className="nav-dropdown-menu">
                      {link.children.map((child) => (
                        <Link key={child.label} to={child.href}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-charcoal hover:text-green transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link to="/wishlist" className="text-charcoal hover:text-green transition-colors hidden sm:block" aria-label="Wishlist">
                <Heart size={20} />
              </Link>

              <button
                onClick={toggleCart}
                className="relative text-charcoal hover:text-green transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="cart-badge">{itemCount > 9 ? '9+' : itemCount}</span>
                )}
              </button>

              {user ? (
                <div className="nav-dropdown hidden lg:block">
                  <button className="text-sm font-medium text-charcoal hover:text-green transition-colors flex items-center gap-1">
                    Hi, {user.name?.split(' ')[0]} <ChevronDown size={14} />
                  </button>
                  <div className="nav-dropdown-menu right-0 left-auto">
                    <Link to="/account/orders">My Orders</Link>
                    <Link to="/account/profile">Profile</Link>
                    <Link to="/track">Track Order</Link>
                    <button onClick={logout} className="w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-cream">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hidden lg:block text-sm font-medium text-charcoal hover:text-green transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 px-2">
              <form onSubmit={handleSearch} className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products, collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-cream-dark bg-cream pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:border-green"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-green">
                  <Search size={16} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-cream-dark">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5 text-sm font-medium text-charcoal border-b border-cream-dark"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-4 py-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-xs text-muted hover:text-green"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {!user ? (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-green font-medium">
                  Login / Register
                </Link>
              ) : (
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block py-2 text-sm text-red-500">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

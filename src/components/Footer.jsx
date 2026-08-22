import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'All Products', href: '/collections/all' },
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
    { label: 'Best Sellers', href: '/collections/best-selling' },
    { label: 'About Us', href: '/about' },
  ],
  'Customer Care': [
    { label: 'Track Your Order', href: '/track' },
    { label: 'My Orders', href: '/account/orders' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  'Collections': [
    { label: 'Cushion Covers', href: '/collections/cushion-covers' },
    { label: 'Wallpapers', href: '/collections/wallpapers' },
    { label: 'Curtains', href: '/collections/curtains' },
    { label: 'Table Linen', href: '/collections/table-linen' },
    { label: 'Wall Art', href: '/collections/wall-art' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#1A2E0A', color: '#E8E0D0' }}>
      {/* Top strip */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <p className="font-serif text-3xl tracking-widest text-white">SIDDHI</p>
                <p className="text-[10px] tracking-[5px] text-gold uppercase">DECOR</p>
              </div>
              <p className="text-sm opacity-70 leading-relaxed mb-6">
                Handcrafted luxury home décor inspired by India's rich artistic heritage. Each piece tells a story.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors rounded-full">
                  <Instagram size={16} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors rounded-full">
                  <Facebook size={16} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors rounded-full">
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-white font-medium text-sm uppercase tracking-widest mb-4">{section}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-all"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact + Newsletter */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-6 text-sm opacity-70">
            <a href="tel:+919999999999" className="flex items-center gap-2 hover:opacity-100 hover:text-gold transition-all">
              <Phone size={14} /> +91 99999 99999
            </a>
            <a href="mailto:hello@siddhidecor.in" className="flex items-center gap-2 hover:opacity-100 hover:text-gold transition-all">
              <Mail size={14} /> hello@siddhidecor.in
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> New Delhi, India
            </span>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-sm font-medium text-white mb-2">Get exclusive offers in your inbox</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border border-white/20 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold w-64 max-w-full"
              />
              <button type="submit" className="bg-gold text-white px-5 py-2 text-xs font-medium uppercase tracking-wider hover:bg-gold-light transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs opacity-50">© {new Date().getFullYear()} Siddhi Decor. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs opacity-50">
          <Link to="/privacy" className="hover:opacity-80">Privacy</Link>
          <Link to="/terms" className="hover:opacity-80">Terms</Link>
          <span>Made with ♥ in India</span>
        </div>
      </div>
    </footer>
  );
}

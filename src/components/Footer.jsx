import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  'Siddhi Decor': [
    { label: 'Our Story', href: '/about-us' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Delhi Studio', href: '/contact-us' },
    { label: 'How it works?', href: '/faq' },
  ],
  'Connect': [
    { label: 'Call: +91 99999 99999', href: 'tel:+919999999999', isExternal: true },
    { label: 'WhatsApp: +91 99999 99999', href: 'https://wa.me/919999999999', isExternal: true },
    { label: 'Email: hello@siddhidecor.in', href: 'mailto:hello@siddhidecor.in', isExternal: true },
    { label: 'Trade Program', href: '/trade-program' },
    { label: 'Contact Us', href: '/contact-us' },
  ],
  'Help': [
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Return Policy', href: '/return-refund' },
    { label: 'Installation Guidelines', href: '/installation-guidelines' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#E2B385', color: '#103438', borderTop: '1px solid #D7D7D7' }} className="pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Natural Accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#2D545E] via-[#C99665] to-[#2D545E]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Intro Column */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <p className="font-serif text-3xl tracking-widest text-[#103438] font-semibold">SIDDHI</p>
              <p className="text-[10px] tracking-[5px] text-[#C99665] uppercase font-bold mt-0.5">DECOR</p>
            </div>
            <p className="text-sm text-[#103438]/85 leading-relaxed max-w-sm">
              Handcrafted luxury home décor inspired by India's rich artistic heritage and designed for contemporary living. Loved by designers and homeowners globally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 border border-[#D7D7D7] bg-white/50 flex items-center justify-center text-[#103438]/70 hover:text-[#2D545E] hover:border-[#2D545E] hover:bg-white transition-all rounded-full shadow-sm">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 border border-[#D7D7D7] bg-white/50 flex items-center justify-center text-[#103438]/70 hover:text-[#2D545E] hover:border-[#2D545E] hover:bg-white transition-all rounded-full shadow-sm">
                <Facebook size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 border border-[#D7D7D7] bg-white/50 flex items-center justify-center text-[#103438]/70 hover:text-[#2D545E] hover:border-[#2D545E] hover:bg-white transition-all rounded-full shadow-sm">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-[#103438] font-bold text-xs uppercase tracking-widest mb-4 border-b border-[#D7D7D7]/60 pb-2">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#103438]/75 hover:text-[#2D545E] hover:font-medium transition-all"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-[#103438]/75 hover:text-[#2D545E] hover:font-medium transition-all"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="text-[#103438] font-bold text-xs uppercase tracking-widest mb-4 border-b border-[#D7D7D7]/60 pb-2">Our Newsletter</h4>
            <p className="text-xs text-[#103438]/75 leading-relaxed">
              Subscribe to stay updated on new designer collections, installation tips, and exclusive previews.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white border border-[#D7D7D7] px-3.5 py-2 text-xs text-[#103438] placeholder:text-[#103438]/40 focus:outline-none focus:border-[#2D545E] w-full rounded shadow-sm"
              />
              <button type="submit" className="bg-[#2D545E] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-[#103438] transition-colors w-full rounded shadow-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright and Payment Gateways */}
      <div className="border-t border-[#D7D7D7] pt-6 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#103438]/60">© {new Date().getFullYear()}, Siddhi Decor. All rights reserved.</p>
          
          {/* Supported Payment Channels */}
          <div className="flex items-center gap-3.5 opacity-70">
            {/* Visa */}
            <svg className="h-4 w-auto" viewBox="0 0 24 15" fill="currentColor">
              <path d="M10 0h4v15h-4zM2 0h4v15H2zm16 0h4v15h-4z" />
            </svg>
            <span className="text-[10px] tracking-widest font-sans font-bold text-[#103438]/60 uppercase">VISA • MASTERCARD • GPAY • PAYPAL • AMEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

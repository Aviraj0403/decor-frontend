import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import footerImage from "../../image/lifencolors-logo.webp";

export default function Footer() {
  return (
    <footer className="bg-accent text-white font-sans border-t-4 border-secondary">
      {/* Main Footer */}
      <div className="py-12 px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand & Social */}
        <div className="lg:col-span-1">
          <Link
            to="/"
            className="flex h-[82px] w-full max-w-[320px] items-center justify-start overflow-visible"
            aria-label="Life n Colors home"
          >
            <img
              src={footerImage}
              alt="Life n Colors"
              className="h-full w-full object-contain object-left"
            />
          </Link>
          
          <p className="text-sm mt-6 mb-6 leading-relaxed text-white/85">
            Your trusted spiritual partner on the journey.<br />
            Peace, prosperity and protection.
          </p>

          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/share/1RhCC9bmst/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Divya Mantra on Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 text-white transition-colors hover:bg-secondary hover:text-brand-text"
            >
              <FaFacebookF size={15} />
            </a>
            <a
              href="https://www.instagram.com/divyamantra.official?igsh=bjNheTR5cXN2MWlz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Divya Mantra on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 text-white transition-colors hover:bg-secondary hover:text-brand-text"
            >
              <FaInstagram size={15} />
            </a>
            <a
              href="https://www.youtube.com/@DivyaMantra.official-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Divya Mantra on YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/45 text-white transition-colors hover:bg-secondary hover:text-brand-text"
            >
              <FaYoutube size={15} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-[15px] text-white mb-5">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link to="/return-refund" className="hover:text-white transition-colors">Return & Refund</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-[15px] text-white mb-5">Categories</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/category/rudraksha" className="hover:text-white transition-colors">Rudraksha</Link></li>
            <li><Link to="/category/malas" className="hover:text-white transition-colors">Malas & Bracelets</Link></li>
            <li><Link to="/category/puja-essentials" className="hover:text-white transition-colors">Puja Essentials</Link></li>
            <li><Link to="/category/yantra" className="hover:text-white transition-colors">Yantra & Kavach</Link></li>
            <li><Link to="/category/incense" className="hover:text-white transition-colors">Incense & Dhoop</Link></li>
            <li><Link to="/category/books" className="hover:text-white transition-colors">Spiritual Books</Link></li>
            <li><Link to="/category/gifts" className="hover:text-white transition-colors">Gift Sets</Link></li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h4 className="font-semibold text-[15px] text-white mb-5">My Account</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
            <li><Link to="/orders" className="hover:text-white transition-colors">Orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link to="/addresses" className="hover:text-white transition-colors">Addresses</Link></li>
            <li><Link to="/logout" className="hover:text-white transition-colors">Logout</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="font-semibold text-[15px] text-white mb-5">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-white mt-0.5 shrink-0" size={16} />
              <span className="leading-snug">Delhi India main market 110005</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-white shrink-0" size={16} />
              <a href="tel:+919588360684" className="hover:text-white transition-colors">+91 9588360684</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-white shrink-0" size={16} />
              <a href="mailto:divyamantraofficial@gmail.com" className="hover:text-white transition-colors">divyamantraofficial@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="text-white shrink-0" size={16} />
              <span>Mon - Sat: 10 AM - 7 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/25 bg-brand-text py-4 px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p className="text-center md:text-left text-white/80">
          © {new Date().getFullYear()} Divya Mantra. All Rights Reserved. <span className="ml-2">Developed by <a href="https://www.jdinfotechsolutions.i" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">JD Infotech Solutions</a></span>
        </p>

        <div className="flex items-center gap-3 text-2xl">
          <div className="bg-brand-bg rounded px-1.5 py-0.5 flex items-center justify-center">
             <FaCcVisa className="text-[#1a1f71] text-xl" />
          </div>
          <div className="bg-brand-bg rounded px-1.5 py-0.5 flex items-center justify-center">
             <FaCcMastercard className="text-[#eb001b] text-xl" />
          </div>
          <div className="bg-brand-bg rounded px-1.5 py-0.5 flex items-center justify-center font-bold text-[#f26522] text-[10px] italic">
             UPI
          </div>
          <div className="bg-brand-bg rounded px-1.5 py-0.5 flex items-center justify-center">
             <SiPaytm className="text-[#002e6e] text-[18px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}

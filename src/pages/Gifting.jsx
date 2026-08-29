import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMiniProducts } from '../services/productApi';
import NewArrivalPC from '../components/Product/NewArrivalPC';
import { Gift, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Gifting() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qty, setQty] = useState('');
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch combo/gift products dynamically
  const { data: comboRes, isLoading } = useQuery({
    queryKey: ['comboProducts'],
    queryFn: () => getMiniProducts(1, 20, '', '', '', '', '', 'true'),
  });

  const combos = comboRes?.products || [];

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error('Please fill in name, email, and phone number.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Inquiry submitted! Our design curator will reach out to you shortly.');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setQty('');
      setMsg('');
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero Banner */}
      <section className="relative bg-[#103438] py-20 md:py-28 text-white px-4 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-gold">
            <Sparkles size={13} /> The Art of Gifting
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight max-w-4xl mx-auto">
            Luxury Gift Hampers & Custom Curations
          </h1>
          <p className="font-sans text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Beautifully crafted hampers, wedding gift boxes, and bespoke corporate curations. Make every milestone and celebration memorable with the timeless elegance of Ayraj styling.
          </p>
        </div>
      </section>

      {/* Corporate, Wedding & Festive cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-cream-dark p-8 rounded-lg bg-cream/25 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-[#103438]/10 text-[#103438] flex items-center justify-center">
            <Gift size={20} />
          </div>
          <h3 className="font-serif text-xl text-charcoal">Festive Gift Boxes</h3>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Curated gift pairings containing hand-embroidered cushions, block-print linen sets, and luxury room accents. Custom packed in premium botanical print boxes.
          </p>
        </div>

        <div className="border border-cream-dark p-8 rounded-lg bg-cream/25 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-[#103438]/10 text-[#103438] flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <h3 className="font-serif text-xl text-charcoal">Wedding Hampers</h3>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Bespoke wedding favors and luxury trousseau gift boxes tailored to match your wedding color themes, featuring authentic Indian miniature wall art prints.
          </p>
        </div>

        <div className="border border-cream-dark p-8 rounded-lg bg-cream/25 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-[#103438]/10 text-[#103438] flex items-center justify-center">
            <Send size={20} />
          </div>
          <h3 className="font-serif text-xl text-charcoal">Corporate Gifting</h3>
          <p className="text-xs text-muted leading-relaxed font-sans">
            Elegant corporate gifts reflecting craft and design appreciation. Customizable packaging with company branding for executive events and year-end celebrations.
          </p>
        </div>
      </section>

      {/* Dynamic Products Grid (Seeded/Admin Combos) */}
      <section className="bg-cream/20 py-16 px-4 border-y border-cream-dark">
        <div className="max-w-7xl mx-auto sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-sans text-muted uppercase tracking-[0.25em] mb-2">Our Curations</p>
            <h2 className="font-serif text-3xl text-charcoal font-light">Explore Luxury Gift Sets</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-cream-dark h-72 rounded" />
              ))}
            </div>
          ) : combos.length === 0 ? (
            <div className="text-center py-10 text-muted italic font-sans text-xs">
              Direct checkout gift sets are temporarily restocking. Use our custom form below to inquire about custom orders!
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {combos.map((product) => (
                <NewArrivalPC
                  key={product._id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lead Hamper Form & Contact */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 space-y-5">
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-light leading-snug">
              Request a Custom Hamper Catalog
            </h3>
            <p className="text-xs text-muted font-sans leading-relaxed">
              Planning a wedding, milestone event, or corporate campaign? Get in touch with our design studio to receive custom mockup layouts, bulk pricing catalogs, and fabric fabric swatch samples.
            </p>
            <div className="space-y-2 pt-3 text-xs font-sans text-charcoal">
              <p className="flex items-center gap-2">
                <strong>WhatsApp:</strong> +91 87009 86208
              </p>
              <p className="flex items-center gap-2">
                <strong>Email:</strong> ayrajdesign@gmail.com
              </p>
            </div>
          </div>

          <div className="md:col-span-7 bg-cream border border-cream-dark p-8 rounded-lg shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="inline-flex w-12 h-12 rounded-full bg-green/10 text-green items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-serif text-lg text-charcoal">Inquiry Received</h4>
                <p className="text-xs text-muted font-sans">
                  Thank you! Our gifting specialist will get back to you via email/phone within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-green uppercase tracking-wide hover:underline"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-500 uppercase tracking-wider mb-1">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full p-2.5 border border-cream-dark bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#103438]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-500 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-2.5 border border-cream-dark bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#103438]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-zinc-500 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                      className="w-full p-2.5 border border-cream-dark bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#103438]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-zinc-500 uppercase tracking-wider mb-1">Estimated Quantity</label>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      placeholder="e.g. 50"
                      className="w-full p-2.5 border border-cream-dark bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#103438]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-zinc-500 uppercase tracking-wider mb-1">Tell us about your requirements</label>
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Event date, packaging customizations, color preferences, etc."
                    rows={4}
                    className="w-full p-2.5 border border-cream-dark bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#103438]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#103438] hover:bg-[#0c2629] text-white font-bold uppercase tracking-wider rounded transition disabled:bg-zinc-300 disabled:text-zinc-500 cursor-pointer"
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

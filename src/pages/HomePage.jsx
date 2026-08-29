import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { productAPI, categoryAPI } from '../api/services';
import ProductCard from '../components/ProductCard';

// ── Hero Slides ─────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    bg: 'from-[#103438] to-[#2D545E]',
    tag: 'New Collection 2026',
    heading: 'Where Art Meets\nYour Living Space',
    sub: 'Handcrafted textiles & wallpapers that transform every wall and corner into a masterpiece.',
    cta: { label: 'Shop New Arrivals', href: '/collections/new-arrivals' },
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    imgAlt: 'Luxury cushion covers',
  },
  {
    bg: 'from-[#103438] to-[#2D545E]',
    tag: 'Handcrafted Excellence',
    heading: 'Luxury Cushion Covers\nFor Discerning Homes',
    sub: 'Embroidered with traditional Indian motifs. Made by skilled artisans across Rajasthan.',
    cta: { label: 'Shop Cushion Covers', href: '/collections/cushion-covers' },
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    imgAlt: 'Luxury living room',
  },
  {
    bg: 'from-[#103438] to-[#2D545E]',
    tag: 'Statement Wallpapers',
    heading: 'Transform Every\nWall Into Art',
    sub: 'Premium wallpapers in Indian Heritage, Chinoiserie and Tropical designs. Ships worldwide.',
    cta: { label: 'Explore Wallpapers', href: '/collections/wallpapers' },
    img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80',
    imgAlt: 'Luxury wallpaper interior',
  },
];

// ── Category Cards ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { label: 'Cushion Covers', href: '/collections/cushion-covers', emoji: '🛋️', color: '#C99665' },
  { label: 'Wallpapers', href: '/collections/wallpapers', emoji: '🖼️', color: '#2D545E' },
  { label: 'Curtains', href: '/collections/curtains', emoji: '🪟', color: '#C99665' },
  { label: 'Table Linen', href: '/collections/table-linen', emoji: '🍽️', color: '#2D545E' },
  { label: 'Wall Art', href: '/collections/wall-art', emoji: '🎨', color: '#C99665' },
  { label: 'All Collections', href: '/collections/all', emoji: '✨', color: '#103438' },
];

// ── USPs ─────────────────────────────────────────────────────────────────────
const USPS = [
  { icon: '🚚', title: 'Free Shipping', sub: 'On orders above ₹999' },
  { icon: '🎨', title: 'Handcrafted', sub: 'By skilled artisans' },
  { icon: '↩️', title: 'Easy Returns', sub: '7-day return policy' },
  { icon: '🔒', title: 'Secure Payment', sub: 'SSL encrypted checkout' },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Priya Sharma', city: 'Mumbai', text: 'The cushion covers are absolutely stunning! The embroidery work is incredible and the colors are even better in person.', rating: 5 },
  { name: 'Ananya Gupta', city: 'Delhi', text: "I ordered the Chinoiserie wallpaper and it completely transformed my living room. Delivery was fast and packaging was premium.", rating: 5 },
  { name: 'Kavitha R.', city: 'Bangalore', text: 'Been a customer for 2 years. The quality is consistently exceptional and customer service is wonderful.', rating: 5 },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);

  // Auto-advance hero
  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const { data: newArrivals = [] } = useQuery({
    queryKey: ['new-arrivals'],
    queryFn: async () => {
      const res = await productAPI.getNewArrivals();
      return res.data?.data?.products || res.data?.products || res.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: bestSellers = [] } = useQuery({
    queryKey: ['best-sellers'],
    queryFn: async () => {
      const res = await productAPI.getBestSellers();
      return res.data?.data?.products || res.data?.products || res.data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: mainCategories = [] } = useQuery({
    queryKey: ['main-categories'],
    queryFn: async () => {
      const res = await categoryAPI.getMainCategories();
      return res.data?.categories || res.data || [];
    },
    staleTime: 10 * 60 * 1000,
  });

  const EMOJI_MAP = {
    'wallpapers': '🖼️',
    'cushion-covers': '🛋️',
    'curtains': '🪟',
    'table-linen': '🍽️',
    'wall-art': '🎨',
    'decor': '🎨',
    'fabric-home': '🛋️'
  };

  const COLOR_MAP = {
    'wallpapers': '#2D545E',
    'cushion-covers': '#C99665',
    'curtains': '#C99665',
    'table-linen': '#2D545E',
    'wall-art': '#C99665',
    'decor': '#C99665',
    'fabric-home': '#2D545E'
  };

  const displayCategories = mainCategories.length > 0
    ? [
        ...mainCategories.map(cat => ({
          label: cat.name,
          href: `/collections/${cat.slug}`,
          emoji: EMOJI_MAP[cat.slug] || '✨',
          color: COLOR_MAP[cat.slug] || '#103438'
        })),
        { label: 'All Collections', href: '/collections/all', emoji: '✨', color: '#103438' }
      ]
    : CATEGORIES;

  const slide = HERO_SLIDES[heroIdx];

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={`relative bg-gradient-to-r ${slide.bg} overflow-hidden transition-all duration-700`} style={{ minHeight: 560 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
          {/* Text */}
          <div className="flex-1 text-white z-10">
            <p className="section-tag text-gold mb-4">{slide.tag}</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6 whitespace-pre-line">
              {slide.heading}
            </h1>
            <p className="text-white/75 text-base lg:text-lg max-w-md mb-8 leading-relaxed">{slide.sub}</p>
            <div className="flex flex-wrap gap-3">
              <Link to={slide.cta.href} className="btn-primary flex items-center gap-2">
                {slide.cta.label} <ArrowRight size={16} />
              </Link>
              <Link to="/collections/all" className="btn-outline text-white border-white/60 hover:bg-white hover:text-charcoal">
                View All
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative max-w-lg w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-current to-transparent z-10 opacity-30 lg:hidden" style={{ color: slide.bg.split('[')[1]?.split(']')[0] }} />
            <img
              src={slide.img}
              alt={slide.imgAlt}
              className="w-full h-80 lg:h-[440px] object-cover rounded-sm shadow-2xl"
              loading="eager"
            />
            {/* Gold border accent */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold/40 rounded-sm -z-10" />
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === heroIdx ? 'bg-gold w-6' : 'bg-white/40'}`}
            />
          ))}
        </div>

        {/* Arrow nav */}
        <button
          onClick={() => setHeroIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded-full transition-all z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setHeroIdx((i) => (i + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center rounded-full transition-all z-10"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* ── USP Strip ─────────────────────────────────────────── */}
      <section className="bg-white border-y border-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {USPS.map((u) => (
            <div key={u.title} className="flex items-center gap-3 py-2">
              <span className="text-2xl">{u.icon}</span>
              <div>
                <p className="font-medium text-charcoal text-sm">{u.title}</p>
                <p className="text-muted text-xs">{u.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Grid ─────────────────────────────────────── */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="section-tag mb-2">Explore</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {displayCategories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.href}
                className="group flex flex-col items-center gap-3 p-4 bg-white hover:bg-cream-dark transition-all rounded-sm shadow-sm hover:shadow-md"
              >
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                  style={{ background: cat.color + '18' }}
                >
                  {cat.emoji}
                </span>
                <span className="text-xs font-medium text-charcoal text-center leading-snug">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-tag mb-2">Just In</p>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <Link to="/collections/new-arrivals" className="flex items-center gap-1 text-sm font-medium text-green hover:text-green-light transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-cream-dark animate-pulse" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Banner ───────────────────────────────────── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #103438 0%, #2D545E 60%, #103438 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/batthern.png")' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-white relative z-10">
          <p className="section-tag text-gold mb-4">Curated Collection</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light mb-6">
            Embroidered Cushion Covers
          </h2>
          <p className="text-white/75 max-w-xl mx-auto mb-8 text-base leading-relaxed">
            Our signature collection of hand-embroidered cushion covers brings the richness of Indian artistry to your home. Each piece is crafted by skilled artisans using traditional techniques.
          </p>
          <Link to="/collections/cushion-covers" className="btn-primary inline-flex items-center gap-2">
            Shop Cushion Covers <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Best Sellers ──────────────────────────────────────── */}
      {bestSellers.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-tag mb-2">Customer Favourites</p>
                <h2 className="section-title">Best Sellers</h2>
              </div>
              <Link to="/collections/best-selling" className="flex items-center gap-1 text-sm font-medium text-green hover:text-green-light transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {bestSellers.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-tag mb-2">What Our Customers Say</p>
            <h2 className="section-title">Loved by Homes Across India</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-cream p-6 border border-cream-dark">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-charcoal font-serif text-lg italic leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <p className="font-medium text-charcoal text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Instagram Strip ───────────────────────────────────── */}
      <section className="py-12 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-tag mb-2">Follow Our Story</p>
          <h2 className="section-title mb-2">@Ayraj</h2>
          <p className="text-muted text-sm mb-6">Tag us in your home decor photos for a chance to be featured</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            Follow on Instagram <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}

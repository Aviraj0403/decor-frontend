import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Heart,
  Headphones,
  RotateCcw,
  Sparkles,
  Truck,
  WalletCards,
} from "lucide-react";
import heroImage from "../../image/banner/divine-products-hero-compressed.jpg";
import mobileHeroImage from "../../image/banner/divine-products-hero-mobile-compressed.jpg";
import orangeHeroDesktop from "../../image/banner/orange-spiritual-hero-desktop.jpg";
import orangeHeroMobile from "../../image/banner/orange-spiritual-hero-mobile.jpg";
import rudrakshaHeroDesktop from "../../image/banner/rudraksha-ritual-hero-desktop.jpg";
import rudrakshaHeroMobile from "../../image/banner/rudraksha-ritual-hero-mobile.jpg";
import festiveGiftHeroDesktop from "../../image/banner/festive-gift-hero-desktop.jpg";
import festiveGiftHeroMobile from "../../image/banner/festive-gift-hero-mobile.jpg";

const productBenefits = [
  { icon: BadgeCheck, title: "100% Authentic", subtitle: "& Pure" },
  { icon: Sparkles, title: "Positive Energy", subtitle: "Guaranteed" },
  { icon: Heart, title: "Made with Devotion", subtitle: "& Love" },
  { icon: Truck, title: "Fast & Secure", subtitle: "Delivery" },
];

const serviceBenefits = [
  { icon: Truck, title: "Pan India Delivery", subtitle: "Fast & Reliable" },
  { icon: WalletCards, title: "Secure Payments", subtitle: "100% Safe & Secure" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "Hassle Free Returns" },
  { icon: Headphones, title: "24/7 Support", subtitle: "We're Here to Help" },
];

const heroSlides = [
  {
    desktopImage: heroImage,
    mobileImage: mobileHeroImage,
    alt: "Sacred spiritual products",
    kicker: "Pure • Authentic • Spiritual",
    title: "Divine Products for",
    highlight: "Divine Living",
    description:
      "Discover powerful spiritual products that bring peace, positivity, and prosperity into your life.",
  },
  {
    desktopImage: orangeHeroDesktop,
    mobileImage: orangeHeroMobile,
    alt: "Orange spiritual products with diya and sacred beads",
    kicker: "Sacred • Saffron • Pure",
    title: "Awaken Your",
    highlight: "Inner Energy",
    description:
      "Shop authentic ritual essentials crafted for peaceful homes, positive energy and daily devotion.",
  },
  {
    desktopImage: rudrakshaHeroDesktop,
    mobileImage: rudrakshaHeroMobile,
    alt: "Rudraksha mala, yantra and copper ritual essentials",
    kicker: "Rudraksha • Yantra • Rituals",
    title: "Bring Sacred",
    highlight: "Power Home",
    description:
      "Choose malas, yantras and copper essentials selected for purity, intention and spiritual balance.",
  },
  {
    desktopImage: festiveGiftHeroDesktop,
    mobileImage: festiveGiftHeroMobile,
    alt: "Festive spiritual gift combos and pooja essentials",
    kicker: "Festive • Gifts • Pooja",
    title: "Blessed Gifts for",
    highlight: "Every Occasion",
    description:
      "Explore pooja essentials and gift-ready spiritual combos made for celebration, devotion and care.",
  },
];

export default function BannerSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const goToSlide = (index) => setActiveSlide(index);
  const goToPrevious = () =>
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  const goToNext = () =>
    setActiveSlide((current) => (current + 1) % heroSlides.length);

  return (
    <section className="w-full overflow-hidden bg-brand-bg text-brand-text">

      <div className="relative min-h-[600px] w-full overflow-hidden sm:min-h-[650px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[700px]">
        <picture>
          <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
          <img
            key={slide.alt}
            src={slide.mobileImage}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 md:object-right lg:object-center"
            fetchPriority={activeSlide === 0 ? "high" : "auto"}
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-brand-text/88 via-accent/54 to-brand-text/82 md:hidden" />
        <div className="absolute inset-0 hidden w-[82%] bg-gradient-to-r from-brand-text/95 via-accent/70 to-transparent md:block lg:w-[68%]" />
        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 flex min-h-[600px] flex-col items-center justify-start px-6 py-10 text-center sm:min-h-[650px] sm:pt-14 md:min-h-[600px] md:items-start md:justify-center md:px-10 md:py-5 md:text-left lg:min-h-[650px] lg:px-10 xl:min-h-[700px]">
          <div className="w-full max-w-[400px] md:max-w-[620px]">
            <p className="mb-4 inline-flex rounded-md border border-secondary-300/40 bg-brand-text/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-secondary-200 backdrop-blur md:mb-6 md:text-[11px]">
              {slide.kicker}
            </p>

            <h1 className="text-[36px] font-bold leading-tight tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.35)] sm:text-[44px] md:text-[50px] lg:text-[60px] xl:text-[68px]">
              {slide.title}
              <br />
              <span className="text-secondary-300">{slide.highlight}</span>
            </h1>

            <p className="mt-4 text-sm font-medium leading-relaxed text-white/82 md:mt-6 md:max-w-[480px] md:text-[15px] lg:text-[16px]">
              {slide.description}
            </p>

            <div className="mt-10 hidden max-w-[550px] grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-x-6 md:grid">
              {productBenefits.map(({ icon: Icon, title, subtitle }) => (
                <div key={title} className="flex flex-col items-start">
                  <Icon className="mb-2.5 h-6 w-6 text-secondary-300" strokeWidth={1.7} />
                  <p className="text-[12px] font-semibold leading-[1.4] text-white">
                    {title}
                  </p>
                  <p className="text-[11px] text-white/65">{subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center md:mt-14 md:w-auto md:justify-start md:gap-6 lg:mt-16">
              <Link
                to="/new-products"
                className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-primary-500 px-7 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-secondary hover:text-brand-text sm:w-auto md:gap-5 md:px-8"
              >
                Shop Now
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/new-products"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-white/88"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-secondary-300/50 bg-brand-text/35 shadow-sm backdrop-blur transition group-hover:border-secondary group-hover:bg-secondary/20">
                  <CirclePlay size={20} fill="#D4AF37" className="text-secondary" />
                </span>
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-brand-text/55 text-secondary-200 shadow-md backdrop-blur transition hover:bg-secondary hover:text-brand-text md:grid"
          aria-label="Previous banner"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-brand-text/55 text-secondary-200 shadow-md backdrop-blur transition hover:bg-secondary hover:text-brand-text md:grid"
          aria-label="Next banner"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-[74px] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:bottom-7 md:left-10 md:translate-x-0">
          {heroSlides.map((item, index) => (
            <button
              type="button"
              key={item.alt}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-secondary" : "w-2.5 bg-white/35 hover:bg-secondary"
                }`}
              aria-label={`Show banner ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 inset-x-0 z-20 w-full border-t border-white/15 bg-brand-text/80 backdrop-blur-md md:hidden">
          <div className="flex justify-between items-start px-2 py-3">
            {serviceBenefits.map(({ icon: Icon, title }) => (
              <div key={title} className="flex flex-col items-center justify-start shrink-0 w-1/4 px-1 text-center">
                <Icon className="mb-1 h-5 w-5 text-secondary-300" strokeWidth={1.8} />
                <p className="text-[9px] font-semibold leading-tight text-white">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SERVICE BENEFITS BAR (Desktop Only) */}
      <div className="hidden md:block border-t border-secondary-200 bg-brand-bg">
        <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-y-6 px-5 py-6 sm:px-10 lg:grid-cols-4 lg:px-12 lg:py-5">
          {serviceBenefits.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left lg:border-r lg:border-secondary-200 lg:last:border-r-0">
              <Icon className="h-7 w-7 sm:h-6 sm:w-6 shrink-0 text-accent" strokeWidth={1.8} />
              <div>
                <p className="text-[12px] sm:text-[11px] font-semibold leading-5 sm:leading-4 text-brand-text">{title}</p>
                <p className="text-[11px] sm:text-[10px] text-brand-text/65 mt-0.5 sm:mt-0">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

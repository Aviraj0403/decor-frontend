import React from "react";
import { Sparkles, Heart, Eye, Target, Compass, Award, ShieldCheck, Mail } from "lucide-react";

export default function AboutUs() {
  const heroImg = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80";
  const storyImg = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80";

  return (
    <section className="bg-white min-h-screen font-sans text-charcoal">
      {/* Sophisticated Hero Banner */}
      <div className="relative h-[460px] flex items-center justify-center overflow-hidden bg-[#103438]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
        <img
          src={heroImg}
          alt="Ayraj Luxury Interior"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 select-none"
        />
        <div className="relative max-w-4xl mx-auto text-center px-4 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-[0.25em] font-semibold text-gold">
            <Sparkles size={12} /> The Ayraj Story
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white leading-tight">
            Crafting Art For Living Spaces
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Thoughtfully curated luxury wallpapers, bespoke curtain fabrics, and handcrafted home accents designed to bring character, warmth, and stories to your sanctuary.
          </p>
        </div>
      </div>

      {/* Our Design Journey */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-sans text-muted uppercase tracking-[0.25em]">Our Journey</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-snug">
              Every Space Tells A Story
            </h2>
            <div className="h-0.5 w-16 bg-[#103438]"></div>
            <div className="space-y-4 text-sm text-muted font-sans leading-relaxed">
              <p>
                At Ayraj, we believe that a beautiful home inspires a beautiful life. Our collection of wallpapers, fabrics, and home décor accents is thoughtfully curated to bring elegance and premium aesthetic to your spaces.
              </p>
              <p>
                Every product we offer is carefully selected from traditional artisans and trusted sources, ensuring that only the finest quality and most unique designs reach your home. We are committed to preserving traditional craftsmanship while adapting to modern design aesthetics.
              </p>
              <p>
                Join us on this journey of turning houses into homes, creating spaces that truly reflect your style and personality. Because your home deserves to be your sanctuary.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative group rounded-xl overflow-hidden shadow-lg border border-cream-dark">
              <img
                src={storyImg}
                alt="Design Drafting"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="bg-cream/20 border-y border-cream-dark py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-light mb-12">Our Milestones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-cream-dark shadow-sm">
              <h3 className="font-serif text-3xl font-light text-charcoal mb-1">10K+</h3>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">Happy Homes</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-cream-dark shadow-sm">
              <h3 className="font-serif text-3xl font-light text-charcoal mb-1">500+</h3>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">Bespoke Prints</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-cream-dark shadow-sm">
              <h3 className="font-serif text-3xl font-light text-charcoal mb-1">5K+</h3>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">5-Star Reviews</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-cream-dark shadow-sm">
              <h3 className="font-serif text-3xl font-light text-charcoal mb-1">100%</h3>
              <p className="text-xs text-muted uppercase tracking-wider font-semibold">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-cream/40 p-10 rounded-xl border border-cream-dark space-y-4 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-[#103438]/10 text-[#103438] flex items-center justify-center">
            <Target size={20} />
          </div>
          <h3 className="font-serif text-xl text-charcoal">Our Mission</h3>
          <p className="text-xs text-muted leading-relaxed font-sans">
            To provide premium, custom-fit wallpapers and home decor products that empower individuals to personalize their living spaces with ease and luxury.
          </p>
        </div>

        <div className="bg-cream/40 p-10 rounded-xl border border-cream-dark space-y-4 hover:shadow-md transition">
          <div className="w-12 h-12 rounded-full bg-[#103438]/10 text-[#103438] flex items-center justify-center">
            <Compass size={20} />
          </div>
          <h3 className="font-serif text-xl text-charcoal">Our Vision</h3>
          <p className="text-xs text-muted leading-relaxed font-sans">
            To be the leading premium home decor and wallpaper destination in India, known for unmatched quality, rich contemporary designs, and an exceptional customer experience.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="border-t border-cream-dark bg-cream/10 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div>
            <p className="text-xs font-sans text-muted uppercase tracking-[0.25em] mb-2">Why Ayraj</p>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-light">Our Core Pillars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6">
              <Award size={28} className="mx-auto text-gold" />
              <h4 className="font-serif text-lg text-charcoal">Design First</h4>
              <p className="text-xs text-muted font-sans leading-relaxed">
                We treat every design project with utmost detail. A deeply personalized custom experience for every space.
              </p>
            </div>

            <div className="space-y-3 p-6">
              <ShieldCheck size={28} className="mx-auto text-gold" />
              <h4 className="font-serif text-lg text-charcoal">Ultimate Quality</h4>
              <p className="text-xs text-muted font-sans leading-relaxed">
                Only the finest quality papers and fabrics make it to our store. Durability and excellence guaranteed.
              </p>
            </div>

            <div className="space-y-3 p-6">
              <Heart size={28} className="mx-auto text-gold" />
              <h4 className="font-serif text-lg text-charcoal">Curated Selection</h4>
              <p className="text-xs text-muted font-sans leading-relaxed">
                Every single wallpaper and fabric pattern is handpicked to bring modern aesthetics and visual delight to your home.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-20 bg-[#103438] text-white">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <Mail size={32} className="mx-auto text-gold" />
          <h2 className="font-serif text-2xl md:text-3xl font-light">Join Our Design Community</h2>
          <p className="text-white/80 text-xs sm:text-sm font-sans leading-relaxed">
            Be the first to know about new collections, seasonal design trends, and exclusive offers. Elevate your space with us.
          </p>
          <div className="pt-4">
            <a 
              href="mailto:ayrajdesign@gmail.com"
              className="inline-block bg-white text-[#103438] hover:bg-cream hover:text-[#0c2629] font-sans font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-lg transition"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

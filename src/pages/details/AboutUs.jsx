// src/pages/AboutUs.jsx
import React from "react";
import { FaHeart, FaLeaf, FaGift, FaBullseye, FaUsers, FaStar, FaOm } from "react-icons/fa";
import heroImg from "../../image/divyamantra-hero.png";
import storyImg from "../../image/divyamantra-story.png";

export default function AboutUs() {
  return (
    <section className="bg-brand-bg min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative bg-primary-100">
        <img
          src={heroImg}
          alt="Divya Mantra Hero"
          className="w-full h-[500px] object-cover brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg text-white">
            About Ayraj
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md font-medium text-primary-50">
            Where Art Meets Your Living Space. Handcrafted wallpapers, textiles, and home accents designed to transform your space.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center py-20 px-4 md:px-16 max-w-7xl mx-auto">
        <div>
          <h2 className="text-4xl font-serif font-semibold text-primary-600 mb-6">Our Design Journey</h2>
          <p className="text-brand-text mb-4 leading-relaxed">
            At Ayraj, we believe that a beautiful home inspires a beautiful life. Our collection of wallpapers, fabrics, and home décor accents is thoughtfully curated to bring elegance and premium aesthetic to your spaces. Whether you are looking for statement wall art, custom-fit wallpapers, or hand-embroidered cushion covers, we have you covered.
          </p>
          <p className="text-brand-text mb-4 leading-relaxed">
            Every product we offer is carefully selected from traditional artisans and trusted sources, ensuring that only the finest quality and most unique designs reach your home. We are committed to preserving traditional craftsmanship while adapting to modern design aesthetics.
          </p>
          <p className="text-brand-text leading-relaxed">
            Join us on this journey of devotion, inner peace, and divine connection. Because your soul deserves to vibrate at its highest frequency.
          </p>
        </div>
        <img
          src={storyImg}
          alt="Our Journey"
          className="w-full rounded-2xl shadow-[0_15px_40px_-15px_rgba(230,126,34,0.3)] object-cover border border-primary-100"
        />
      </div>

      {/* Milestones / Stats */}
      <div className="bg-primary-50 py-16 text-center border-y border-primary-100">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-600 mb-10">Our Divine Reach</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-brand-bg p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-primary-100">
            <FaOm className="text-primary-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-3xl font-bold mb-2 text-brand-text">10K+</h3>
            <p className="text-primary-700 font-medium">Blessed Devotees</p>
          </div>
          <div className="bg-brand-bg p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-primary-100">
            <FaLeaf className="text-green-600 text-5xl mb-4 mx-auto" />
            <h3 className="text-3xl font-bold mb-2 text-brand-text">500+</h3>
            <p className="text-primary-700 font-medium">Sacred Items</p>
          </div>
          <div className="bg-brand-bg p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-primary-100">
            <FaStar className="text-secondary text-5xl mb-4 mx-auto" />
            <h3 className="text-3xl font-bold mb-2 text-brand-text">5K+</h3>
            <p className="text-primary-700 font-medium">5-Star Reviews</p>
          </div>
          <div className="bg-brand-bg p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-primary-100">
            <FaHeart className="text-accent text-5xl mb-4 mx-auto" />
            <h3 className="text-3xl font-bold mb-2 text-brand-text">100%</h3>
            <p className="text-primary-700 font-medium">Authenticity</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-10 py-20 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="saffron-gradient p-10 rounded-2xl shadow-xl hover:shadow-2xl transition text-center text-white">
          <FaBullseye className="text-white text-6xl mb-6 mx-auto opacity-90" />
          <h3 className="text-3xl font-serif font-bold mb-4">Our Mission</h3>
          <p className="text-primary-50 text-lg leading-relaxed">
            To provide handpicked, authentic spiritual items that empower individuals in their devotion, bringing peace and positive energy to every household.
          </p>
        </div>
        <div className="primary-gradient p-10 rounded-2xl shadow-xl hover:shadow-2xl transition text-center text-brand-text">
          <FaUsers className="text-brand-text text-6xl mb-6 mx-auto opacity-90" />
          <h3 className="text-3xl font-serif font-bold mb-4">Our Vision</h3>
          <p className="text-brand-text text-lg leading-relaxed font-medium">
            To be the most trusted spiritual destination in India, known for ultimate purity, rich heritage, and a deeply fulfilling devotee experience.
          </p>
        </div>
      </div>

      {/* Our Values */}
      <div className="text-center py-20 px-4 md:px-16 bg-primary-50">
        <h2 className="text-4xl font-serif font-bold text-primary-600 mb-12">Why Choose Ayraj</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-brand-bg rounded-2xl shadow-lg p-10 hover:-translate-y-2 transition-transform duration-300 border border-primary-100">
            <FaHeart className="text-accent text-5xl mb-6 mx-auto" />
            <h3 className="font-serif font-bold text-2xl mb-3 text-brand-text">Devotion First</h3>
            <p className="text-primary-700">
              We treat every order with reverence. A deeply personalized experience for every devotee.
            </p>
          </div>
          <div className="bg-brand-bg rounded-2xl shadow-lg p-10 hover:-translate-y-2 transition-transform duration-300 border border-primary-100">
            <FaLeaf className="text-green-600 text-5xl mb-6 mx-auto" />
            <h3 className="font-serif font-bold text-2xl mb-3 text-brand-text">Ultimate Purity</h3>
            <p className="text-primary-700">
              Only the purest materials make it to our store. Authenticity and sacredness guaranteed.
            </p>
          </div>
          <div className="bg-brand-bg rounded-2xl shadow-lg p-10 hover:-translate-y-2 transition-transform duration-300 border border-primary-100">
            <FaGift className="text-secondary text-5xl mb-6 mx-auto" />
            <h3 className="font-serif font-bold text-2xl mb-3 text-brand-text">Blessed Selection</h3>
            <p className="text-primary-700">
              Every single product is curated to bring joy, spiritual fulfillment, and divine blessings into your life.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 md:px-16 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-primary-600 mb-14 text-center">What Devotees Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-primary-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-primary-100 relative">
            <div className="absolute -top-5 left-8 text-6xl text-primary-200 font-serif">"</div>
            <p className="text-brand-text mb-6 mt-4 italic relative z-10 leading-relaxed">
              The wallpaper I ordered looks incredibly premium. The print detail is excellent and it completely transformed my room.
            </p>
            <h4 className="font-semibold text-primary-600 text-lg">– Aarti Sharma</h4>
          </div>
          <div className="bg-primary-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-primary-100 relative">
            <div className="absolute -top-5 left-8 text-6xl text-primary-200 font-serif">"</div>
            <p className="text-brand-text mb-6 mt-4 italic relative z-10 leading-relaxed">
              Fast delivery and excellent support. The cushions are stunning and perfectly crafted. Highly recommend Ayraj!
            </p>
            <h4 className="font-semibold text-primary-600 text-lg">– Rohan Desai</h4>
          </div>
          <div className="bg-primary-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-primary-100 relative">
            <div className="absolute -top-5 left-8 text-6xl text-primary-200 font-serif">"</div>
            <p className="text-brand-text mb-6 mt-4 italic relative z-10 leading-relaxed">
              The selection of pooja items is amazing! Every product feels thoughtfully chosen and deeply spiritual.
            </p>
            <h4 className="font-semibold text-primary-600 text-lg">– Kavita Iyer</h4>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-24 divine-gradient">
        <h2 className="text-4xl font-serif font-bold text-white mb-6 text-glow-primary">Join Our Spiritual Community</h2>
        <p className="text-primary-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
          Be the first to know about new sacred arrivals, auspicious day offers, and spiritual wisdom. Step closer to the divine with us.
        </p>
        <button className="bg-white text-primary-600 font-bold px-10 py-4 rounded-full hover:bg-primary-50 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl">
          Subscribe Now
        </button>
      </div>
    </section>
  );
}

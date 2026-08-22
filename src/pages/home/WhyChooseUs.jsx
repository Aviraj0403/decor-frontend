import React from "react";
import { Star, Users, ShieldCheck, Sparkles, CheckCircle2, Heart, Shield, Lock } from "lucide-react";
import leftImage from "../../image/banner/why-choose-left.png";
import rightImage from "../../image/banner/why-choose-right.png";

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-bg px-3 sm:px-6 lg:px-5 pb-10">
      <div className="mx-auto">
        {/* Top Dark Banner */}
        <div className="relative overflow-hidden rounded-t-xl bg-accent px-6 py-5 shadow-md">
          {/* Subtle background pattern or gradient can be added here if needed */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 md:flex-nowrap">
            <div className="flex items-center gap-3">
              <Users className="text-secondary-300" size={36} strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-white">10K+</h3>
                <p className="text-xs font-medium text-secondary-300">Happy Customers</p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-brand-bg/20 md:block"></div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-secondary-300" size={36} strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-white">500+</h3>
                <p className="text-xs font-medium text-secondary-300">Authentic Products</p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-brand-bg/20 md:block"></div>

            <div className="flex items-center gap-3">
              <Star className="text-secondary-300" size={36} strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-white">4.8 <Star className="inline" size={14} fill="currentColor" /></h3>
                <p className="text-xs font-medium text-secondary-300">Average Rating</p>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-brand-bg/20 md:block"></div>

            <div className="flex items-center gap-3">
              <Sparkles className="text-secondary-300" size={36} strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold text-white">100%</h3>
                <p className="text-xs font-medium text-secondary-300">Positive Energy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col overflow-hidden rounded-b-xl border border-secondary-100 bg-brand-bg shadow-sm lg:flex-row">

          {/* Left Column - Why Choose */}
          <div className="flex flex-1 flex-col-reverse lg:flex-row">
            <div className="h-64 w-full lg:h-auto lg:w-1/3">
              <img src={leftImage} alt="Pooja setup" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1 p-6 lg:p-8">
              <h2 className="mb-6 font-serif text-2xl font-bold text-[#3E2723]">Why Choose Divya Mantra?</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary text-accent">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Authentic & Pure</h4>
                    <p className="mt-1 text-sm text-gray-600">Every product is 100% authentic and made with devotion.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary text-accent">
                    <Heart size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Positive Energy</h4>
                    <p className="mt-1 text-sm text-gray-600">Designed to bring peace, positivity and prosperity.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary text-accent">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Trusted by Thousands</h4>
                    <p className="mt-1 text-sm text-gray-600">Loved and trusted by 10,000+ happy customers.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary text-accent">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Easy & Secure Shopping</h4>
                    <p className="mt-1 text-sm text-gray-600">Secure payments, fast delivery and easy returns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden w-px bg-gray-200 lg:block"></div>

          {/* Right Column - How to Use */}
          <div className="flex flex-1 flex-col lg:flex-row">
            <div className="flex-1 p-6 lg:p-8">
              <h2 className="mb-6 font-serif text-2xl font-bold text-[#3E2723]">How to Use Our Products</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary font-bold text-accent">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Cleanse Your Space</h4>
                    <p className="mt-1 text-sm text-gray-600">Light dhoop or incense to purify the environment.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary font-bold text-accent">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Set Your Intention</h4>
                    <p className="mt-1 text-sm text-gray-600">Hold the product and focus on your goal.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary font-bold text-accent">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Use Regularly</h4>
                    <p className="mt-1 text-sm text-gray-600">Use daily for best results and positive energy.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-secondary font-bold text-accent">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-[#3E2723]">Feel the Difference</h4>
                    <p className="mt-1 text-sm text-gray-600">Experience peace, prosperity and protection.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-64 w-full lg:h-auto lg:w-1/3">
              <img src={rightImage} alt="Brass plate with diya" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

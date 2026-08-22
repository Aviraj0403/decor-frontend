import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import promoBackground from "../../image/banner/divine-banner-new.png";

export default function PromoBanner() {
  return (
    <section className="bg-brand-bg px-3 py-5 sm:px-6 lg:px-5">
      <div className="relative mx-auto min-h-[270px]  overflow-hidden rounded-xl sm:min-h-[300px] lg:min-h-[340px]">
        <img
          src={promoBackground}
          alt="Divine Energy"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="lazy"
        />

        <div className="relative z-10 flex h-full min-h-[270px] flex-col items-center justify-center px-6 text-center sm:min-h-[300px] lg:min-h-[340px]">
          <h2 className="font-serif text-[28px] font-semibold leading-tight text-[#3e3424] sm:text-[38px] lg:text-[46px]">
            Bring Home<br />
            Divine Energy
          </h2>
          <p className="mt-3 text-sm font-medium text-[#4b402e] sm:text-[15px] lg:text-[16px]">
            Pure Products. Powerful Results. Positive Life.
          </p>
          <Link
            to="/new-products"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded bg-[#352f1e] px-7 text-sm font-semibold text-[#efdec1] shadow-md transition hover:-translate-y-0.5 hover:bg-[#252115]"
          >
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

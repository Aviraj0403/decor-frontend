import React from "react";
import adLogo from "../../image/featured-ad.png";
import vogueLogo from "../../image/featured-vogue.svg";
import architectsDiaryLogo from "../../image/featured-architects-diary.png";
import goodHomesLogo from "../../image/featured-goodhomes.jpg";
import elleDecorLogo from "../../image/featured-elledecor.svg";
import indiaTodayHomeLogo from "../../image/featured-india-today-home.png";

const featuredLogos = [
  { src: adLogo, alt: "Architectural Digest" },
  { src: vogueLogo, alt: "Vogue" },
  { src: architectsDiaryLogo, alt: "The Architect's Diary" },
  { src: goodHomesLogo, alt: "GoodHomes India" },
  { src: elleDecorLogo, alt: "Elle Decor" },
  { src: indiaTodayHomeLogo, alt: "India Today Home" },
];

export default function FeaturedIn() {
  return (
    <section className="bg-white px-4 pb-0 pt-6 text-center md:px-10 md:pt-9">
      <h2 className="m-0 text-[18px] font-normal leading-tight tracking-[0.02em] text-black md:text-[22px]">
        Featured in
      </h2>

      <div className="mx-auto mt-5 grid grid-cols-3 items-center justify-items-center gap-x-5 gap-y-5 px-1 md:mt-7 md:flex md:flex-wrap md:justify-center md:gap-11 md:px-20">
        {featuredLogos.map((logo) => (
          <div key={logo.alt} className="flex h-9 w-full items-center justify-center leading-none md:h-auto md:w-auto">
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-8 max-w-[88px] object-contain opacity-90 grayscale transition hover:opacity-80 hover:grayscale-0 md:h-20 md:max-h-none md:max-w-none"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <p className="mx-auto mt-7 px-1 text-[13px] font-normal leading-[1.55] text-black md:mt-12 md:px-50 md:text-[20px] md:leading-[1.45]">
        Life n Colors is a luxury home décor brand where every design begins with a story drawn from
        world art and cultural craft. Our work lives in 5-star hotels, celebrity homes, brand stores,
        and private residences across 28 countries.
      </p>
    </section>
  );
}

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
    <section className="bg-white px-5 pb-0 pt-7 text-center md:px-10 md:pt-9">
      <h2 className="m-0 text-[18px] font-normal leading-tight tracking-[0.02em] text-black md:text-[22px]">
        Featured in
      </h2>

      <div className="mx-auto mt-5 flex  flex-wrap items-center justify-center gap-6 md:mt-7 md:gap-11 px-20">
        {featuredLogos.map((logo) => (
          <div key={logo.alt} className="leading-none">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto object-contain opacity-90 grayscale transition hover:opacity-80 hover:grayscale-0 md:h-20"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <p className="mx-auto mt-12  text-[14px] font-normal leading-[1.45] text-black md:text-[20px] px-50">
        Life n Colors is a luxury home décor brand where every design begins with a story drawn from
        world art and cultural craft. Our work lives in 5-star hotels, celebrity homes, brand stores,
        and private residences across 28 countries.
      </p>
    </section>
  );
}

import React from "react";

const designCards = [
  {
    name: "Suneherii",
    desc: "Indian art traditions, modern interpretation",
    forms: "Pichwai / Madhubani / Mughal / Kalamkari",
    cta: "Explore Suneherii ->",
    href: "https://lifencolors.in/collections/suneherii-wallpaper-collection",
    image:
      "https://lifencolors.in/cdn/shop/files/Living-room-wallpaper-pink-kaleen.webp?v=1776333992&width=900",
  },
  {
    name: "Amazora",
    desc: "World art traditions, modern interpretation",
    forms: "Chinoiserie / European / Mexican / Grisaille",
    cta: "Explore Amazora ->",
    href: "https://lifencolors.in/collections/amazora-world-art-wallpapers-fabrics",
    image:
      "https://lifencolors.in/cdn/shop/files/indonesia-fresh-mural-boho-bedroom-styling.webp?v=1776935304&width=900",
  },
];

export default function DesignWorld() {
  return (
    <section className="bg-white px-5 py-10 md:py-10" aria-label="Our design world">
      <div className="mx-auto ">
        <p className="mb-2 text-center text-[13px] font-normal uppercase leading-tight tracking-[0.18em] text-[#C99665]">
          Our Design World
        </p>
        <h2 className="mb-4 text-center text-[24px] font-normal leading-tight tracking-[0.02em] text-[#103438] md:text-[28px]">
          Every Design Begins With a Story
        </h2>
        <p className="mx-auto mb-9 max-w-[680px] text-center text-[14px] font-normal leading-[1.7] text-[#2D545E] md:text-[15px]">
          A Pichwai tradition from Nathdwara. A Chinoiserie garden from Canton.
          A Madhubani rhythm from Mithila. We study the original art form, then
          reinterpret it for modern living spaces. The result is wallcoverings
          and fabrics that carry centuries of meaning in a contemporary frame.
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {designCards.map((card) => (
            <a
              key={card.name}
              href={card.href}
              className="group relative block aspect-[3/4] overflow-hidden text-white"
            >
              <img
                src={card.image}
                alt={card.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/25 to-black/5 p-6 transition duration-300 group-hover:from-black/80 md:p-7">
                <span className="mb-1 text-[20px] font-normal leading-tight tracking-[0.04em] md:text-[24px]">
                  {card.name}
                </span>
                <span className="mb-1 text-[13px] font-normal leading-normal text-white/65">
                  {card.desc}
                </span>
                <span className="mb-3 text-[11px] font-normal leading-normal text-[#C99665]">
                  {card.forms}
                </span>
                <span className="text-[11px] font-normal uppercase tracking-[0.15em] text-white/70 transition group-hover:text-white">
                  {card.cta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

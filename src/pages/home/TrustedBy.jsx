import React from "react";

const logos = [
  {
    alt: "Taj",
    src: "https://lifencolors.in/cdn/shop/files/taj_logo.png?height=50&v=1768927912",
  },
  {
    alt: "St Regis",
    src: "https://lifencolors.in/cdn/shop/files/St._Regis_Hotels_logo.svg?height=50&v=1768928523",
  },
  {
    alt: "Hyatt",
    src: "https://lifencolors.in/cdn/shop/files/Hyatt_company_logo.png?height=50&v=1768928724",
  },
  {
    alt: "Anita Dongre",
    src: "https://lifencolors.in/cdn/shop/files/Anita_Dongre_logo_new.png?height=50&v=1768927644",
  },
  {
    alt: "Oberoi Hotels and Resorts",
    src: "https://lifencolors.in/cdn/shop/files/oberoi_logo_new.png?height=50&v=1768928627",
  },
  {
    alt: "Shangri-La",
    src: "https://lifencolors.in/cdn/shop/files/Shangri-La_id1saHfGWh_1.png?height=50&v=1768927967",
  },
  {
    alt: "Abu Jani Sandeep Khosla",
    src: "https://lifencolors.in/cdn/shop/files/abu_jani2.webp?height=50&v=1717423980",
  },
  {
    alt: "Ikea",
    src: "https://lifencolors.in/cdn/shop/files/ikea-Logo.svg?height=50&v=1775310593",
  },
  {
    alt: "Punjab Grill",
    src: "https://lifencolors.in/cdn/shop/files/punjab_grill-logo.webp?height=50&v=1727096670",
  },
  {
    alt: "Starbucks",
    src: "https://lifencolors.in/cdn/shop/files/starbucks.svg?height=50&v=1775310681",
  },
  {
    alt: "Tanishq",
    src: "https://lifencolors.in/cdn/shop/files/Tanishq_Logo_svg.png?height=50&v=1771335026",
  },
  {
    alt: "Medanta",
    src: "https://lifencolors.in/cdn/shop/files/Medanta_idmbb-Q7Z0_1.svg?height=50&v=1775310748",
  },
];

export default function TrustedBy() {
  return (
    <section
      className="border-b border-[#D7D7D7] bg-white px-5 py-12"
      aria-label="Trusted by"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-8 text-center text-[22px] font-normal leading-tight tracking-[0.02em] text-black">
          Trusted by
        </h2>

        <div className="grid grid-cols-3 items-center justify-items-center gap-x-3 gap-y-2 md:grid-cols-4 md:gap-x-5 md:gap-y-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="flex w-full items-center justify-center p-3 md:p-[15px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-auto max-h-[30px] w-auto max-w-full object-contain opacity-90 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:max-h-[50px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] font-normal leading-relaxed text-[#2D545E] md:text-[11px]">
          13+ years · 17,000+ homes · 28+ countries
        </p>
      </div>
    </section>
  );
}

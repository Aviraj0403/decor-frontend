import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const footerColumns = [
  {
    title: "Life n Colors",
    links: [
      { label: "Our Story", href: "/pages/our-story" },
      { label: "Sustainability", href: "/pages/sustainability" },
      { label: "Blogs", href: "/blogs/blog" },
      {
        label: "Gurgaon Studio",
        href: "/pages/gurgaon-home-decor-wallpaper-store",
      },
      { label: "How it works?", href: "/pages/how-it-works" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Call: 093108 45706", href: "tel:+919310845706", external: true },
      {
        label: "WhatsApp: 087009 86208",
        href: "https://wa.me/918700986208?text=I%27m%20interested%20in%20your%20collection",
        external: true,
      },
      { label: "contact@lifencolors.in", href: "mailto:contact@lifencolors.in", external: true },
      { label: "Trade Program", href: "/pages/designers-outreach-program" },
      { label: "Contact Us", href: "/pages/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/pages/frequently-asked-questions" },
      { label: "Privacy Policy", href: "/pages/privacy-policy" },
      { label: "Terms & Conditions", href: "/pages/terms-conditions" },
      { label: "Return Policy", href: "/pages/return-policy" },
      {
        label: "Installation Guidelines",
        href: "/pages/wallpaper-installation-guidelines",
      },
    ],
  },
];

const paymentIcons = [
  { alt: "American Express", src: "https://lifencolors.in/cdn/shop/files/amex-logi.png?v=1769077634" },
  { alt: "PayPal", src: "https://lifencolors.in/cdn/shop/files/paypal_logo.webp?v=1769077656" },
  { alt: "Google Pay", src: "https://lifencolors.in/cdn/shop/files/google_pay_logo.webp?v=1769077703" },
  { alt: "Mastercard", src: "https://lifencolors.in/cdn/shop/files/Mastercard_logo.webp?v=1749029093" },
  { alt: "RuPay", src: "https://lifencolors.in/cdn/shop/files/RuPay-Logo.png?v=1749029146" },
];

function FooterLink({ link }) {
  const className = "font-sans text-[14px] leading-none text-[#103438] transition hover:text-[#2D545E]/70";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link to={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#D7D7D7] text-[#103438]">
      <div
        className="relative hidden md:block"
        style={{
          height: "80vh",
          minHeight: "650px",
          padding: "18px 42px 0",
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0779/4887/9170/files/lifencolors_eka-Kannan_footer_desktop__banner.webp?v=1778859517')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
        }}
      >
        <div
          className="mx-auto items-start"
          style={{
            display: "grid",
            gridTemplateColumns: "180px 245px 305px minmax(390px, 1fr)",
            columnGap: "28px",
            maxWidth: "1800px",
            width: "100%",
          }}
        >
          {footerColumns.map((column) => (
            <div key={column.title} style={{ width: column.title === "Life n Colors" ? 170 : column.title === "Connect" ? 230 : 270, flex: "0 0 auto" }}>
              <h2 className="font-sans text-[21px] font-bold leading-none text-[#103438] lg:text-[23px]">{column.title}</h2>
              <ul className="mt-6 space-y-4 lg:space-y-5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="text-center" style={{ width: 330, justifySelf: "end", marginRight: 18 }}>
            <h2 className="font-sans text-[20px] font-bold leading-none text-[#103438] lg:text-[22px]">Our Newsletter</h2>
            <p className="mx-auto mt-7 max-w-[300px] font-sans text-[13px] leading-6 text-[#103438] lg:text-[14px]">
              Stay informed about the latest
              <br />
              trends in home decor.
            </p>

            <form
              className="mx-auto mt-7 flex max-w-[330px] flex-row gap-3"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email"
                className="h-11 min-w-0 flex-1 rounded border border-[#D7D7D7] bg-white px-3 font-sans text-sm text-[#103438] outline-none placeholder:text-[#2D545E]/70 focus:border-[#C99665]"
              />
              <button
                type="submit"
                className="h-11 rounded bg-[#2D545E] px-5 font-sans text-sm font-bold uppercase text-white transition hover:bg-[#103438]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>

      <div className="relative px-5 pb-8 pt-7 md:hidden">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "url('https://cdn.shopify.com/s/files/1/0779/4887/9170/files/lifencolors_eka-Kannan_footer_desktop__banner.webp?v=1778859517')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        />
        <div className="relative space-y-7">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="font-sans text-[18px] font-bold leading-none text-[#103438]">{column.title}</h2>
              <ul className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-sans text-[18px] font-bold leading-none text-[#103438]">Our Newsletter</h2>
            <p className="mt-4 max-w-[290px] font-sans text-[13px] leading-6 text-[#103438]">
              Stay informed about the latest trends in home decor.
            </p>

            <form
              className="mt-5 flex max-w-[360px] flex-col gap-3"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email"
                className="h-11 w-full rounded border border-[#D7D7D7] bg-white px-3 font-sans text-sm text-[#103438] outline-none placeholder:text-[#2D545E]/70 focus:border-[#C99665]"
              />
              <button
                type="submit"
                className="h-11 rounded bg-[#2D545E] px-5 font-sans text-sm font-bold uppercase text-white transition active:scale-[0.99]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#C99665]/35 bg-[#E2B385] px-4 py-7 sm:px-6 lg:px-4">
        <div className="mx-auto flex max-w-[1880px] flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="font-sans text-[15px] text-[#103438]">@2026, Life n Colors</p>
          <div className="flex items-center gap-3">
            {paymentIcons.map((icon) => (
              <img key={icon.alt} src={icon.src} alt={icon.alt} className="h-8 w-auto bg-white object-contain" />
            ))}
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/918700986208"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-[136px] right-4 z-[85] grid h-11 w-11 place-items-center rounded-full bg-[#2D545E] text-white shadow-lg transition hover:scale-105 md:bottom-[92px] md:right-6 md:h-[54px] md:w-[54px]"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="h-[23px] w-[23px] md:h-7 md:w-7" />
      </a>
      <a
        href="tel:+919310845706"
        className="fixed bottom-[84px] right-4 z-[85] grid h-11 w-11 place-items-center rounded-full bg-[#103438] text-white shadow-lg transition hover:scale-105 md:bottom-6 md:right-6 md:h-[56px] md:w-[56px]"
        aria-label="Call"
      >
        <Phone className="h-[21px] w-[21px] md:h-[25px] md:w-[25px]" fill="currentColor" />
      </a>
    </footer>
  );
}

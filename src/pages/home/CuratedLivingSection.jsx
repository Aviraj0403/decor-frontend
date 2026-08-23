import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const curatedSlides = [
  {
    title: "Syntax of Spring",
    href: "/collections/best-selling-wallpapers",
    poster: "https://lifencolors.in/cdn/shop/files/UGC_video_thumbnail_1.webp?v=1769065548&width=700",
    video:
      "https://lifencolors.in/cdn/shop/videos/c/vp/f790becd87214e54893d4409dc139c12/f790becd87214e54893d4409dc139c12.HD-1080p-2.5Mbps-67491933.mp4?v=0",
  },
  {
    title: "Heritage Home",
    href: "/collections/best-selling-wallpapers",
    poster: "https://lifencolors.in/cdn/shop/files/UGC_vidya_video_thumbnail.webp?v=1769066083&width=700",
    video:
      "https://lifencolors.in/cdn/shop/videos/c/vp/bcef0ad71b384645b1422e0ad153b06f/bcef0ad71b384645b1422e0ad153b06f.HD-1080p-2.5Mbps-67492870.mp4?v=0",
  },
  {
    title: "Tropical Bedroom",
    href: "/collections/best-selling-wallpapers",
    poster:
      "https://lifencolors.in/cdn/shop/files/preview_images/f4f7e5a30c1d4bc89be28ee76c95b7fc.thumbnail.0000000000_400x.jpg?v=1754040740",
    video:
      "https://lifencolors.in/cdn/shop/videos/c/vp/f4f7e5a30c1d4bc89be28ee76c95b7fc/f4f7e5a30c1d4bc89be28ee76c95b7fc.HD-1080p-2.5Mbps-53654747.mp4?v=0",
  },
  {
    title: "Kusum Corner",
    href: "/collections/best-selling-wallpapers",
    poster:
      "https://lifencolors.in/cdn/shop/files/preview_images/4ff06d0502e0424f8fc3a74a46b41976.thumbnail.0000000000_400x.jpg?v=1769143317",
    video:
      "https://lifencolors.in/cdn/shop/videos/c/vp/4ff06d0502e0424f8fc3a74a46b41976/4ff06d0502e0424f8fc3a74a46b41976.HD-1080p-3.3Mbps-67575660.mp4?v=0",
  },
  {
    title: "Chinoiserie Wall",
    href: "/collections/best-selling-wallpapers",
    poster: "https://lifencolors.in/cdn/shop/files/sakshi_malik_UGC_video_thumbnail.webp?v=1769065771&width=700",
    video:
      "https://lifencolors.in/cdn/shop/videos/c/vp/81fb87bc979946b4a860c85bf2d3cea9/81fb87bc979946b4a860c85bf2d3cea9.SD-480p-0.9Mbps-67492415.mp4?v=0",
  },
  {
    title: "European Detail",
    href: "/collections/best-selling-wallpapers",
    poster:
      "https://lifencolors.in/cdn/shop/files/preview_images/4dea254cf0974fc3b86faf42981a2b94.thumbnail.0000000000_400x.jpg?v=1761308213",
    video:
      "https://lifencolors.in/cdn/shop/videos/c/vp/4dea254cf0974fc3b86faf42981a2b94/4dea254cf0974fc3b86faf42981a2b94.HD-1080p-7.2Mbps-60798725.mp4?v=0",
  },
  {
    title: "Real Home Story",
    href: "/collections/best-selling-wallpapers",
    poster:
      "https://lifencolors.in/cdn/shop/files/preview_images/3a082f6d84584c1a8360fc65163a807c.thumbnail.0000000000_400x.jpg?v=1756884060",
    video:
      "https://lifencolors.in/cdn/shop/videos/c/vp/3a082f6d84584c1a8360fc65163a807c/3a082f6d84584c1a8360fc65163a807c.HD-1080p-2.5Mbps-56705795.mp4?v=0",
  },
];

export default function CuratedLivingSection() {
  const carouselRef = React.useRef(null);

  const scroll = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: direction === "left" ? -carousel.offsetWidth * 0.8 : carousel.offsetWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-white px-2 pb-12 pt-1 sm:px-4 sm:pb-16 lg:px-0">
      <div className="mx-auto max-w-[1800px]">
        <div className="text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-[#b6834a]">In Real Homes</p>
          <h2 className="mt-4 font-serif text-[30px] font-normal leading-tight text-black sm:text-[38px]">
            Curated Living
          </h2>
          <p className="mt-3 font-sans text-[13px] leading-6 text-[#2f3440] sm:text-[15px]">
            Real spaces, real stories, beautifully finished with Life n Colors.
          </p>
        </div>

        <div className="relative mt-11">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-black shadow-sm backdrop-blur transition hover:bg-white sm:left-6"
            aria-label="Previous curated living slide"
          >
            <ChevronLeft size={22} strokeWidth={1.4} />
          </button>

          <div
            ref={carouselRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-2 pb-1 sm:px-5 lg:px-8"
          >
            {curatedSlides.map((slide) => (
              <a
                key={slide.video}
                href={slide.href}
                className="group relative block aspect-[0.56/1] w-[74vw] shrink-0 snap-start overflow-hidden rounded-[3px] bg-[#ece7df] sm:w-[38vw] md:w-[31vw] lg:w-[18vw]"
                aria-label={slide.title}
              >
                <video
                  className="h-full w-full object-cover"
                  poster={slide.poster}
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/36 via-transparent to-transparent opacity-80" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/70 text-black shadow-sm backdrop-blur transition hover:bg-white sm:right-6"
            aria-label="Next curated living slide"
          >
            <ChevronRight size={22} strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </section>
  );
}

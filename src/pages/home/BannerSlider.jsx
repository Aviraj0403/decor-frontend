import React from "react";
import { Link } from "react-router-dom";
import desktopPoster from "../../image/banner/lifencolors-hero-poster-desktop.png";
import mobilePoster from "../../image/banner/lifencolors-hero-poster-mobile.png";

const siteLogo = "/logo.png";

const desktopHeroVideo =
  "https://lifencolors.in/cdn/shop/videos/c/vp/caa9f6ae0e984b128b25064ef69fb6c6/caa9f6ae0e984b128b25064ef69fb6c6.HD-720p-3.0Mbps-90724956.mp4?v=0";
const mobileHeroVideo =
  "https://lifencolors.in/cdn/shop/videos/c/vp/525a164b30264df58292fe17b635893b/525a164b30264df58292fe17b635893b.SD-480p-1.0Mbps-90798397.mp4?v=0";

export default function BannerSlider() {
  return (
    <section className="w-full overflow-hidden bg-white md:bg-white">
      <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-video">
        <video
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
          src={desktopHeroVideo}
          poster={desktopPoster}
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          aria-label="Life n Colors and Prasanaakshi brand film"
        />
        <video
          className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] object-cover object-center md:hidden"
          src={mobileHeroVideo}
          poster={mobilePoster}
          autoPlay
          muted
          loop
          playsInline
          disableRemotePlayback
          aria-label="Life n Colors and Prasanaakshi brand film"
        />

        <div className="absolute inset-0 bg-[#C99665] opacity-0" />

        <div className="absolute inset-0 z-10 grid grid-cols-2">
          <div className="flex flex-col items-center justify-center px-2 text-center">
            <Link to="/new-products" aria-label="Explore Life n Colors">
              <img
                src={siteLogo}
                alt="Life n Colors"
                className="h-auto w-[55px] md:w-[110px]"
              />
            </Link>
            <Link
              to="/new-products"
              className="mt-1.5 inline-flex min-h-0 items-center justify-center bg-[#103438] px-[5px] py-0.5 text-[5px] font-bold uppercase leading-[1.2] tracking-[0.02em] text-white transition hover:bg-[#2D545E] md:mt-3 md:px-3.5 md:py-1.5 md:text-[10px]"
            >
              Explore Life N colors
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center px-2 text-center">
            <Link to="/new-products" aria-label="Explore Prasanaakshi">
              <img
                src={siteLogo}
                alt="Prasanaakshi"
                className="h-auto w-[55px] md:w-[110px]"
              />
            </Link>
            <Link
              to="/new-products"
              className="mt-1.5 inline-flex min-h-0 items-center justify-center bg-[#103438] px-[5px] py-0.5 text-[5px] font-bold uppercase leading-[1.2] tracking-[0.02em] text-white transition hover:bg-[#2D545E] md:mt-3 md:px-3.5 md:py-1.5 md:text-[10px]"
            >
              Explore Prasanaakshi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

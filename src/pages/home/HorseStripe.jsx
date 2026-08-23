import React from "react";

const horseVideo =
  "https://cdn.shopify.com/videos/c/o/v/431da8d6ce1644589e0d206dbd35e7d0.mp4";

export default function HorseStripe() {
  return (
    <section className="flex h-[105px] w-full items-center justify-center bg-white md:h-[170px]">
      <video
        className="h-[96px] w-[150px] object-contain md:h-[150px]"
        src={horseVideo}
        autoPlay
        muted
        loop
        playsInline
        disableRemotePlayback
        aria-label="Animated horse mascot"
      />
    </section>
  );
}

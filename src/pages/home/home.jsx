import React from "react";
import { useLocation } from "react-router-dom";
import BannerSlider from "./BannerSlider";
import CategorySlider from "./CategorySlider";
import BestsellerSection from "./BestsellerSection";
import PromoBanner from "./PromoBanner";
import HomeNewArrivals from "../HomeNewArrivals";
//import MobileCategorySection from "../category/MobileCategorySection";
import BeautyBanner from "./BeautyDiscountBanner";
import ComboSection from "./ComboSection";
import BeautyHighlightSection from "./BeautyHighlightSection";
import CosmeticTestimonials from "./CosmeticTestimonials";
import WhyChooseUs from "./WhyChooseUs";
// import FloatingNewArrival from "./FloatingNewArrival";



function Home() {
  const location = useLocation();

  React.useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* <FloatingNewArrival /> */}
      {/* <MobileCategorySection /> */}
      <div className="max-w-[1920px] mx-auto shadow-sm">
        <BannerSlider />
      </div>
      <div className="px-0 sm:px-4 md:px-8 space-y-4 md:space-y-8 pb-12">
        <CategorySlider />
        <ComboSection />
        <BestsellerSection />
        <HomeNewArrivals />
        <PromoBanner />
        <BeautyBanner />
        <BeautyHighlightSection />
        <WhyChooseUs />
        <CosmeticTestimonials />
        {/* other homepage sections */}
      </div>
    </div>
  );
}

export default Home;

import React from "react";
import { useLocation } from "react-router-dom";
import BannerSlider from "./BannerSlider";
import HorseStripe from "./HorseStripe";
import FeaturedIn from "./FeaturedIn";
import CategorySlider from "./CategorySlider";
import LookbookPreview from "./LookbookPreview";
import DesignWorld from "./DesignWorld";
import TrustedBy from "./TrustedBy";
import BestsellerSection from "./BestsellerSection";
import PromoBanner from "./PromoBanner";
import HomeNewArrivals from "../HomeNewArrivals";
//import MobileCategorySection from "../category/MobileCategorySection";
import WhyChooseUs from "./WhyChooseUs";

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
        <HorseStripe />
        <FeaturedIn />
      </div>
      <div className="px-0 sm:px-4 md:px-8 space-y-4 md:space-y-8 pb-12">
        <CategorySlider />
        <LookbookPreview />
        <DesignWorld />
        <TrustedBy />
        <BestsellerSection />
        <HomeNewArrivals />
        <PromoBanner />
        <WhyChooseUs />
        {/* other homepage sections */}
      </div>
    </div>
  );
}

export default Home;

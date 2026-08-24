import React from "react";
import { bestSellingProducts, WallpaperCollectionPage } from "./BestSellingWallpapers.jsx";

const latestProductOrder = [
  "petals-of-persia-customised-wallpaper",
  "munnar-wallpaper-vintage-indian-tea-garden-mural",
  "the-syntax-of-spring-customised-wallpaper",
  "gopuram-vatika-wallpaper-in-indian-style-customised",
  "jade-blossom-chinoiserie-wallpaper-dusty-pink",
  "pastel-paradise-abstract-pattern-wallpaper-for-room-pink",
  "twilight-haven-vintage-european-style-wallpaper-smoky-olive-color",
  "plum-blossom-chinoiserie-cream-color-wallpaper-for-rooms",
  "rang-rali-indian-wallpaper-inspired-by-fabrics-of-india",
  "sayonee-wallpaper-for-walls",
  "aalishan-exquisite-indian-carpet-design-wallpaper",
  "worth-it-premium-abstract-pattern-wallpaper-design-for-walls-pink",
];

const latestProducts = latestProductOrder
  .map((slug) => bestSellingProducts.find((product) => product.slug === slug))
  .filter(Boolean)
  .concat(
    bestSellingProducts.filter((product) => !latestProductOrder.includes(product.slug)),
  );

export default function NewArrivalsWallpapers() {
  return (
    <WallpaperCollectionPage
      title="New Designer Wallpapers"
      description="Freshly launched wallpapers inspired by Indian and world art - new murals, refined motifs, and modern room-ready designs for homes that want something distinctive."
      products={latestProducts}
    />
  );
}

import React from "react";
import { bestSellingProducts, WallpaperCollectionPage } from "./BestSellingWallpapers.jsx";

const shopAllProducts = [
  ...bestSellingProducts.slice(5),
  ...bestSellingProducts.slice(0, 5),
];

export default function ShopAllWallpapers() {
  return (
    <WallpaperCollectionPage
      title="Shop Premium Wallpapers Online"
      description="Explore premium wallpapers for bedrooms, living rooms, feature walls, ceilings, nurseries, and commercial spaces - all in one curated Life n Colors inspired collection."
      products={shopAllProducts}
    />
  );
}

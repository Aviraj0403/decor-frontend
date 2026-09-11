import React from "react";
import { useLocation } from "react-router-dom";
import { WallpaperCollectionPage } from "./BestSellingWallpapers.jsx";

export default function WallpaperCollectionLanding() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(-1);

  return (
    <WallpaperCollectionPage showFilters={false} />
  );
}

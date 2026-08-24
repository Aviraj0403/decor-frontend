import React from "react";
import { useLocation } from "react-router-dom";
import { bestSellingProducts, WallpaperCollectionPage } from "./BestSellingWallpapers.jsx";

const collectionPages = {
  "indian-traditional-wallpapers": {
    title: "Indian Heritage Wallpapers",
    description:
      "Indian inspired wallpapers rooted in palaces, gardens, textiles, folk art, and heritage motifs - designed for homes that want warmth, craft, and story.",
  },
  "chinoiserie-room-wallpapers": {
    title: "Chinoiserie Room Wallpapers",
    description:
      "Elegant chinoiserie wallpapers with painterly florals, birds, gardens, and serene scenic details for bedrooms, living rooms, and feature walls.",
  },
  "tropical-theme-room-wallpapers": {
    title: "Tropical Theme Wallpapers",
    description:
      "Tropical wallpaper designs with palms, foliage, forest murals, and soft nature scenes for calm, layered, resort-like interiors.",
  },
  "amazora-world-art-wallpapers-fabrics": {
    title: "European & World Art Wallpapers",
    description:
      "World art inspired wallpapers with European landscapes, vintage murals, and refined decorative compositions for statement interiors.",
  },
  "abstract-wallpapers-for-room": {
    title: "Modern & Abstract Wallpapers",
    description:
      "Modern abstract wallpapers with expressive patterns, painterly movement, and contemporary color stories for clean, creative spaces.",
  },
  "pichwai-theme-wallpapers": {
    title: "Pichwai Theme Wallpapers",
    description:
      "Pichwai inspired wallpapers featuring devotional art, lotus gardens, cows, trees of life, and traditional Indian storytelling.",
  },
  "bedroom-wallpaper-collection": {
    title: "Bedroom Wallpaper Collection",
    description:
      "Bedroom wallpapers curated for restful spaces - soft chinoiserie, scenic murals, tropical greens, and heritage patterns with a calm finish.",
  },
  "living-room-wallpaper-collection": {
    title: "Living Room Wallpaper Collection",
    description:
      "Living room wallpapers made for feature walls, lounges, and open spaces - balanced between statement design and everyday elegance.",
  },
  "kids-room-wallpapers": {
    title: "Kids & Nursery Wallpapers",
    description:
      "Playful, gentle wallpapers for kids rooms and nurseries with charming illustrations, soft colors, and imagination-friendly patterns.",
  },
  "pooja-room-wallpapers": {
    title: "Pooja Room Wallpapers",
    description:
      "Pooja room wallpapers inspired by Indian art, devotional motifs, serene landscapes, and warm heritage details.",
  },
  "commercial-areas-wallpapers": {
    title: "Commercial Area Wallpapers",
    description:
      "Wallpapers for studios, restaurants, offices, boutiques, and hospitality spaces - distinctive designs made for high-impact interiors.",
  },
  "ceiling-wallpapers": {
    title: "Ceiling Wallpapers",
    description:
      "Ceiling wallpaper ideas with ornamental, scenic, and patterned designs to create a complete room experience from every angle.",
  },
  "powder-room-wallpapers": {
    title: "Powder Room Wallpapers",
    description:
      "Powder room wallpapers with rich detail, compact-space drama, and elegant patterns that make small rooms feel memorable.",
  },
  "wardrobe-wallpapers": {
    title: "Wardrobe Wallpapers",
    description:
      "Wardrobe wallpaper designs for doors, panels, and storage surfaces - a simple way to add artful detail to everyday furniture.",
  },
  "2026-wallpaper-collection": {
    title: "The Life n Colors 2026 Edit",
    description:
      "A fresh 2026 edit of wallpaper designs with new classics, bolder moods, and refined room-ready artworks.",
  },
  "suneherii-wallpaper-collection": {
    title: "Suneherii Wallpaper Collection",
    description:
      "Warm, festive, and heritage-led wallpapers with golden tones, Indian artistry, and rich decorative presence.",
  },
  "neelvana-collection-by-life-n-colors-shabnam-gupta": {
    title: "Neelvana Collection",
    description:
      "A composed collection of serene wallpapers with nature, blue tones, layered foliage, and artistic roomscapes.",
  },
  "atarangi-affordable-wallpaper-collection": {
    title: "Atarangi Wallpaper Collection",
    description:
      "Affordable wallpaper designs with color, pattern, and personality for expressive everyday homes.",
  },
};

export default function WallpaperCollectionLanding() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(-1);
  const config = collectionPages[slug] || {
    title: "Wallpaper Collection",
    description:
      "Explore premium wallpapers inspired by Indian heritage, world art, tropical murals, chinoiserie gardens, and modern room design.",
  };

  return (
    <WallpaperCollectionPage
      title={config.title}
      description={config.description}
      products={bestSellingProducts}
      showFilters={false}
    />
  );
}

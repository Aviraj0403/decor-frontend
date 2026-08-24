import React from "react";
import { useLocation } from "react-router-dom";
import { WallpaperCollectionPage } from "./BestSellingWallpapers.jsx";
import curtainsImage from "../../image/category-curtains.webp";
import upholsteryImage from "../../image/category-upholstery-fabrics.webp";
import cushionsImage from "../../image/category-cushion-covers.webp";
import wallArtImage from "../../image/category-wall-arts.webp";
import tiebacksImage from "../../image/category-curtain-tiebacks.webp";

const collectionPages = {
  "ready-made-curtains": {
    title: "Ready-Made Designer Curtains",
    description:
      "Soft, finished curtains for bedrooms, living rooms, and dining spaces - crafted to frame light, add texture, and complete the room.",
    focus: "curtains",
  },
  "sofa-and-chair-fabric": {
    title: "Sofa & Chair Upholstery Fabrics",
    description:
      "Designer upholstery fabrics in rich textures, calm neutrals, and art-led patterns for sofas, chairs, benches, and custom seating.",
    focus: "upholstery",
  },
  "cushion-covers": {
    title: "Designer Cushion Covers",
    description:
      "Handcrafted cushion covers that bring color, embroidery, pattern, and finishing detail into everyday living spaces.",
    focus: "cushions",
  },
  "tabler-runners-mats": {
    title: "Designer Table Linen",
    description:
      "Table runners, mats, and dining textiles designed for warm hosting, festive tables, and polished everyday meals.",
    focus: "table",
  },
  "stitched-stories-hand-embroidered-wall-art": {
    title: "Hand-Embroidered Wall Art",
    description:
      "Textile wall art with hand-finished embroidery, detailed storytelling, and a soft crafted presence for special walls.",
    focus: "embroidered-art",
  },
  "wallart-posters": {
    title: "Printed Wall Arts",
    description:
      "Art-led wall pieces and prints designed to bring history, pattern, and color into modern homes with ease.",
    focus: "printed-art",
  },
  "beautiful-curtain-tie-backs": {
    title: "Handcrafted Curtain Tiebacks",
    description:
      "Curtain tiebacks and holdbacks made to finish drapes beautifully with texture, craft, and quiet decorative detail.",
    focus: "tiebacks",
  },
};

const fabricHomeProducts = [
  {
    title: "nayab readymade curtain in mughal floral",
    slug: "nayab-readymade-curtain-in-mughal-floral",
    price: "12,000",
    tag: "curtains",
    image: curtainsImage,
  },
  {
    title: "kashmiriyat readymade curtain in sage green",
    slug: "kashmiriyat-readymade-curtain-in-sage-green",
    price: "12,000",
    tag: "curtains",
    image: curtainsImage,
  },
  {
    title: "european tapestry readymade curtain",
    slug: "european-tapestry-readymade-curtain",
    price: "12,000",
    tag: "curtains",
    image: curtainsImage,
  },
  {
    title: "velvet upholstery fabric for sofa and chair",
    slug: "velvet-upholstery-fabric-for-sofa-and-chair",
    price: "950",
    tag: "upholstery",
    image: upholsteryImage,
  },
  {
    title: "linen blend upholstery fabric",
    slug: "linen-blend-upholstery-fabric",
    price: "850",
    tag: "upholstery",
    image: upholsteryImage,
  },
  {
    title: "zayan hand embroidered cushion cover",
    slug: "zayan-hand-embroidered-cushion-cover",
    price: "2,500",
    tag: "cushions",
    image: cushionsImage,
  },
  {
    title: "mughal garden cushion cover",
    slug: "mughal-garden-cushion-cover",
    price: "2,500",
    tag: "cushions",
    image: cushionsImage,
  },
  {
    title: "indian table runner and mat set",
    slug: "indian-table-runner-and-mat-set",
    price: "3,500",
    tag: "table",
    image: cushionsImage,
  },
  {
    title: "stitched stories hand embroidered wall art",
    slug: "stitched-stories-hand-embroidered-wall-art",
    price: "8,500",
    tag: "embroidered-art",
    image: wallArtImage,
  },
  {
    title: "pichwai inspired embroidered wall panel",
    slug: "pichwai-inspired-embroidered-wall-panel",
    price: "8,500",
    tag: "embroidered-art",
    image: wallArtImage,
  },
  {
    title: "heritage printed wall art poster",
    slug: "heritage-printed-wall-art-poster",
    price: "3,000",
    tag: "printed-art",
    image: wallArtImage,
  },
  {
    title: "botanical printed wall art",
    slug: "botanical-printed-wall-art",
    price: "3,000",
    tag: "printed-art",
    image: wallArtImage,
  },
  {
    title: "handcrafted curtain tieback pair",
    slug: "handcrafted-curtain-tieback-pair",
    price: "1,500",
    tag: "tiebacks",
    image: tiebacksImage,
  },
  {
    title: "decorative tassel curtain tieback",
    slug: "decorative-tassel-curtain-tieback",
    price: "1,500",
    tag: "tiebacks",
    image: tiebacksImage,
  },
];

function getProducts(focus) {
  if (!focus) return fabricHomeProducts;

  const matchingProducts = fabricHomeProducts.filter((product) => product.tag === focus);
  const remainingProducts = fabricHomeProducts.filter((product) => product.tag !== focus);

  return matchingProducts.length > 0 ? [...matchingProducts, ...remainingProducts] : fabricHomeProducts;
}

export default function FabricHomeCollectionLanding() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(-1);
  const config = collectionPages[slug] || {
    title: "Fabric & Home Collection",
    description:
      "Explore curtains, upholstery fabrics, cushion covers, table linen, wall art, and finishing accents for layered homes.",
  };

  return (
    <WallpaperCollectionPage
      title={config.title}
      description={config.description}
      products={getProducts(config.focus)}
      showFilters={false}
    />
  );
}

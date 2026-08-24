import React from "react";
import { Link } from "react-router-dom";
import wallpaperImage from "../../image/category-customised-wallpapers.webp";
import upholsteryImage from "../../image/category-upholstery-fabrics.webp";
import cushionImage from "../../image/category-cushion-covers.webp";
import curtainsImage from "../../image/category-curtains.webp";
import wallArtsImage from "../../image/category-wall-arts.webp";
import tiebacksImage from "../../image/category-curtain-tiebacks.webp";

const categories = [
  {
    title: "Customised Wallpapers",
    image: wallpaperImage,
    to: "/new-products",
  },
  {
    title: "Upholstery Fabrics",
    image: upholsteryImage,
    to: "/new-products",
  },
  {
    title: "Cushion Covers",
    image: cushionImage,
    to: "/new-products",
  },
  {
    title: "Curtains",
    image: curtainsImage,
    to: "/new-products",
  },
  {
    title: "Wall Arts",
    image: wallArtsImage,
    to: "/new-products",
  },
  {
    title: "Curtain Tiebacks",
    image: tiebacksImage,
    to: "/new-products",
  },
];

export default function CategorySlider() {
  return (
    <section className="w-full bg-white px-4 py-9 md:px-10 lg:px-[72px]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 xl:gap-9">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.to}
            className="group block text-black no-underline"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-[#D7D7D7]">
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <h3 className="mt-2.5 text-[15px] font-bold uppercase leading-snug tracking-[0.04em] text-black md:mt-3 md:text-[18px]">
              {category.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

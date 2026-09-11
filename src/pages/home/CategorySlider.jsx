import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMenuCategories } from "../../services/categoryApi";

import wallpaperImage from "../../image/category-customised-wallpapers.webp";
import upholsteryImage from "../../image/category-upholstery-fabrics.webp";
import cushionImage from "../../image/category-cushion-covers.webp";
import curtainsImage from "../../image/category-curtains.webp";
import wallArtsImage from "../../image/category-wall-arts.webp";
import tiebacksImage from "../../image/category-curtain-tiebacks.webp";

const fallbackImageMap = {
  "wallpapers": wallpaperImage,
  "fabric--home": upholsteryImage,
  "decor": wallArtsImage,
  "upholstery-fabrics": upholsteryImage,
  "cushion-covers": cushionImage,
  "curtains": curtainsImage,
  "printed-wall-arts": wallArtsImage,
  "embroidered-wall-arts": wallArtsImage,
  "curtain-tiebacks": tiebacksImage,
};

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const data = await getMenuCategories();
        if (data && data.length > 0) {
          const list = [];
          data.forEach((mainCat) => {
            // Include Main category if needed
            list.push({
              title: mainCat.name,
              slug: mainCat.slug,
              image: mainCat.image?.[0] || fallbackImageMap[mainCat.slug] || wallpaperImage,
              to: `/collections/${mainCat.slug}`
            });

            // Include subcategories dynamically
            if (mainCat.subcategories && mainCat.subcategories.length > 0) {
              mainCat.subcategories.forEach((sub) => {
                list.push({
                  title: sub.name,
                  slug: sub.slug,
                  image: sub.image?.[0] || fallbackImageMap[sub.slug] || fallbackImageMap[mainCat.slug] || wallpaperImage,
                  to: `/collections/${sub.slug}`
                });
              });
            }
          });
          setCategories(list);
        }
      } catch (err) {
        console.error("Error loading categories dynamically:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white px-4 py-9 md:px-10 lg:px-[72px]">
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-[#2D545E] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white px-4 py-9 md:px-10 lg:px-[72px]">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 xl:gap-9">
        {categories.map((category) => (
          <Link
            key={category.slug + category.title}
            to={category.to}
            className="group block text-black no-underline"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-[#D7D7D7] rounded-sm">
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

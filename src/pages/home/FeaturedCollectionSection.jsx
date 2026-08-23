import React from "react";
import { Link, useNavigate } from "react-router-dom";

const tabs = [
  { id: "bestsellers", label: "Bestsellers", viewAll: "/collections/best-selling-wallpapers" },
  { id: "new-arrivals", label: "New Arrivals", viewAll: "/new-products" },
];

const collectionProducts = {
  bestsellers: [
    {
      name: "The Syntax Of Spring Customised Wallpaper",
      image:
        "https://lifencolors.in/cdn/shop/files/the-syntax-of-spring-heritage-wallpaper-dining-room.webp?v=1783085459&width=900",
      slug: "the-syntax-of-spring-customised-wallpaper",
    },
    {
      name: "Malabar Kerela Wallpaper, Customised",
      image:
        "https://lifencolors.in/cdn/shop/files/malabar-kerala-backwaters-mural-living-room.webp?v=1776238197&width=900",
      slug: "malabar-kerela-themed-wallpaper",
    },
    {
      name: "Mint Blossom Vintage Chinoiserie Wallpaper, Light Blue",
      image:
        "https://lifencolors.in/cdn/shop/files/mint-blossom-vintage-chinoiserie-light-blue-wallpaper-full.webp?v=1776685729&width=900",
      slug: "mint-blossom-light-blue-chinoiserie-wallpaper",
    },
    {
      name: "Kusum Indian Theme Wallpaper",
      image:
        "https://lifencolors.in/cdn/shop/files/kusum-mughal-floral-striped-wallpaper-living-room.webp?v=1773911217&width=900",
      slug: "kusum-indian-floral-jharokha-and-stripes-design-wallpaper",
    },
  ],
  "new-arrivals": [
    {
      name: "The Rose Heritage, English Floral Wallpaper",
      image: "https://lifencolors.in/cdn/shop/files/1gtycopy.webp?v=1782126178&width=900",
      slug: "the-rose-heritage-english-floral-wallpaper",
    },
    {
      name: "Enchanted Grove Customised Wallpaper",
      image:
        "https://lifencolors.in/cdn/shop/files/enchanted-grove-customised-wallpaper-closeup-curlew-bird-detail.webp?v=1787120422&width=900",
      slug: "enchanted-grove-customised-wallpaper",
    },
    {
      name: "Alhambra's Whisper Customised Wallpaper",
      image:
        "https://lifencolors.in/cdn/shop/files/alhambras-whisper-neutral-scenic-wallpaper-living-room..webp?v=1783405613&width=900",
      slug: "alhambra-s-whisper-customised-wallpaper",
    },
    {
      name: "Petals Of Persia Customised Wallpaper",
      image:
        "https://lifencolors.in/cdn/shop/files/petals-of-persia-heritage-wallpaper-dining-room.webp?v=1783063394&width=900",
      slug: "petals-of-persia-customised-wallpaper",
    },
  ],
};

function ProductCard({ product }) {
  const navigate = useNavigate();
  const href = product?.slug ? `/product/${product.slug}` : "/new-products";

  return (
    <article className="group min-w-0">
      <button
        type="button"
        onClick={() => navigate(href)}
        className="block aspect-[1/1] w-full overflow-hidden bg-[#f6f2eb]"
        aria-label={product?.name || "View product"}
      >
        <img
          src={product.image}
          alt={product?.name || "Featured product"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </button>

      <button type="button" onClick={() => navigate(href)} className="mt-3 block w-full text-left">
        <h3 className="font-sans text-[13px] font-normal leading-5 text-[#1d1d1d] transition group-hover:text-primary-700 sm:text-[15px]">
          {product?.name}
        </h3>
      </button>

      <p className="mt-1 font-sans text-[11px] leading-4 text-[#8f8f8f] sm:text-xs">
        Starts from {"\u20b9"}7,500
      </p>
    </article>
  );
}

export default function FeaturedCollectionSection() {
  const [activeTab, setActiveTab] = React.useState("bestsellers");
  const activeConfig = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const products = collectionProducts[activeTab] || [];

  return (
    <section className="bg-white px-4 pb-12 pt-7 sm:px-6 sm:pb-16 sm:pt-10 lg:px-9">
      <div className="mx-auto max-w-[1680px]">
        <h2 className="text-center font-serif text-[28px] font-normal leading-tight tracking-normal text-black sm:text-[34px]">
          Featured Collection
        </h2>

        <div className="mt-8 flex justify-center gap-7 sm:mt-9 sm:gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 pb-2 font-sans text-[16px] leading-none transition sm:text-[19px] ${
                  isActive
                    ? "border-black text-black"
                    : "border-transparent text-[#5f5f5f] hover:border-black/30 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-10 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-11">
          <Link
            to={activeConfig.viewAll}
            className="inline-block border-b border-black pb-1 font-sans text-[16px] font-normal tracking-[0.28em] text-black transition hover:text-primary-700 sm:text-[18px]"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productAPI } from "../../api/services";
import { getMiniProducts } from "../../services/productApi";

const filters = [
  "All",
  "Indian",
  "Tropical",
  "Floral",
  "Chinoiserie",
  "European",
  "Pichwai",
  "Abstract",
];

export const bestSellingProducts = [];

function CollectionProductCard({ product }) {
  const navigate = useNavigate();
  const title = product.title || product.name || '';
  const image = product.image || product.pimages?.[0] || '';
  
  const rawPrice = product.price || product.variants?.[0]?.price || '0';
  const price = typeof rawPrice === 'number' ? rawPrice.toLocaleString('en-IN') : String(rawPrice).replace(/^\u20b9/, '');

  return (
    <article className="group min-w-0">
      <button
        type="button"
        onClick={() => navigate(`/product/${product.slug}`)}
        className="block aspect-[0.86/1] w-full overflow-hidden bg-[#D7D7D7]"
        aria-label={title}
      >
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </button>

      <button
        type="button"
        onClick={() => navigate(`/product/${product.slug}`)}
        className="mt-4 block w-full text-left"
      >
        <h3 className="font-sans text-[12px] font-normal leading-5 text-black transition group-hover:text-primary-700 sm:text-[13px]">
          {title}
        </h3>
      </button>
      <p className="mt-1 font-sans text-[10px] leading-4 text-[#2D545E] sm:text-[11px]">
        Starts from {"\u20b9"}
        {price} / sq. ft.
      </p>
    </article>
  );
}

function HelpTile() {
  return (
    <div className="col-span-full flex min-h-[210px] flex-col justify-center bg-[#103438] px-5 py-8 text-white sm:px-9 lg:min-h-[235px] lg:px-10">
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/75">Design help</p>
      <h2 className="mt-4 font-serif text-[24px] font-normal leading-tight text-white sm:text-[30px]">
        Need help choosing the right wallpaper?
      </h2>
      <p className="mt-5 max-w-[760px] font-sans text-[13px] font-semibold leading-6 text-white/90 sm:text-[15px]">
        Share your room photo on WhatsApp and our design team will suggest options that fit your space and style.
      </p>
      <a
        href="https://wa.me/918700986208"
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-block w-fit border-b border-white pb-1 font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-white"
      >
        WhatsApp Us
      </a>
    </div>
  );
}

export function WallpaperCollectionPage({ title, description, products: initialProducts = [], showFilters = true }) {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(-1) || 'wallpapers';

  const { data: apiData } = useQuery({
    queryKey: ['collection-page', slug],
    queryFn: async () => {
      const res = await getProductsByCategorySlug(slug, 1, 100);
      if (res?.success && res?.products) {
        return res.products;
      }
      const miniRes = await getMiniProducts(1, 100);
      return miniRes?.products || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const products = apiData?.length > 0 ? apiData : initialProducts;
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  const visibleProducts =
    selectedFilter === "All" ? products : products.filter((product) => {
      const tag = product.tag || (product.tags && product.tags[0]) || 
        (product.name && product.name.toLowerCase().includes('chinoiserie') ? 'Chinoiserie' : '') || 
        (product.name && product.name.toLowerCase().includes('heritage') ? 'Indian' : '') || 
        (product.name && product.name.toLowerCase().includes('tropical') ? 'Tropical' : '') || '';
      return tag === selectedFilter;
    });

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 pb-8 pt-5 sm:px-6 lg:px-9">
        <div className="mx-auto max-w-[1680px]">
          <div className="text-center font-sans text-[9px] uppercase tracking-[0.16em] text-[#103438] sm:text-[10px]">
            <span className="inline-block">* 4.95/5 Rating</span>
            <span className="mx-4 inline-block text-black/55">.</span>
            <span className="inline-block">17,000+ Homes</span>
            <span className="mx-4 inline-block text-black/55">.</span>
            <span className="inline-block">28+ Countries</span>
          </div>

          <h1 className="mt-7 text-center font-serif text-[24px] font-normal leading-tight text-black sm:text-[32px]">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-[820px] text-center font-sans text-[13px] leading-6 text-[#103438] sm:text-[16px]">
            {description}
          </p>

          {showFilters && (
            <>
              <div className="mt-8 flex justify-center sm:justify-end">
                <label className="sr-only" htmlFor="design-filter">
                  Shop by Design
                </label>
                <select
                  id="design-filter"
                  value={selectedFilter}
                  onChange={(event) => setSelectedFilter(event.target.value)}
                  className="h-9 border border-[#D7D7D7] bg-white px-3 font-sans text-xs text-[#103438] outline-none transition hover:border-black"
                >
                  <option value="All">Shop by Design</option>
                  {filters
                    .filter((filter) => filter !== "All")
                    .map((filter) => (
                      <option key={filter} value={filter}>
                        {filter}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3">
                {filters.map((filter) => {
                  const isActive = selectedFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedFilter(filter)}
                      className={`h-9 rounded-full border px-5 font-sans text-[11px] uppercase tracking-[0.08em] transition sm:min-w-[82px] ${
                        isActive
                          ? "border-[#103438] bg-[#103438] text-white"
                          : "border-[#D7D7D7] bg-white text-[#103438] hover:border-[#103438]"
                      }`}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1680px] px-4 pb-16 pt-4 sm:px-6 lg:px-9">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-7 md:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <React.Fragment key={product.slug}>
              {index === 12 && <HelpTile />}
              <CollectionProductCard product={product} />
            </React.Fragment>
          ))}

          {visibleProducts.length === 0 && (
              <p className="col-span-full py-16 text-center font-sans text-xs text-black/60">
              No wallpapers match the selected filter.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default function BestSellingWallpapers() {
  return (
    <WallpaperCollectionPage
      title="Best Selling Wallpaper Designs"
      description="The wallpapers most homes across 28 countries keep coming back to - from the misty calm of Sukoon to the Mughal detail of Meena Bazar. The designs that earned their place on more walls than any others."
      products={bestSellingProducts}
    />
  );
}

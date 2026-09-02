import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

const getVariant = (product) => {
  if (Array.isArray(product?.variants)) return product.variants[0] || {};
  return product?.variants || {};
};

const getProductImage = (product) => {
  const variant = getVariant(product);
  return (
    product?.pimage ||
    product?.pimages?.[0] ||
    variant?.images?.[0] ||
    variant?.image ||
    ""
  );
};

const getProductPrice = (product) => {
  const price = getVariant(product)?.price || product?.price || "0";
  if (typeof price === "number") return price.toLocaleString("en-IN");
  return String(price).replace(/^\u20b9/, "");
};

const getProductTag = (product) => {
  const text = [
    product?.tag,
    product?.category?.name,
    product?.category?.slug,
    product?.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (text.includes("chinoiserie")) return "Chinoiserie";
  if (text.includes("tropical") || text.includes("palm") || text.includes("jungle")) return "Tropical";
  if (text.includes("floral") || text.includes("flower") || text.includes("blossom")) return "Floral";
  if (text.includes("european") || text.includes("vintage")) return "European";
  if (text.includes("pichwai")) return "Pichwai";
  if (text.includes("abstract")) return "Abstract";
  if (text.includes("indian") || text.includes("mughal") || text.includes("kalamkari")) return "Indian";
  return "";
};

function ProductTile({ product, onProductClick }) {
  const title = product?.name || product?.title || "Product";
  const image = getProductImage(product);
  const price = getProductPrice(product);

  return (
    <article className="group min-w-0">
      <button
        type="button"
        onClick={() => onProductClick(product.slug)}
        className="block aspect-[0.86/1] w-full overflow-hidden bg-[#D7D7D7]"
        aria-label={title}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center px-4 text-center font-sans text-xs text-black/45">
            Image unavailable
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={() => onProductClick(product.slug)}
        className="mt-4 block w-full text-left"
      >
        <h3 className="font-sans text-[12px] font-normal leading-5 text-black transition group-hover:text-primary-700 sm:text-[13px]">
          {title}
        </h3>
      </button>
      <p className="mt-1 font-sans text-[10px] leading-4 text-[#2D545E] sm:text-[11px]">
        Starts from {"\u20b9"}
        {price}
      </p>
    </article>
  );
}

const NewProducts = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = React.useState("All");

  // Fetch new products from API using React Query
  const { data: productsData, isLoading, isError, error } = useQuery({
    queryKey: ["miniProducts", { page: 1, limit: 1000, isBestSeller: "" }],
    queryFn: () => getMiniProducts(1, 1000, "", "", "", ""),
  });

  // Handle navigation to product details page
  const handleProductClick = (slug) => {
    if (!slug) return;
    navigate(`/product/${slug}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-brand-bg">
        <div className="text-lg font-sans font-medium text-secondary animate-pulse">Loading the Ayraj Collection...</div>
      </div>
    );
  }

  // Error handling state
  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-brand-bg">
        <div className="text-lg font-sans font-medium text-red-800">Unable to load products: {error.message}</div>
      </div>
    );
  }

  // Get the products list
  const products = productsData?.products || [];
  const visibleProducts =
    selectedFilter === "All"
      ? products
      : products.filter((product) => getProductTag(product) === selectedFilter);

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
            Best Selling Wallpaper Designs
          </h1>
          <p className="mx-auto mt-3 max-w-[820px] text-center font-sans text-[13px] leading-6 text-[#103438] sm:text-[16px]">
            The wallpapers most homes across 28 countries keep coming back to - from the misty calm of Sukoon to the Mughal detail of Meena Bazar. The designs that earned their place on more walls than any others.
          </p>

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
        </div>
      </section>

      <div className="mx-auto max-w-[1680px] px-4 pb-16 pt-4 sm:px-6 lg:px-9">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-7 md:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductTile
              key={product._id || product.slug}
              product={product}
              onProductClick={handleProductClick}
            />
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
};

export default NewProducts;

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategorySlug } from "../../services/productApi"; // Adjust path if necessary

const getVariant = (product) => {
  if (Array.isArray(product?.variants)) return product.variants[0] || {};
  return product?.variants || {};
};

const getProductImage = (product) => {
  const variant = getVariant(product);
  return (
    product?.pimage ||
    product?.pimages?.[0] ||
    variant?.image ||
    variant?.images?.[0] ||
    ""
  );
};

const getProductPrice = (product) => {
  const price = getVariant(product)?.price || product?.price || 0;
  const amount = Number(price);
  return Number.isFinite(amount) ? amount.toLocaleString("en-IN") : String(price).replace(/^\u20b9/, "");
};

export default function RelatedProduct({ categorySlug }) {
  const scrollRef = useRef(null);

  // Fetch related products by category using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["relatedProducts", categorySlug],
    queryFn: () => getProductsByCategorySlug(categorySlug, 1, 12),
    enabled: !!categorySlug, // Ensure query is triggered if categorySlug is available
  });

  const products = data?.products || [];

  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1680px]">
        <h2 className="mb-8 text-center font-serif text-[28px] font-normal leading-tight tracking-normal text-black sm:text-[34px]">
          Related Products
        </h2>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-7 lg:gap-9"
        >
          {isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="basis-[78%] shrink-0 animate-pulse snap-start sm:basis-[44%] lg:basis-[calc((100%_-_108px)/4)]"
              >
                <div className="aspect-[0.86/1] bg-[#D7D7D7]" />
                <div className="mt-6 h-4 w-3/4 bg-black/10" />
                <div className="mt-3 h-3 w-1/3 bg-black/10" />
              </div>
            ))}

          {error && (
            <p className="w-full py-10 text-center font-sans text-sm text-[#103438]">
              Error loading related products
            </p>
          )}

          {!isLoading && !error && products.length === 0 && (
            <p className="w-full py-10 text-center font-sans text-sm text-[#103438]">
              No related products available.
            </p>
          )}

          {!isLoading &&
            !error &&
            products.map((product) => {
              const image = getProductImage(product);
              const title = product?.name || product?.title || "Product";

              return (
                <article
                  key={product._id || product.slug}
                  className="group min-w-0 basis-[78%] shrink-0 snap-start sm:basis-[44%] lg:basis-[calc((100%_-_108px)/4)]"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="block aspect-[0.86/1] w-full overflow-hidden bg-[#D7D7D7]"
                    aria-label={title}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-contain object-top transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center px-4 text-center font-sans text-xs text-black/45">
                        Image unavailable
                      </span>
                    )}
                  </Link>

                  <Link to={`/product/${product.slug}`} className="mt-6 block">
                    <h3 className="font-sans text-[15px] font-normal leading-5 text-black transition group-hover:text-primary-700 sm:text-[17px]">
                      {title}
                    </h3>
                  </Link>

                  <p className="mt-2 font-sans text-[13px] leading-5 text-[#103438] sm:text-[15px]">
                    Starts from {"\u20b9"}
                    {getProductPrice(product)}
                  </p>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}

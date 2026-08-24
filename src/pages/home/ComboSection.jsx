import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ShoppingCart, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getMiniProducts } from "../../services/productApi";
import { useCartActions } from "../../hooks/useCartActions";

const formatPrice = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount.toLocaleString("en-IN") : value;
};

export default function ComboSection({ categorySlug }) {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const isCarouselPaused = useRef(false);
  const [busyProduct, setBusyProduct] = useState(null);
  const { addToCart, cartItems } = useCartActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["isCombo", categorySlug],
    queryFn: () => getMiniProducts(1, 100, "", categorySlug, "", "", "", "true"),
  });

  const scroll = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({
      left: direction === "left" ? -carousel.offsetWidth / 2 : carousel.offsetWidth / 2,
      behavior: "smooth",
    });
  };

  const addProductToCart = async (product, buyNow = false) => {
    const variant = product?.variants || {};
    const color = Array.isArray(variant.color) ? variant.color[0] : variant.color;

    try {
      setBusyProduct(product._id);
      const result = await addToCart(product, variant.size, color, 1);

      if (result?.success) {
        toast.success(`${product.name} added to cart`);
        if (buyNow) navigate("/cart");
      } else {
        toast.error(result?.error || "Unable to add product to cart");
      }
    } catch (error) {
      toast.error(error?.message || "Unable to add product to cart");
    } finally {
      setBusyProduct(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel || isCarouselPaused.current) return;
      const reachedEnd = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 2;
      carousel[reachedEnd ? "scrollTo" : "scrollBy"]({
        left: reachedEnd ? 0 : carousel.offsetWidth / 2,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const products = data?.products || [];

  return (
    <section id="combo-products" className="scroll-mt-28 overflow-x-hidden bg-brand-bg px-3 py-5 sm:px-6 sm:py-7 lg:px-5">
      <div className="relative mx-auto min-w-0 max-w-full">
        <div className="mb-3 flex items-start justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-[26px] font-bold leading-tight text-brand-text sm:text-[36px]">
              Combo <span className="text-primary-600">Products</span>
            </h2>
            <p className="mt-1 text-[13px] font-medium text-brand-text/60 sm:text-sm">
              More Savings, More Blessings
            </p>
          </div>

          <Link
            to="/new-products"
            className="mt-1 inline-flex shrink-0 items-center gap-2 text-[10px] font-bold text-[#2D545E] transition hover:text-brand-text sm:text-[11px]"
          >
            <span className="sm:hidden">View All</span>
            <span className="hidden sm:inline">View All Combos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous combo products"
            className="absolute left-0 top-[35%] z-20 hidden h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-[#2D545E]/20 bg-brand-bg text-[#2D545E] shadow-md transition hover:bg-[#2D545E] hover:text-white sm:flex"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            ref={carouselRef}
            className="scrollbar-hide flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 sm:gap-5"
            onMouseEnter={() => {
              isCarouselPaused.current = true;
            }}
            onMouseLeave={() => {
              isCarouselPaused.current = false;
            }}
            onTouchStart={() => {
              isCarouselPaused.current = true;
            }}
            onTouchEnd={() => {
              isCarouselPaused.current = false;
            }}
          >
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="basis-[calc((100%_-_12px)/2)] shrink-0 animate-pulse snap-start sm:basis-[42%] md:basis-[30%] lg:basis-[calc((100%_-_80px)/5)]"
                >
                  <div className="aspect-[1.28/1] rounded-xl bg-black/5" />
                  <div className="mt-3 h-3.5 w-3/4 rounded bg-black/5" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-black/5" />
                </div>
              ))}

            {isError && (
              <p className="w-full py-12 text-center text-sm text-[#2D545E]">
                {error?.message || "Unable to load combo products."}
              </p>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <p className="w-full py-12 text-center text-sm text-brand-text/60">No combo products available.</p>
            )}

            {!isLoading &&
              !isError &&
              products.map((product) => {
                const variant = product?.variants || {};
                const discount = Number(product?.discount) || 0;
                const color = Array.isArray(variant.color) ? variant.color[0] : variant.color;
                const cartItem = cartItems.find(
                  (item) => item.id === product._id && item.size === variant.size && item.color === color,
                );
                const subtitle =
                  product?.shortDescription ||
                  product?.category?.name ||
                  (typeof product?.category === "string" ? product.category : "Purity • Blessings");

                return (
                  <article
                    key={product._id}
                    className="group flex min-w-0 basis-[calc((100%_-_12px)/2)] shrink-0 snap-start flex-col sm:basis-[42%] md:basis-[30%] lg:basis-[calc((100%_-_80px)/5)]"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-[#D7D7D7]">
                      {discount > 0 && (
                        <span className="absolute left-2 top-2 z-10 rounded-md bg-[#2D545E] px-2.5 py-1 text-[9px] font-bold text-white shadow-sm sm:text-[10px]">
                          {discount}% OFF
                        </span>
                      )}

                      <span className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-brand-bg/70 text-[#2D545E]">
                        <Heart size={14} />
                      </span>

                      <button
                        type="button"
                        onClick={() => navigate(`/product/${product.slug}`)}
                        className="flex aspect-[1.28/1] w-full items-center justify-center overflow-hidden"
                      >
                        <img
                          src={product.pimage}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="mt-2.5 block w-full text-left"
                    >
                      <h3 className="line-clamp-1 text-[12px] font-semibold text-brand-text transition group-hover:text-[#2D545E] sm:text-[13px]">
                        {product.name}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-[9px] text-[#2D545E] sm:text-[10px]">
                        {subtitle}
                      </p>
                    </button>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-text sm:text-[13px]">
                        ₹{formatPrice(variant.price)}
                      </span>
                      {variant.realPrice && Number(variant.realPrice) > Number(variant.price) && (
                        <span className="text-[9px] text-[#2D545E] line-through sm:text-[10px]">
                          ₹{formatPrice(variant.realPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
                      <button
                        type="button"
                        onClick={() => addProductToCart(product)}
                        disabled={busyProduct === product._id}
                        className="inline-flex h-9 items-center justify-center gap-1 rounded-md bg-[#2D545E] px-1 text-[9px] font-semibold text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60 sm:gap-1.5 sm:px-2 sm:text-[11px]"
                      >
                        <ShoppingCart size={13} />
                        {busyProduct === product._id
                          ? "Adding..."
                          : cartItem
                            ? `Added (${cartItem.quantity})`
                            : "Add to Cart"}
                      </button>

                      <button
                        type="button"
                        onClick={() => addProductToCart(product, true)}
                        disabled={busyProduct === product._id}
                        className="inline-flex h-9 items-center justify-center gap-1 rounded-md border border-[#2D545E] px-1 text-[9px] font-semibold text-[#2D545E] transition hover:bg-[#2D545E] hover:text-white disabled:cursor-wait disabled:opacity-60 sm:gap-1.5 sm:px-2 sm:text-[11px]"
                      >
                        <Zap size={13} />
                        Buy Now
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next combo products"
            className="absolute right-0 top-[35%] z-20 hidden h-10 w-10 translate-x-1/2 items-center justify-center rounded-full border border-[#2D545E]/20 bg-brand-bg text-[#2D545E] shadow-md transition hover:bg-[#2D545E] hover:text-white sm:flex"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}

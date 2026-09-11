import React, { useState, useEffect } from "react";
import { getProductsByCategorySlug } from "../services/productApi";
import CollectionProductCard from "../components/Product/CollectionProductCard";

export default function NewProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewArrivals() {
      setLoading(true);
      try {
        const res = await getProductsByCategorySlug('new-arrivals', 1, 50);
        if (res.success && res.products) {
          setProducts(res.products);
        } else {
          setError("Failed to load new products.");
        }
      } catch (err) {
        console.error("Error loading new arrivals:", err);
        setError("Error loading new arrivals.");
      } finally {
        setLoading(false);
      }
    }
    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2D545E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-[#2D545E]">Loading new arrivals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-medium">
        {error}
      </div>
    );
  }

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-9">
        <h1 className="text-3xl md:text-4xl font-serif text-[#103438] font-bold mb-3 text-center tracking-wide">
          New Arrivals
        </h1>
        <p className="text-center text-[#103438]/70 max-w-xl mx-auto mb-10 text-sm md:text-base font-light">
          Discover our latest handcrafted products, wallpapers, and textile art additions.
        </p>

        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-medium">
            No new arrival products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <CollectionProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

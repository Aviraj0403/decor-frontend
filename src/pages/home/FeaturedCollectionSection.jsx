import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProductsByCategorySlug } from "../../services/productApi";
import CollectionProductCard from "../../components/Product/CollectionProductCard";

const tabs = [
  { id: "bestsellers", label: "Bestsellers", viewAll: "/collections/best-selling-wallpapers", categorySlug: "best-sellers" },
  { id: "new-arrivals", label: "New Arrivals", viewAll: "/collections/new-arrivals", categorySlug: "new-arrivals" },
];

export default function FeaturedCollectionSection() {
  const [activeTab, setActiveTab] = useState("bestsellers");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const activeConfig = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  useEffect(() => {
    async function fetchTabProducts() {
      setLoading(true);
      try {
        const res = await getProductsByCategorySlug(activeConfig.categorySlug, 1, 8);
        if (res && res.success && res.products) {
          setProducts(res.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching featured collection products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTabProducts();
  }, [activeTab, activeConfig.categorySlug]);

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
                    : "border-transparent text-[#2D545E] hover:border-black/30 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-[#2D545E] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">
            No products found in this section.
          </div>
        ) : (
          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-10 sm:gap-x-7 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
            {products.map((product) => (
              <CollectionProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        )}

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

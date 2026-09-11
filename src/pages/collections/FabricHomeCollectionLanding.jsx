import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsByCategorySlug } from "../../services/productApi";
import CollectionProductCard from "../../components/Product/CollectionProductCard";

export default function FabricHomeCollectionLanding() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(-1);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await getProductsByCategorySlug(slug, 1, 100);
        if (res && res.success) {
          setData(res);
        } else {
          setData({ products: [], categoryName: '', categoryDescription: '' });
        }
      } catch (err) {
        console.error("Error fetching collection products:", err);
        setData({ products: [], categoryName: '', categoryDescription: '' });
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [slug]);

  const products = data?.products || [];
  const title = data?.categoryName || slug?.replace(/-/g, ' ').toUpperCase();
  const description = data?.categoryDescription || '';

  return (
    <section className="bg-white min-h-screen pb-16">
      <div className="bg-[#D7D7D7] border-b border-[#D7D7D7] py-14 px-6 text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl text-[#103438] tracking-wider uppercase font-semibold mb-4">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl mx-auto text-[#103438]/75 text-sm md:text-base leading-relaxed font-light font-sans">
            {description}
          </p>
        )}
      </div>

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-9">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#2D545E] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-medium">
            No products found in this collection.
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

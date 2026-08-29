import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMiniProducts } from "../../services/productApi";
import NewArrivalPC from "../../components/Product/NewArrivalPC";

const NewProducts = () => {
  const navigate = useNavigate();

  // Fetch new products from API using React Query
  const { data: productsData, isLoading, isError, error } = useQuery({
    queryKey: ["miniProducts", { page: 1, limit: 1000, isBestSeller: "" }],
    queryFn: () => getMiniProducts(1, 1000, "", "", "", ""),
  });

  // Handle navigation to product details page
  const handleProductClick = (slug) => {
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

  return (
    <section className="bg-brand-bg py-12 sm:py-16 min-h-screen">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="mb-14 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-text sm:text-4xl tracking-wide uppercase">
            New Arrivals
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-secondary/40"></div>
            <div className="h-2 w-2 rotate-45 bg-secondary"></div>
            <div className="h-px w-12 bg-secondary/40"></div>
          </div>
          <p className="mt-4 text-sm font-sans text-muted max-w-2xl mx-auto leading-relaxed">
            Explore our latest curation of premium customized wallpapers, luxury fabrics, and statement home decor designed to bring elegance and character to your spaces.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
          {products.map((product) => (
            <NewArrivalPC
              key={product._id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-muted font-sans font-medium">
            No products available at the moment.
          </div>
        )}

      </div>
    </section>
  );
};

export default NewProducts;

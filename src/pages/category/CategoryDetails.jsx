import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategorySlug } from "../../services/productApi"; // Import the new API function
import ProductCard from "../../components/Product/ProductCard"; // Import ProductCard component

export default function CategoryDetails() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImages, setCategoryImages] = useState([]);

  // Fetch products by category and set the category name
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getProductsByCategorySlug(categorySlug, page, 100);
      if (data.success) {
        setProducts(data.products);
        setPagination(data.pagination);
        setCurrentPage(page);
        setCategoryName(data.categoryName || categorySlug);
        setCategoryDescription(data.categoryDescription || "");
        setCategoryImages(data.categoryImage || []);
      } else {
        setError("Failed to load products");
      }
    } catch (error) {
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [categorySlug, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2D5016] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-[#2D5016]">Loading collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg text-red-500 font-medium">
        {error}
      </div>
    );
  }

  // Navigate to product detail page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="bg-brand-bg min-h-screen pb-16">
      {/* 🖼 Category Banner Header */}
      {categoryImages.length > 0 ? (
        <div className="relative w-full h-[280px] md:h-[400px] overflow-hidden mb-12">
          <img
            src={categoryImages[1] || categoryImages[0]}
            alt={categoryName}
            className="w-full h-full object-cover object-center"
          />
          {/* Dark scrim overlay for high legibility */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
            <h1 className="font-serif text-3xl md:text-5xl text-white tracking-widest uppercase font-semibold mb-4 drop-shadow-md">
              {categoryName}
            </h1>
            {categoryDescription && (
              <p className="max-w-2xl text-white/90 text-sm md:text-base font-light leading-relaxed drop-shadow-sm font-sans">
                {categoryDescription}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* 🏷 Backup Header: Clean Tan-Beige box */
        <div className="bg-[#FBF8F3] border-b border-[#EDE4D8] py-14 px-6 text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] tracking-wider uppercase font-semibold mb-4">
            {categoryName || categorySlug}
          </h1>
          {categoryDescription && (
            <p className="max-w-3xl mx-auto text-[#2A2A2A]/75 text-sm md:text-base leading-relaxed font-light font-sans">
              {categoryDescription}
            </p>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted font-light">
              No products found in this collection.
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-14 flex justify-center items-center gap-4">
            <button
              onClick={() => fetchProducts(currentPage - 1)}
              disabled={currentPage <= 1}
              className="px-6 py-2.5 bg-white border border-[#EDE4D8] text-[#2A2A2A] rounded font-medium shadow-sm hover:bg-[#F2EAE1] disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-[#F2EAE1] text-[#2A2A2A] rounded font-medium text-sm">
              {currentPage} / {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchProducts(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              className="px-6 py-2.5 bg-[#2D5016] text-white rounded font-medium shadow-sm hover:bg-[#3D6B20] disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

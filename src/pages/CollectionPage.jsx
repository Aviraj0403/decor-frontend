import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { getProductsByCategorySlug } from '../services/productApi';
import { getMenuCategories } from '../services/categoryApi';
import ProductCard from '../components/Product/ProductCard';

const SORT_OPTIONS = [
  { label: 'Newest First', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Best Rated', value: '-rating' },
];

export default function CollectionPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sort, setSort] = useState('-createdAt');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch Category Products dynamically from Backend
  const { data: collectionData, isLoading } = useQuery({
    queryKey: ['collection', slug, sort],
    queryFn: async () => {
      const res = await getProductsByCategorySlug(slug || 'all', 1, 100);
      return res || { products: [], categoryName: '', categoryDescription: '' };
    },
  });

  // Fetch Categories for Filter Sidebar dynamically
  const { data: menuCategories = [] } = useQuery({
    queryKey: ['menuCategoriesFilter'],
    queryFn: getMenuCategories,
  });

  const rawProducts = collectionData?.products || [];
  const categoryName = collectionData?.categoryName || slug?.replace(/-/g, ' ').toUpperCase() || 'Collection';
  const categoryDescription = collectionData?.categoryDescription || '';

  // Filter products by selected price range and category checkboxes
  const products = rawProducts.filter((product) => {
    const price = product?.variants?.price || product?.price || 0;
    if (price < priceRange[0] || price > priceRange[1]) return false;
    return true;
  });

  const handleCategoryToggle = (catSlug) => {
    navigate(`/collections/${catSlug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      {/* Header */}
      <div className="mb-8 border-b border-cream-dark pb-6">
        <p className="section-tag mb-2">Our Collection</p>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="section-title text-2xl md:text-3xl font-serif text-[#103438] font-bold">
              {categoryName}
            </h1>
            {categoryDescription && (
              <p className="text-sm text-[#103438]/70 mt-1 font-light max-w-2xl">
                {categoryDescription}
              </p>
            )}
            {!isLoading && (
              <p className="text-muted text-sm mt-1">{products.length} products</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white border border-cream-dark pl-4 pr-8 py-2 text-sm text-charcoal focus:outline-none focus:border-green cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 btn-outline py-2 px-4 text-xs"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters sidebar */}
        {showFilters && (
          <aside className="w-64 shrink-0 space-y-6 bg-white p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-charcoal uppercase tracking-wider">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-muted hover:text-charcoal">
                <X size={16} />
              </button>
            </div>

            {/* Price filter */}
            <div>
              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Price Range (₹)</h4>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-full border border-cream-dark p-2 text-xs focus:outline-none focus:border-green"
                />
                <span className="text-muted text-xs">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full border border-cream-dark p-2 text-xs focus:outline-none focus:border-green"
                />
              </div>
            </div>

            {/* Dynamic Category Filter */}
            <div>
              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Categories</h4>
              {menuCategories.map((cat) => (
                <div key={cat._id || cat.slug} className="mb-2">
                  <button
                    onClick={() => handleCategoryToggle(cat.slug)}
                    className={`text-left text-sm font-medium hover:text-primary-600 transition ${
                      slug === cat.slug ? "text-primary-600 font-bold" : "text-charcoal"
                    }`}
                  >
                    {cat.name}
                  </button>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="ml-3 mt-1 space-y-1">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub._id || sub.slug}
                          onClick={() => handleCategoryToggle(sub.slug)}
                          className={`block text-xs text-left hover:text-primary-600 transition ${
                            slug === sub.slug ? "text-primary-600 font-bold" : "text-gray-500"
                          }`}
                        >
                          • {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded-lg" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-charcoal mb-2">No products found</p>
              <p className="text-muted text-sm">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((p) => (
                <ProductCard key={p._id || p.id || p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { productAPI } from '../api/services';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { label: 'Newest First', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Best Rated', value: '-rating' },
];

const COLLECTION_TITLES = {
  all: 'All Products',
  'new-arrivals': 'New Arrivals',
  'best-selling': 'Best Sellers',
  wallpapers: 'Wallpapers',
  'cushion-covers': 'Cushion Covers',
  curtains: 'Curtains',
  'table-linen': 'Table Linen',
  'wall-art': 'Wall Art',
  'fabric-home': 'Fabric & Home',
};

export default function CollectionPage() {
  const { slug } = useParams();
  const [sort, setSort] = useState('-createdAt');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const title = COLLECTION_TITLES[slug] || slug?.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ') || 'Collection';

  const { data, isLoading } = useQuery({
    queryKey: ['collection', slug, sort],
    queryFn: async () => {
      const params = { sort, limit: 24 };
      if (slug === 'new-arrivals') params.sort = '-createdAt';
      else if (slug === 'best-selling') params.isBestSeller = true;
      else if (slug !== 'all') params.category = slug;
      const res = await productAPI.getAll(params);
      return res.data?.data?.products || res.data?.products || res.data || [];
    },
  });

  const products = data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8 border-b border-cream-dark pb-6">
        <p className="section-tag mb-2">Our Collection</p>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="section-title">{title}</h1>
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
          <aside className="w-56 shrink-0 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-charcoal uppercase tracking-wider">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-muted hover:text-charcoal">
                <X size={16} />
              </button>
            </div>

            {/* Price filter */}
            <div>
              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Price Range</h4>
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

            {/* Type filter */}
            <div>
              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-3">Product Type</h4>
              {['Wallpaper', 'Cushion Cover', 'Curtain', 'Table Linen', 'Wall Art'].map((type) => (
                <label key={type} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input type="checkbox" className="accent-green w-3.5 h-3.5" />
                  <span className="text-sm text-charcoal">{type}</span>
                </label>
              ))}
            </div>
          </aside>
        )}

        {/* Products grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-cream-dark animate-pulse" style={{ aspectRatio: '3/4' }} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-charcoal mb-2">No products found</p>
              <p className="text-muted text-sm">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

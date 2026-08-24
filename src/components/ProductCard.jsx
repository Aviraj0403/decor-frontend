import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store';
import { toast } from 'sonner';

function formatPrice(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const wishlisted = has(product._id);

  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price || 0;
  const disc = product.discount || 0;
  const finalPrice = disc > 0 ? price - (price * disc / 100) : price;
  const img = product.pimages?.[0] || 'https://via.placeholder.com/400x500/F5F0E8/2D5016?text=SD';
  const img2 = product.pimages?.[1] || img;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return toast.error('Variant not available');
    addItem(product, firstVariant);
    toast.success('Added to bag!', { description: product.name });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <Link to={`/products/${product.slug}`} className="block product-card group">
      {/* Image */}
      <div className="relative overflow-hidden bg-cream-dark">
        <img
          src={img}
          alt={product.name}
          className="w-full"
          style={{ aspectRatio: '3/4', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={(e) => { if (img2 !== img) e.currentTarget.src = img2; }}
          onMouseLeave={(e) => { e.currentTarget.src = img; }}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isHotProduct && (
            <span className="bg-gold text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">Hot</span>
          )}
          {product.isBestSeller && (
            <span className="bg-green text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">Best Seller</span>
          )}
          {disc > 0 && (
            <span className="bg-charcoal text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">-{disc}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-sm"
          aria-label="Wishlist"
        >
          <Heart size={15} className={wishlisted ? 'text-red-500 fill-red-500' : 'text-charcoal'} />
        </button>

        {/* Quick Add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-green/95 text-white text-xs font-medium py-3 tracking-wider uppercase flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <ShoppingBag size={14} /> Add to Bag
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-[11px] text-muted uppercase tracking-wider mb-1">
          {product.brand || 'Ayraj'}
        </p>
        <h3 className="font-serif text-base text-charcoal leading-snug line-clamp-2 group-hover:text-green transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-300'}
              />
            ))}
            <span className="text-[10px] text-muted ml-0.5">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-medium text-charcoal">{formatPrice(finalPrice)}</span>
          {disc > 0 && (
            <span className="text-sm text-muted line-through">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

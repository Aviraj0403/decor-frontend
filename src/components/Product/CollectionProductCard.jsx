import React from "react";
import { useNavigate } from "react-router-dom";

export default function CollectionProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const title = product.name || product.title || '';
  const image =
    product.pimage ||
    (Array.isArray(product.pimages) ? product.pimages[0] : product.pimages) ||
    product.image ||
    '';
  
  const rawPrice =
    product.price ||
    (Array.isArray(product.variants) ? product.variants[0]?.price : product.variants?.price) ||
    '0';

  const price = typeof rawPrice === 'number' ? rawPrice.toLocaleString('en-IN') : String(rawPrice).replace(/^\u20b9/, '');
  const slug = product.slug || '';

  const isWallpaper =
    product.wallpaperMaterials?.length > 0 ||
    product.productType === 'Wallpaper' ||
    title.toLowerCase().includes('wallpaper') ||
    title.toLowerCase().includes('mural');

  return (
    <article className="group min-w-0">
      <button
        type="button"
        onClick={() => navigate(`/product/${slug}`)}
        className="block aspect-[0.86/1] w-full overflow-hidden bg-[#D7D7D7] rounded-sm"
        aria-label={title}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">
            No Image
          </div>
        )}
      </button>

      <button
        type="button"
        onClick={() => navigate(`/product/${slug}`)}
        className="mt-3 block w-full text-left"
      >
        <h3 className="font-sans text-[13px] font-normal leading-5 text-black transition group-hover:text-primary-700 sm:text-[14px]">
          {title}
        </h3>
      </button>

      {price && price !== '0' && (
        <p className="mt-1 font-sans text-[11px] leading-4 text-[#2D545E] sm:text-[12px]">
          Starts from {"\u20b9"}{price} {isWallpaper ? '/ sq. ft.' : ''}
        </p>
      )}
    </article>
  );
}

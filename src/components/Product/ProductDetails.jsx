import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../services/productApi";
import RelatedProduct from "../../pages/home/RelatedProduct";
import { useCartActions } from "../../hooks/useCartActions";
import 'react-toastify/dist/ReactToastify.css';
import ReviewTab from "../../pages/Review/ReviewTab";
import { trackMetaEvent } from "../../utils/metaPixel";

// Color mapping utility - maps color names to hex values
const getColorHex = (colorName) => {
  const colorMap = {
    // Basic colors
    'red': '#EF4444',
    'blue': '#3B82F6',
    'green': '#10B981',
    'yellow': '#FBBF24',
    'orange': '#F97316',
    'purple': '#A855F7',
    'pink': '#EC4899',
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#6B7280',
    'grey': '#6B7280',
    'brown': '#92400E',
    'beige': '#F5F5DC',
    'navy': '#1E3A8A',
    'teal': '#14B8A6',
    'cyan': '#06B6D4',
    'lime': '#84CC16',
    'indigo': '#6366F1',
    'violet': '#8B5CF6',
    'fuchsia': '#D946EF',
    'rose': '#F43F5E',
    'gold': '#FFD700',
    'silver': '#C0C0C0',
    'maroon': '#7F1D1D',
    'olive': '#84CC16',
    'coral': '#FF7F50',
    'peach': '#FFDAB9',
    'lavender': '#E6E6FA',
    'mint': '#98FF98',
    'cream': '#FFFDD0',
    'ivory': '#FFFFF0',
    'tan': '#D2B48C',
    'khaki': '#F0E68C',
    'burgundy': '#800020',
    'crimson': '#DC143C',
    'magenta': '#FF00FF',
    'turquoise': '#40E0D0',
    'aqua': '#00FFFF',
    'sky blue': '#87CEEB',
    'light blue': '#ADD8E6',
    'dark blue': '#00008B',
    'light green': '#90EE90',
    'dark green': '#006400',
    'light pink': '#FFB6C1',
    'hot pink': '#FF69B4',
    'light gray': '#D1D5DB',
    'dark gray': '#374151',
    'charcoal': '#36454F',
    'nude': '#E3BC9A',
    'champagne': '#F7E7CE',
    'bronze': '#CD7F32',
    'copper': '#B87333',
    'mauve': '#E0B0FF',
    'plum': '#DDA0DD',
    'sage': '#9DC183',
    'mustard': '#FFDB58',
    'rust': '#B7410E',
    'slate': '#708090',
    'transparent': 'transparent',
    'clear': 'transparent',
  };

  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || null;
}; 

const findImageForColor = (images, color, selectedVariant = null, colorImageMap = null) => {
  if (!images || !images.length || !color) return -1;

  // 0. Try direct mapping from colorImageMap
  if (colorImageMap && colorImageMap[color]) {
    const mappedUrl = colorImageMap[color];
    const idx = images.indexOf(mappedUrl);
    if (idx !== -1) return idx;
  }

  const normalizedColor = color.toLowerCase().trim();
  
  // 1. Try smart substring match on filename
  for (let i = 0; i < images.length; i++) {
    const url = images[i].toLowerCase();
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const cleanedFilename = filename.replace(/[-_]/g, ' ');
    if (cleanedFilename.includes(normalizedColor) || cleanedFilename.replace(/\s+/g, '').includes(normalizedColor.replace(/\s+/g, ''))) {
      return i;
    }
  }

  // 2. Try matching individual color words
  const colorWords = normalizedColor.split(/\s+/).filter(w => w.length > 2);
  for (let i = 0; i < images.length; i++) {
    const url = images[i].toLowerCase();
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const cleanedFilename = filename.replace(/[-_]/g, ' ');
    for (const word of colorWords) {
      if (cleanedFilename.includes(word)) {
        return i;
      }
    }
  }

  // 3. Fallback to index-based mapping
  if (selectedVariant && Array.isArray(selectedVariant.color)) {
    const colorIdx = selectedVariant.color.indexOf(color);
    if (colorIdx !== -1 && colorIdx < images.length) {
      return colorIdx;
    }
  }

  return -1;
};

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [activeTab, setActiveTab] = useState("additional");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Wallpaper custom sizing states
  const [wallpaperWidth, setWallpaperWidth] = useState(10);
  const [wallpaperHeight, setWallpaperHeight] = useState(10);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 10000); // 10 sec

      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const { cartItems, addToCart } = useCartActions();

  // Fetch product
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });

  const product = data?.product;

  // Reset state when product changes (slug changes)
  useEffect(() => {
    if (product?.pimages?.length > 0 && product?.variants?.length > 0) {
      setMainImage(product.pimages[0]);
      setSelectedVariant(product.variants[0]);
      setSelectedColor(product.variants[0]?.color[0]);
      setQuantity(1);
      setActiveTab("additional");

      if (product.productType === 'Wallpaper') {
        const materialsList = product.wallpaperMaterials?.length > 0
          ? product.wallpaperMaterials
          : [
              { materialName: 'Premium Non-Woven (Matte)', pricePerSqFt: 120 },
              { materialName: 'Canvas Peel & Stick', pricePerSqFt: 160 },
              { materialName: 'Classic Textured (Paper)', pricePerSqFt: 100 },
              { materialName: 'Luxury Leatherette', pricePerSqFt: 220 }
            ];
        setSelectedMaterial(materialsList[0]);
      }
    }
  }, [product]);

  useEffect(() => {
    if (selectedColor && product?.pimages) {
      const imgIdx = findImageForColor(product.pimages, selectedColor, selectedVariant, product.colorImageMap);
      if (imgIdx !== -1) {
        setMainImage(product.pimages[imgIdx]);
      }
    }
  }, [selectedColor, selectedVariant, product]);

  useEffect(() => {
    if (!product) return;

    const firstVariant = product.variants?.[0];
    trackMetaEvent("ViewContent", {
      content_ids: [product._id || product.productCode || product.name],
      content_name: product.name,
      content_type: "product",
      currency: "INR",
      value: Number(firstVariant?.price || 0),
    });
  }, [product]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;
  if (!product) return <div>No product found</div>;

  const {
    name,
    category,
    description,
    variants,
    pimages,
    rating,
    reviewCount,
    productCode,
    tags,
    additionalInfo,
    reviews
  } = product;

  const materialsList = product?.wallpaperMaterials?.length > 0
    ? product.wallpaperMaterials
    : [
        { materialName: 'Premium Non-Woven (Matte)', pricePerSqFt: 120 },
        { materialName: 'Canvas Peel & Stick', pricePerSqFt: 160 },
        { materialName: 'Classic Textured (Paper)', pricePerSqFt: 100 },
        { materialName: 'Luxury Leatherette', pricePerSqFt: 220 }
      ];

  let wallpaperRealPrice = 0;
  let wallpaperPrice = 0;
  if (product?.productType === 'Wallpaper') {
    const area = wallpaperWidth * wallpaperHeight;
    const materialPricePerSqFt = selectedMaterial?.pricePerSqFt || 120;
    wallpaperRealPrice = area * materialPricePerSqFt;
    const disc = product?.discount || 0;
    wallpaperPrice = disc > 0 ? wallpaperRealPrice - (wallpaperRealPrice * disc / 100) : wallpaperRealPrice;
  }

  const displayPrice = product?.productType === 'Wallpaper' ? wallpaperPrice : (selectedVariant?.price || 0);
  const displayRealPrice = product?.productType === 'Wallpaper' ? wallpaperRealPrice : (selectedVariant?.realPrice || 0);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedColor(variant.color[0]);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  // 🔧 FIX: Correct data structure for addToCart
 const handleAddToCart = async () => {
  if (product.productType !== 'Wallpaper' && (!selectedVariant || !selectedColor)) {
    alert("Please select size and color");
    return;
  }

  const cartSize = product.productType === 'Wallpaper'
    ? `${wallpaperWidth} W x ${wallpaperHeight} H ft (${selectedMaterial?.materialName || 'Standard'})`
    : selectedVariant.size;

  const cartPrice = product.productType === 'Wallpaper'
    ? wallpaperRealPrice
    : selectedVariant.price;

  const response = await addToCart(
    {
      _id: product._id,
      name: product.name,
      pimage: pimages[0],
      variants: {
        price: cartPrice,
        size: cartSize,
        color: selectedColor
      },
    },
    cartSize,
    selectedColor,
    quantity
  );

  if (response.success) {
    trackMetaEvent("AddToCart", {
      content_ids: [product._id || product.productCode || product.name],
      content_name: product.name,
      content_type: "product",
      currency: "INR",
      value: Number(displayPrice || 0) * Number(quantity || 1),
      contents: [
        {
          id: product._id || product.productCode || product.name,
          quantity: Number(quantity || 1),
        },
      ],
    });
    setPopupMessage(
      `${name} (${cartSize}, ${selectedColor}) added to cart successfully!`
    );
    setShowPopup(true);
  } else {
    alert("Failed to add to cart");
  }
};

  const handleBuyNow = async () => {
    // ✅ Popup helpers
    const popupImage =
      selectedVariant?.images?.[0] ||
      product?.pimages?.[0];

    const popupPrice = displayPrice;

    if (product.productType !== 'Wallpaper' && (!selectedVariant || !selectedColor)) {
      alert("Please select size and color");
      return;
    }

    const cartSize = product.productType === 'Wallpaper'
      ? `${wallpaperWidth} W x ${wallpaperHeight} H ft (${selectedMaterial?.materialName || 'Standard'})`
      : selectedVariant.size;

    const cartPrice = product.productType === 'Wallpaper'
      ? wallpaperRealPrice
      : selectedVariant.price;

    const response = await addToCart(
      {
        _id: product._id,
        name: product.name,
        pimage: pimages[0],
        variants: {
          price: cartPrice,
          size: cartSize,
          color: selectedColor
        },
      },
      cartSize,
      selectedColor,
      quantity
    );

    if (response.success) {
      trackMetaEvent("AddToCart", {
        content_ids: [product._id || product.productCode || product.name],
        content_name: product.name,
        content_type: "product",
        currency: "INR",
        value: Number(displayPrice || 0) * Number(quantity || 1),
        contents: [
          {
            id: product._id || product.productCode || product.name,
            quantity: Number(quantity || 1),
          },
        ],
      });
      setPopupMessage("Product added to cart successfully!");
      setShowPopup(true);
      setTimeout(() => navigate("/cart"), 1200);
    } else {
      alert("Failed to add to cart");
    }
  };


  return (
    <div className="bg-brand-bg min-h-screen py-5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — IMAGE GALLERY */}
          <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide py-2 w-full lg:w-auto lg:mr-4 order-2 lg:order-1">
              {pimages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-contain border-2 rounded-md cursor-pointer transition-transform duration-200 hover:scale-105 ${
                    mainImage === img ? "border-primary-500" : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            <div className="relative w-full lg:w-[80%] flex justify-center mb-4 lg:mb-0 order-1 lg:order-2">
              <div className="w-full max-h-[22rem] flex justify-center items-center bg-brand-bg rounded-xl border border-gray-200 relative overflow-hidden">
                <FaHeart className="absolute top-4 right-4 text-primary-500 cursor-pointer text-xl" />
                <img
                  src={mainImage}
                  alt="Product"
                  className="max-h-[22rem] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — PRODUCT INFO */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{category.name}</p>
            <h1 className="text-2xl font-semibold text-brand-text mb-2">{name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                    } text-sm`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                ({reviewCount || Math.floor(Math.random() * 450)} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-bold text-primary-500">₹{displayPrice?.toFixed(0)}</p>
              {displayRealPrice > displayPrice && (
                <p className="text-gray-400 line-through">
                  ₹{displayRealPrice?.toFixed(0)}
                </p>
              )}
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                In Stock
              </span>
            </div>


            {/* Variants */}
            <div className="mb-5">
              {product.productType !== 'Wallpaper' && (
                <>
                  <p className="text-brand-text font-medium mb-2">Size</p>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {variants.map((variant, i) => (
                      <button
                        key={i}
                        onClick={() => handleVariantSelect(variant)}
                        className={`border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-primary-500 hover:text-primary-500 transition ${
                          selectedVariant?.size === variant.size ? "bg-primary-100 border-primary-500" : ""
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Wallpaper Custom Sizing UI */}
              {product.productType === 'Wallpaper' && (
                <div className="mb-5 p-4 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4">
                  <p className="text-brand-text font-semibold text-sm uppercase tracking-wider">Custom Dimensions & Material</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Width (ft)</label>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={wallpaperWidth}
                        onChange={(e) => setWallpaperWidth(parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Height (ft)</label>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={wallpaperHeight}
                        onChange={(e) => setWallpaperHeight(parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-500">Select Wallpaper Material</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {materialsList.map((mat) => {
                        const isSelected = selectedMaterial?.materialName === mat.materialName;
                        return (
                          <button
                            type="button"
                            key={mat.materialName}
                            onClick={() => setSelectedMaterial(mat)}
                            className={`p-2.5 text-left border rounded-md transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-primary-500 bg-primary-50 text-primary-900 shadow-sm'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-primary-500'
                            }`}
                          >
                            <span className="text-xs font-semibold">{mat.materialName}</span>
                            <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-primary-700' : 'text-gray-500'}`}>
                              ₹{mat.pricePerSqFt} / sq. ft.
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-700">
                    <span>Total Wallpaper Area:</span>
                    <span className="font-semibold">{(wallpaperWidth * wallpaperHeight).toFixed(2)} sq. ft.</span>
                  </div>
                </div>
              )}

              <p className="text-brand-text font-medium mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {selectedVariant?.color.map((color, index) => {
                  const colorHex = getColorHex(color);
                  return (
                    <button
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      className={`border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-primary-500 hover:text-primary-500 transition text-left min-w-[64px] max-w-[200px] flex items-center gap-2 ${
                        selectedColor === color ? "bg-primary-100 border-primary-500 text-primary-600 font-medium" : ""
                      }`}
                    >
                      {colorHex && (
                        <span
                          className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"
                          style={{
                            backgroundColor: colorHex,
                            borderColor: colorHex === '#FFFFFF' || colorHex === 'transparent' ? '#D1D5DB' : colorHex
                          }}
                        />
                      )}
                      <span className="block line-clamp-2 leading-tight">{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector - 🔧 NOW FUNCTIONAL */}
            {/* <div className="mb-4">
              <p className="text-brand-text font-medium mb-2">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div> */}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 border border-primary-500 text-primary-500 font-semibold py-2 rounded-lg hover:bg-primary-50 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

            {/* SKU + Tags */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <span className="font-medium text-brand-text">SKU:</span> {productCode}
              </p>
              <p>
                <span className="font-medium text-brand-text">Tags:</span> {tags.join(", ")}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <div className="flex gap-8 border-b border-gray-200 pb-2 mb-6 overflow-x-auto">
            {[ "additional", "review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 font-medium capitalize ${
                  activeTab === tab
                    ? "text-primary-500 border-b-2 border-primary-500"
                    : "text-gray-500 hover:text-primary-500"
                }`}
              >
                {tab === "additional" ? "Additional Information" : tab}
              </button>
            ))}
          </div>
{/* ❌ DESCRIPTION CONTENT REMOVED */}
{/*
{activeTab === "description" && (
  <div className="text-gray-600 text-sm leading-relaxed">
    {description}
  </div>
)}
*/}

          {activeTab === "additional" && (
            <table className="w-full text-sm text-brand-text border">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium w-1/3">Skin Type</td>
                  <td className="p-3">{additionalInfo.skinType}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Shelf Life</td>
                  <td className="p-3">{additionalInfo.shelfLife} months</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Application Time</td>
                  <td className="p-3">{additionalInfo.applicationTime || "Morning to Evening"}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Concern</td>
                  <td className="p-3">{additionalInfo?.usageInstructions || "NA"}</td>
                </tr>
              </tbody>
            </table>
          )}
          {activeTab === "review" && (
            <div className="text-gray-600 text-sm">
              <ReviewTab productId={product._id} reviews={reviews} setReviews={(newReviews) => product.reviews = newReviews} />
            </div>
          )}
        </div>
{showPopup && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
    <div className="bg-brand-bg rounded-2xl px-6 py-5 shadow-2xl flex flex-col items-center gap-4 text-center max-w-[90%] md:max-w-md">

      {/* Success Icon */}
      <div className="bg-green-100 text-green-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl">
        ✓
      </div>

      {/* Product Image */}
      <img
        src={mainImage}
        alt={product.name}
        className="w-24 h-24 object-contain rounded-md border"
      />

      {/* Product Details */}
      <div className="text-left w-full px-4">
        <p className="font-semibold text-brand-text text-sm">
          {product.name}
        </p>
        <p className="text-xs text-gray-600">
          Size: {selectedVariant?.size}
        </p>
        <p className="text-xs text-gray-600">
          Color: {selectedColor}
        </p>
        <p className="text-primary-500 font-semibold text-sm mt-1">
          ₹{selectedVariant?.price}
        </p>
      </div>

      {/* Message */}
      <p className="text-green-600 font-medium text-sm">
        Added to cart successfully!
      </p>

      {/* Buttons – SMALL TEXT + ONE LINE */}
      <div className="flex gap-3 w-full px-4">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 bg-primary-500 text-white py-2 rounded-lg text-sm font-medium"
        >
          Go to Cart
        </button>

        <button
          onClick={() => setShowPopup(false)}
          className="flex-1 border py-2 rounded-lg text-sm font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}



        {/* Related Products */}
        <RelatedProduct categorySlug={category.slug} />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartActions } from "../../hooks/useCartActions";

export default function ProductCard({ product, onProductClick }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCartActions();

  const activeVariant = product?.variants;
  const size = activeVariant?.size;
  // const color = activeVariant?.color; // Add color to activeVariant
  const color = Array.isArray(activeVariant?.color)
    ? activeVariant.color[0]
    : activeVariant?.color;
  console.log("Active Variant Color:", product);
  const [quantity, setQuantity] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const item = cartItems.find(
      (i) => i.id === product._id && i.size === size && i.color === color // Including color in cart matching
    );
    setQuantity(item?.quantity || 0);
  }, [cartItems, size, color, product._id]);
  console.log("cartItems:", cartItems);
  console.log("ProductCard Color:", color);
  // const discount = activeVariant?.realPrice
  //   ? Math.round(
  //       ((activeVariant.realPrice - activeVariant.price) / activeVariant.realPrice) * 100
  //     )
  //   : 0;
  const discount = product?.discount || 0;

  const handleProductClick = () => {
    if (onProductClick) onProductClick(product.slug);
    else navigate(`/product/${product.slug}`);
  };

  const handleAddToCart = async () => {
    const result = await addToCart(product, size, color, 1); // Passing color with addToCart
    if (result.success) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 10000);
    }
  };

  const handleBuyNow = async () => {
    const result = await addToCart(product, size, color, 1); // Passing color with addToCart
    if (result.success) {
      navigate("/cart");
    }
  };

  const handleIncrement = async () => {
    const newQty = quantity + 1;
    await updateQuantity(product._id, size, color, newQty); // Passing color in updateQuantity
  };

  const handleDecrement = async () => {
    if (quantity <= 1) {
      await removeFromCart(product._id, size, color); // Passing color in removeFromCart
      return;
    }
    const newQty = quantity - 1;
    await updateQuantity(product._id, size, color, newQty); // Passing color in updateQuantity
  };

  return (
    <div
      className="group bg-brand-bg/95 backdrop-blur-sm border border-primary-100 rounded-2xl shadow-[0_4px_20px_rgba(255,165,0,0.05)] hover:shadow-[0_8px_30px_rgba(255,165,0,0.15)] hover:-translate-y-1 transition-all duration-300 relative p-3 md:p-4 flex flex-col justify-between overflow-hidden h-full min-h-[350px] md:min-h-0"
    >


      {/* ❤️ Heart Icon */}
      <div className="absolute top-3 right-3 z-20 text-primary-500 cursor-pointer opacity-80 hover:opacity-100 transition text-lg">
        <FaHeart />
      </div>

      {/* 🔥 Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
          {discount}% OFF
        </div>
      )}

      {/* 🖼 Product Image */}
      <div
        className="w-full h-36 md:h-36 flex justify-center items-center mb-4 cursor-pointer overflow-hidden rounded-xl bg-gray-50/50"
        onClick={handleProductClick}
      >
        <img
          src={product.pimage}
          alt={product.name}
          className="h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* 📝 Product Title */}
      <h3 className="text-base md:text-base font-semibold text-brand-text mb-2 group-hover:text-primary-600 transition-colors">
        <span className="block w-full line-clamp-2" title={product.name}>{product.name}</span>
      </h3>

      {/* 💰 Price + ⭐ Rating */}
      <div className="flex justify-between items-center mb-3 px-1 text-sm">
        <div className="flex items-center gap-1">
          <p className="text-primary-500 font-medium text-sm">
            ₹{activeVariant?.price}
          </p>
          <p className="text-gray-400 line-through text-xs">
            ₹{activeVariant?.realPrice?.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="ml-1 text-gray-600 text-xs">
            {product.rating}
          </span>
        </div>
      </div>

      {/* Popup when added to cart */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-brand-bg rounded-2xl px-6 py-5 shadow-2xl flex flex-col items-center gap-4 text-center max-w-[90%] md:max-w-md ">

            {/* ✅ Success Icon */}
            <div className="bg-green-100 text-green-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl">
              ✓
            </div>

            {/* ✅ Product Image */}
            <img
              src={product.pimage}
              alt={product.name}
              className="w-24 h-24 object-contain rounded-md border border-gray-200"
            />

            {/* ✅ Product Details */}
            <div className="text-left w-full px-4">
              <p className="font-semibold text-brand-text text-base">
                <span className="block w-full truncate" title={product.name}>{product.name}</span>
              </p>
              {color && (
                <p className="text-sm text-gray-600">
                  Color: {color}
                </p>
              )}

              {activeVariant?.size && (
                <p className="text-sm text-gray-600">Size: {activeVariant.size}</p>
              )}
              <p className="text-primary-500 font-medium mt-1 text-sm">
                ₹{activeVariant?.price}
              </p>
            </div>

            {/* ✅ Success Message */}
            <p className="text-green-600 font-medium text-sm">Added to cart successfully!</p>

            {/* ✅ Buttons */}
            {/* ✅ Buttons */}
            <div className="flex items-center gap-2 w-full px-4">
              <button
                onClick={() => navigate("/cart")}
                className="flex-1 bg-primary-500 text-white py-1.5 text-sm rounded-md font-medium hover:bg-primary-600 transition"
              >
                Go to Cart
              </button>

              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 border border-gray-300 py-1.5 text-sm rounded-md font-medium text-brand-text hover:bg-gray-100 transition"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🛒 Buttons */}
      {quantity > 0 ? (
        <div className="flex flex-col md:flex-row gap-1.5">
          <div className="flex justify-between items-center border border-primary-500 rounded-lg flex-1 overflow-hidden h-8 sm:h-9">
            <button
              onClick={handleDecrement}
              className="w-1/3 text-lg font-bold hover:bg-primary-100 text-primary-500 h-full flex items-center justify-center"
            >
              –
            </button>
            <span className="w-1/3 text-center font-medium text-xs sm:text-sm">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-1/3 text-lg font-bold hover:bg-primary-100 text-primary-500 h-full flex items-center justify-center"
            >
              +
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="flex-1 border border-primary-500 text-primary-500 font-semibold h-8 sm:h-9 rounded-lg hover:bg-primary-50 transition text-xs sm:text-sm"
          >
            Buy Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-1.5">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold h-8 sm:h-9 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all text-xs sm:text-sm shadow-md shadow-primary-500/20 active:scale-[0.98]"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 border-2 border-primary-200 text-primary-600 font-semibold h-8 sm:h-9 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-xs sm:text-sm active:scale-[0.98]"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
}

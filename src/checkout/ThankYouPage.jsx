import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, Truck, ArrowRight, Download, Copy, Check, ShoppingBag, Calendar, ShieldCheck } from "lucide-react";
import Axios from "../utils/Axios";
import logo from "../image/divya-mantra-logo-transparent.png";
import { trackMetaEvent, trackMetaPageView, cartToMetaParams } from "../utils/metaPixel";

export default function ThankYouPage() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 1. Fire Meta Pixel PageView and Purchase event
    trackMetaPageView();

    const getOrderDetails = async () => {
      if (location.state?.order) {
        setOrderData(location.state.order);
        setLoading(false);
        fireMetaPurchase(location.state.order);
        return;
      }

      try {
        setLoading(true);
        const response = await Axios.get(`/orders/getOrderById/${orderId}`);
        if (response.data?.success) {
          const fetchedOrder = response.data.order;
          setOrderData(fetchedOrder);
          fireMetaPurchase(fetchedOrder);
        } else {
          setError(response.data?.message || "Order not found");
        }
      } catch (err) {
        console.error("Error loading order for Thank You page:", err);
        setError("Unable to load order confirmation details.");
      } finally {
        setLoading(false);
      }
    };

    getOrderDetails();
  }, [orderId, location.state]);

  const fireMetaPurchase = (order) => {
    if (!order) return;
    const idToUse = order._id || order.id || orderId;
    if (!idToUse) return;

    try {
      const trackedOrders = JSON.parse(sessionStorage.getItem("tracked_meta_purchases") || "[]");
      if (trackedOrders.includes(idToUse)) {
        console.log(`[Meta Pixel] Order ${idToUse} already tracked in this session.`);
        return;
      }

      const items = order.items || [];
      const totalPayable = order.totalAmount || order.finalAmount || 0;

      trackMetaEvent("Purchase", {
        ...cartToMetaParams(items, totalPayable),
        order_id: idToUse,
      });

      trackedOrders.push(idToUse);
      sessionStorage.setItem("tracked_meta_purchases", JSON.stringify(trackedOrders));
    } catch (err) {
      console.error("Error firing Meta Purchase tracking:", err);
    }
  };

  const handleCopyOrderId = (id) => {
    if (!id) return;
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-primary-700 font-bold animate-pulse text-base">
            Confirming your order...
          </p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50 p-4">
        <div className="bg-brand-bg p-8 rounded-2xl shadow-xl border border-primary-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} />
          </div>
          <h2 className="text-2xl font-bold text-brand-text mb-2">Order Confirmed</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Thank you! Your order was successfully recorded.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(`/invoice/${orderId}`)}
              className="w-full py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition"
            >
              View Invoice
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-full py-3 bg-gray-100 text-brand-text rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Go to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normalize details
  const displayId = orderData.orderID || orderData._id || orderData.id || orderId;
  const rawId = orderData._id || orderData.id || orderId;
  const itemsList = orderData.items || [];
  const address = orderData.shippingAddress || {};

  const subtotal = Number(
    orderData.subtotal ||
      itemsList.reduce(
        (acc, item) => acc + (item.selectedVariant?.price || item.price || 0) * (item.quantity || 1),
        0
      )
  );
  const shippingCharge = orderData.shipping?.charges !== undefined
    ? Number(orderData.shipping.charges)
    : (orderData.shippingCharges !== undefined ? Number(orderData.shippingCharges) : 80);
  const discountAmount = Number(orderData.discountAmount || orderData.appliedCoupon?.discountAmount || 0);
  const grandTotal = Number(orderData.totalAmount || orderData.finalAmount || (subtotal + shippingCharge - discountAmount));

  const placedDate = orderData.placedAt
    ? new Date(orderData.placedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-amber-50/30 to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* SUCCESS BANNER CARD */}
        <div className="bg-brand-bg rounded-3xl p-6 sm:p-10 shadow-xl border border-primary-100 text-center relative overflow-hidden">
          {/* Subtle Decorative Backdrop Circle */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-100/50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Success Checkmark Badge */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-emerald-500 to-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transform transition-transform hover:scale-105 duration-300">
              <CheckCircle2 size={48} className="stroke-[2.5]" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-primary-950 tracking-tight mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 font-medium text-sm sm:text-base max-w-lg mx-auto">
            Thank you for shopping with <strong className="text-primary-700 font-bold">DivyaMantra</strong>. 
            {orderData.paymentMethod === "COD" 
              ? " Your Cash on Delivery order is confirmed and being prepared!"
              : " Your payment was successful and your order is confirmed!"}
          </p>

          {/* Order ID Pill */}
          <div className="mt-6 inline-flex items-center gap-2 bg-primary-50 border border-primary-200/80 px-4 py-2 rounded-2xl text-xs sm:text-sm text-primary-900">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-mono font-bold">{displayId}</span>
            <button
              onClick={() => handleCopyOrderId(displayId)}
              className="ml-1 text-primary-600 hover:text-primary-800 transition-colors"
              title="Copy Order ID"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* STATUS & DELIVERY INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-brand-bg rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase font-bold text-gray-400">Payment</p>
              <p className="text-xs sm:text-sm font-extrabold text-emerald-700">
                {orderData.paymentMethod === "COD" ? "Cash on Delivery (COD)" : "Paid Online (Razorpay)"}
              </p>
            </div>
          </div>

          <div className="bg-brand-bg rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Truck size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase font-bold text-gray-400">Estimated Delivery</p>
              <p className="text-xs sm:text-sm font-extrabold text-gray-800">3 - 5 Business Days</p>
            </div>
          </div>

          <div className="bg-brand-bg rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Calendar size={22} />
            </div>
            <div>
              <p className="text-[11px] uppercase font-bold text-gray-400">Placed On</p>
              <p className="text-xs sm:text-sm font-extrabold text-gray-800 truncate">{placedDate}</p>
            </div>
          </div>
        </div>

        {/* ORDER DETAILS & ADDRESS */}
        <div className="bg-brand-bg rounded-3xl p-6 sm:p-8 shadow-md border border-gray-100 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-primary-950 flex items-center gap-2 border-b pb-4">
            <ShoppingBag size={20} className="text-primary-600" />
            Ordered Items
          </h2>

          {/* Items list */}
          <div className="divide-y divide-gray-100">
            {itemsList.map((item, index) => {
              const product = item.product || item.productId || {};
              const itemName = product.name || item.name || item.selectedVariant?.name || "Spiritual Product";
              const imgUrl = product.pimages?.[0] || product.image || item.image || logo;
              const itemSize = item.selectedVariant?.size || item.size;
              const itemColor = item.selectedVariant?.color || item.color;
              const price = Number(item.selectedVariant?.price || item.price || 0);
              const qty = Number(item.quantity || 1);

              return (
                <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                  <img
                    src={imgUrl}
                    alt={itemName}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-gray-100 bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-brand-text truncate">
                      {itemName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {itemSize ? `Size: ${itemSize}` : ""} {itemColor ? `| Color: ${itemColor}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Qty: <span className="font-semibold text-gray-700">{qty}</span> × ₹{price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm sm:text-base font-extrabold text-primary-700">
                      ₹{(price * qty).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Address & Pricing breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
            <div>
              <h3 className="text-xs uppercase font-extrabold text-gray-400 tracking-wider mb-2">
                Shipping Address
              </h3>
              <p className="text-sm font-bold text-gray-900">{address.name || "Customer"}</p>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {address.street || address.flat || ""}<br />
                {address.city ? `${address.city}, ` : ""}{address.state ? `${address.state} - ` : ""}{address.postalCode || address.pincode || ""}<br />
                Phone: {address.phoneNumber || "N/A"}
              </p>
            </div>

            <div className="bg-primary-50/60 rounded-2xl p-4 space-y-2 text-xs sm:text-sm text-brand-text">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold">₹{shippingCharge.toFixed(2)}</span>
              </div>
              <div className="border-t border-primary-200/60 pt-2 flex justify-between text-base font-black text-primary-900">
                <span>Total Paid</span>
                <span className="text-primary-700">₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(`/invoice/${rawId}`, { state: { order: orderData } })}
            className="flex-1 py-3.5 px-5 bg-primary-600 text-white rounded-2xl font-extrabold hover:bg-primary-700 transition shadow-lg shadow-primary-600/25 flex items-center justify-center gap-2 text-sm"
          >
            <Download size={18} />
            View / Download Invoice
          </button>

          <button
            onClick={() => navigate(`/order/${rawId}`)}
            className="flex-1 py-3.5 px-5 bg-white text-primary-800 border-2 border-primary-200 rounded-2xl font-bold hover:bg-primary-50 transition flex items-center justify-center gap-2 text-sm"
          >
            <Truck size={18} />
            Track Order
          </button>

          <Link
            to="/"
            className="py-3.5 px-5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-bold transition flex items-center justify-center gap-2 text-sm"
          >
            Shop More
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}

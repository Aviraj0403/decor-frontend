import React, { useState, useEffect } from "react";
import { X, Check, AlertCircle } from "lucide-react";
import { getActiveOffers, applyDiscount } from "../services/offerApi";

export default function ApplyCouponPanel({ isOpen, onClose, onApply, appliedCoupon, totalAmount }) {
  const [coupon, setCoupon] = useState("");    
  const [error, setError] = useState(null); // Error handling
  const [offers, setOffers] = useState([]); // List of active offers
  const [loading, setLoading] = useState(true); // Loading state for fetching offers
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const activeOffers = await getActiveOffers(); // Fetch active offers
        setOffers(activeOffers);
      } catch (error) {
        console.error("Failed to fetch offers", error);
        setError("Failed to load offers.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchOffers();
      setError(null); // Clear any previous errors when panel opens
    }
  }, [isOpen]);

  const handleApply = async (code, offerName = "") => {
    if (code.trim() !== "") {
      setLoading(true);  // Show loading state

      try {
        const discountResult = await applyDiscount(totalAmount, code);
        // console.log("Discount Result:", discountResult); // Debugging the result
        if (discountResult) {
          onApply(discountResult, code, offerName || code);
        } else {
          setError("Invalid coupon code or error applying discount.");
        }
      } catch (error) {
        console.error("Error applying discount:", error);
        setError("An error occurred while applying the coupon.");
      } finally {
        setLoading(false);  // Hide loading state after the request
      }
    } else {
      setError("Please enter a coupon code.");
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-[1200] flex h-dvh w-full flex-col bg-[#D7D7D7] shadow-[-15px_0_45px_rgba(25,18,10,0.22)] sm:w-96 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-[#2D545E] p-5 text-white">
        <div>
          <h2 className="font-sans text-lg font-bold text-white">Coupons & Offers</h2>
          <p className="mt-0.5 text-[11px] text-white/80">Save more on your order</p>
        </div>
        <button
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-full bg-brand-bg/10 transition hover:bg-brand-bg/20"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        {appliedCoupon ? (
          <div className="flex flex-col items-center gap-2">
            <Check className="text-green-500" size={32} />
            <p className="text-green-600 font-semibold text-center">
              Coupon "{appliedCoupon}" Applied Successfully!
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-xl bg-[#2D545E] px-5 py-2.5 text-white transition hover:bg-[#103438]"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <p className="mb-1 text-sm leading-5 text-[#2D545E]">
              Enter your coupon code or choose one of our amazing offers:
            </p>

            {/* Custom Coupon Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="min-w-0 flex-1 rounded-xl border border-[#D7D7D7] bg-brand-bg p-3 text-sm outline-none transition focus:border-[#C99665] focus:ring-2 focus:ring-[#C99665]/15"
              />
              <button
                onClick={() => handleApply(coupon)}
                className="rounded-xl bg-[#2D545E] px-4 font-semibold text-white transition hover:bg-[#103438]"
              >
                Apply
              </button>
            </div>

            {/* Loading State */}
            {loading && <p className="mt-4 text-[#2D545E]">Loading offers...</p>}

            {/* Active Offers Section */}
            <div className="mt-4 flex flex-col gap-3">
              {!loading && offers.length === 0 ? (
                <p className="text-[#2D545E]">No active offers available.</p>
              ) : (
                offers.map((offer) => (
                  <div
                    key={offer._id}
                    className="relative flex cursor-pointer items-center justify-between rounded-xl border border-[#D7D7D7] bg-brand-bg p-4 shadow-sm transition hover:border-[#C99665] hover:shadow-md"
                    onClick={() => handleApply(offer.code, offer.name)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-wide text-[#2D545E] sm:text-base">
                        {offer.code}
                      </span>
                      <span className="text-xs text-[#2D545E] sm:text-sm">
                        {offer.name} - {offer.discountPercentage}% off
                      </span>
                    </div>
                    <button className="rounded-lg bg-[#E2B385] px-3 py-1.5 text-xs font-semibold text-[#103438] transition hover:bg-[#C99665] sm:text-sm">
                      Apply
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

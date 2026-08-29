import React from "react";
import { useQuery } from "@tanstack/react-query";
import { reviewAPI } from "../api/services";
import { Star } from "lucide-react";

export default function Reviews() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userReviews"],
    queryFn: async () => {
      const res = await reviewAPI.getUserReviews();
      return res.data;
    }
  });

  const reviews = data?.reviews || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-600 mb-6 font-serif">My Reviews</h1>

      {reviews.length === 0 ? (
        <div className="text-center py-12 text-zinc-500 border border-cream-dark bg-white rounded-2xl">
          <Star size={32} className="mx-auto text-zinc-300 mb-3" />
          <p className="font-medium text-sm font-sans">You haven't written any reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-5 border border-cream-dark rounded-xl bg-white shadow-sm hover:shadow-md transition duration-300"
            >
              <h2 className="font-semibold text-charcoal text-base font-serif">{rev.product?.name || "Product"}</h2>
              <div className="flex items-center gap-1 mt-1.5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="text-gold fill-gold" size={14} />
                ))}
                {[...Array(5 - rev.rating)].map((_, i) => (
                  <Star key={i} className="text-zinc-200" size={14} />
                ))}
              </div>
              <p className="text-zinc-600 mt-3 text-sm italic font-sans">"{rev.comment}"</p>
              {rev.createdAt && (
                <span className="text-[10px] text-zinc-400 block mt-3 font-sans">
                  Reviewed on {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

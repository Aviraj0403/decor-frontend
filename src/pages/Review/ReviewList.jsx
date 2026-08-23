import React from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteReview } from "../../services/reviewApi";
import { useAuth } from "../../context/AuthContext";
import fallbackLogo from "../../image/lifencolors-logo.webp";

const ReviewList = ({ reviews, onDeleteReview }) => {
  const { user } = useAuth();
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await deleteReview(reviewId);
      if (res.data?.success || res.status === 200) {
        toast.success("Review deleted");
        if (onDeleteReview) onDeleteReview(reviewId);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  if (safeReviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <div className="max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaStar className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-brand-text mb-2">No Reviews Yet</h3>
          <p className="text-gray-500">Be the first to share your experience with this product!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-brand-text mb-4">
        Customer Reviews ({safeReviews.length})
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safeReviews.map((review) => {
          const isOwnerOrAdmin = user && (
            (review.user?._id && review.user._id === user.id) ||
            ['admin', 'superadmin'].includes(user.roleType)
          );
          const userName = review.user?.userName || review.userName || "Customer";
          const userAvatar = review.user?.avatar || fallbackLogo;

          return (
            <div
              key={review._id}
              className="bg-brand-bg border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-primary-200 relative group"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-100"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-brand-text truncate">
                    {userName}
                  </h5>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`${i < review.rating ? "text-yellow-400" : "text-gray-300"
                            } text-sm`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }) : ''}
                    </span>
                  </div>
                </div>
                {isOwnerOrAdmin && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    title="Delete Review"
                    className="text-gray-400 hover:text-red-600 transition p-1.5 rounded-lg hover:bg-red-50"
                  >
                    <FaTrash size={14} />
                  </button>
                )}
              </div>
              <p className="text-brand-text text-sm leading-relaxed">
                {review.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewList;

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

const ReviewTab = ({ productId, reviews = [], setReviews }) => {
  const { user } = useAuth();
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  // Check if the user has already submitted a review safely
  const userHasReviewed = user && safeReviews.some(review => (review.user?._id || review.user) === user.id);

  const handleDeleteReview = (deletedId) => {
    if (typeof setReviews === 'function') {
      setReviews(prev => (Array.isArray(prev) ? prev.filter(r => r._id !== deletedId) : []));
    }
  };

  return (
    <div className="py-6">
      {/* Review List */}
      <ReviewList reviews={safeReviews} onDeleteReview={handleDeleteReview} />

      {/* Conditionally render Review Form if the user hasn't reviewed the product */}
      {!userHasReviewed && (
        <ReviewForm productId={productId} setReviews={setReviews} />
      )}

      {/* If the user has reviewed, show message */}
      {userHasReviewed && (
        <div className="text-center text-gray-500 mt-6 bg-gray-50 p-4 rounded-xl border">
          <p className="font-medium">You have already submitted a review for this product.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewTab;

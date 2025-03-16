"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/stores";
import { getDetailServiceThunk } from "@/stores/serviceManager/thunk";
import { useService } from "@/hooks/useService";

// Calculate rating distribution and average rating
const getRatingStats = (feedbacks: any) => {
  const distribution: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  let totalRating = 0;
  feedbacks.forEach((fb: { rating: number }) => {
    if (fb.rating >= 1 && fb.rating <= 5) {
      distribution[fb.rating]++;
      totalRating += fb.rating;
    }
  });
  const total = feedbacks.length;
  const averageRating = total > 0 ? totalRating / total : 0;
  return {
    distribution: Object.entries(distribution).map(([rating, count]) => ({
      rating: Number(rating),
      count: count as number,
      percentage: total > 0 ? ((count as number) / total) * 100 : 0,
    })),
    averageRating: averageRating.toFixed(1), // Returns string
    totalReviews: total,
  };
};

export const TreatmentDetailPage = () => {
  const { serviceDetail } = useService();
  const [ratingFilter, setRatingFilter] = useState(null);
  const [filteredFeedback, setFilteredFeedback] = useState(
    serviceDetail?.feedbacks
  );
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    dispatch(getDetailServiceThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (serviceDetail?.feedbacks) {
      setFilteredFeedback(serviceDetail.feedbacks);
    }
  }, [serviceDetail]);

  // Handle rating filter change
  const handleRatingFilter = (newRating: any) => {
    setRatingFilter(newRating);
    if (newRating === null) {
      setFilteredFeedback(serviceDetail?.feedbacks); // Show all
    } else {
      setFilteredFeedback(
        serviceDetail?.feedbacks.filter((fb) => fb.rating === newRating)
      );
    }
  };

  // Rating stats
  const {
    distribution: ratingDistribution,
    averageRating,
    totalReviews,
  } = getRatingStats(serviceDetail?.feedbacks || []);

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header Section */}
      <header className="bg-red-400 py-12 text-center">
        <h1 className="text-4xl font-bold text-rose-50">
          {serviceDetail?.serviceName}
        </h1>
        <p className="mt-2 text-lg text-red-100 max-w-2xl mx-auto">
          {serviceDetail?.description}
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-[1570px] mx-auto p-8">
        <div className="flex flex-wrap gap-6">
          {/* Service Image */}
          <div className="flex-1 min-w-[400px]">
            <img
              src={serviceDetail?.image}
              alt={serviceDetail?.serviceName}
              className="w-full h-auto rounded-lg object-cover max-h-[400px]"
            />
          </div>

          {/* Service Details */}
          <div className="flex-1 min-w-[400px]">
            <h2 className="text-2xl font-semibold text-red-400">
              Price: ${serviceDetail?.price.toFixed(2)}
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {serviceDetail?.description}
            </p>
            <button
              className={`mt-6 w-full py-3 text-rose-50 font-semibold rounded-md transition-colors duration-200 ${
                serviceDetail?.isActive
                  ? "bg-red-400 hover:bg-red-500"
                  : "bg-gray-300 cursor-not-allowed opacity-70"
              }`}
              disabled={!serviceDetail?.isActive}
              onClick={() => router.push(`/booking/${id}`)}
            >
              {serviceDetail?.isActive ? "Book Now" : "Unavailable"}
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        <hr className="my-12 border-gray-300" />
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-red-400">Customer Feedback</h3>
          {/* Average Rating */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-red-400">
              {averageRating}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(parseFloat(averageRating))
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-500">({totalReviews} reviews)</span>
          </div>
        </div>

        {/* Rating Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", 5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                handleRatingFilter(rating === "All" ? null : rating)
              }
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                ratingFilter === (rating === "All" ? null : rating)
                  ? "bg-red-400 text-rose-50"
                  : "bg-red-100 text-red-400 hover:bg-red-200"
              }`}
            >
              {rating === "All"
                ? "All"
                : `${rating} Star${
                    typeof rating === "number" && rating > 1 ? "s" : ""
                  }`}
            </button>
          ))}
        </div>

        {/* Google Play-style Rating Chart (Full Width) */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Rating Distribution
          </Typography>
          <Box>
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <Box
                key={rating}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ width: "60px", color: "gray" }}
                >
                  {rating} ⭐
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    height: "10px",
                    bgcolor: "rgb(229, 231, 235)",
                    borderRadius: "5px",
                    overflow: "hidden",
                    mx: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: `${percentage}%`,
                      height: "100%",
                      bgcolor: "rgb(248, 113, 113)",
                      transition: "width 0.3s ease-in-out",
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ width: "40px", textAlign: "right" }}
                >
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>
        </div>

        {/* Feedback List */}
        {filteredFeedback ? (
          filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100"
              >
                <div className="flex flex-col gap-4">
                  {/* User and Therapist Info */}
                  <div>
                    <p className="text-sm text-gray-500">
                      By{" "}
                      <span className="font-medium text-red-400">
                        {feedback.accountId.username}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Therapist{" "}
                      <span className="font-medium text-red-400">
                        {feedback.therapistId.accountId.username}
                      </span>
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-gray-800 text-base leading-relaxed">
                    "{feedback.comment}"
                  </p>

                  {/* Feedback Image (if present) */}
                  {feedback.images && (
                    <div className="mt-4">
                      <img
                        src={feedback.images}
                        alt="Feedback content"
                        className="w-full max-w-36 max-h-36 h-auto rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No feedback available for this rating.
            </p>
          )
        ) : (
          <p className="text-gray-600 text-center">Loading feedback...</p>
        )}
      </main>
    </div>
  );
};

export default TreatmentDetailPage;

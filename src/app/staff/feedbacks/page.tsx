"use client";

import { useState, useEffect } from "react";
import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import Image from "next/image";
import Swal from "sweetalert2";

export default function FeedbacksPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setIsLoading(true);
        const feedbacks = await api.get("/feedback");
        console.log(feedbacks.data);

        setData(feedbacks.data);
      } catch (err) {
        console.error("Failed to fetch feedbacks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const showFullComment = (comment) => {
    Swal.fire({
      title: "Customer Comment",
      text: comment,
      confirmButtonText: "Close",
      confirmButtonColor: "#3085d6",
    });
  };

  if (isLoading) return <div>Loading feedbacks...</div>;

  const columns = [
    {
      field: "accountId",
      header: "Username",
      renderCell: (row) => row.accountId?.username || "N/A",
    },
    {
      field: "accountId",
      header: "Email",
      renderCell: (row) => row.accountId?.email || "N/A",
    },
    {
      field: "serviceId",
      header: "Service",
      renderCell: (row) => row.serviceId?.serviceName || "N/A",
    },
    {
      field: "rating",
      header: "Rating",
      renderCell: (row) => (
        <div className="flex items-center">
          {row.rating}
          <span className="ml-1 text-yellow-400">★</span>
        </div>
      ),
    },
    {
      field: "comment",
      header: "Comment",
      renderCell: (row) => (
        <div className="flex items-center">
          <div className="max-w-xs truncate">{row.comment}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showFullComment(row.comment);
            }}
            className="ml-2 p-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View
          </button>
        </div>
      ),
    },
    {
      field: "images",
      header: "Image",
      renderCell: (row) =>
        row.images ? (
          <Image
            src={row.images}
            alt="Feedback"
            width={50}
            height={25}
            style={{
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          "No image"
        ),
    },
  ];

  return (
    <TableDisplay
      data={data}
      columns={columns}
      title="Customer Feedback"
      idField="_id"
      defaultRowsPerPage={5}
    />
  );
}

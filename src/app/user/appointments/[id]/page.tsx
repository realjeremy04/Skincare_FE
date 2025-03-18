"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/stores";
import { getAppointmentDetailThunk } from "@/stores/appointmentManager/thunk";
import { createFeedbackThunk } from "@/stores/feedbackManager/thunk";
import { useAppointment } from "@/hooks/useAppointment";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Divider,
  TextField,
  Rating,
} from "@mui/material";

export default function AppointmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { detail, loading } = useAppointment();
  const router = useRouter();

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [feedbackImage, setFeedbackImage] = useState<File | null>(null);
  const [feedbackPreview, setFeedbackPreview] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getAppointmentDetailThunk(id));
    }
  }, [dispatch, id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "#6b7280"; // gray-500
      case "In Progress":
        return "#f97316"; // orange-500
      case "Completed":
        return "#10b981"; // green-500
      case "Cancelled":
        return "#ef4444"; // red-500
      default:
        return "#374151"; // gray-700 (default)
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFeedbackImage(file);
      setFeedbackPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitFeedback = () => {
    if (!id || !rating || !comment) return;

    const formData = new FormData();
    formData.append("appointmentId", id);
    formData.append("rating", rating.toString());
    formData.append("comment", comment);
    if (feedbackImage) {
      formData.append("image", feedbackImage);
    }

    dispatch(createFeedbackThunk(formData));
    // Reset form sau khi submit nếu cần
    setRating(null);
    setComment("");
    setFeedbackImage(null);
    setFeedbackPreview(null);
  };

  if (!detail) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "rgb(254 241 242)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#f87171" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "rgb(254 241 242)",
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#f87171",
            mb: 4,
            textAlign: "center",
          }}
        >
          Appointment Details
        </Typography>

        <Paper
          sx={{
            p: 4,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            border: "1px solid #fee2e2",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Customer
            </Typography>
            <Typography variant="body1" sx={{ color: "#374151" }}>
              {detail.customerId.username} ({detail.customerId.email})
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Service
            </Typography>
            <Typography variant="body1" sx={{ color: "#374151" }}>
              {detail.serviceId.serviceName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              {detail.serviceId.description}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#f87171", fontWeight: "medium" }}
            >
              Price: ${detail.serviceId.price}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Date & Time
            </Typography>
            <Typography variant="body1" sx={{ color: "#374151" }}>
              Slot {detail.slotsId.slotNum}: {detail.slotsId.startTime} -{" "}
              {detail.slotsId.endTime}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Notes
            </Typography>
            <Typography variant="body1" sx={{ color: "#374151" }}>
              {detail.notes || "No notes available"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Status
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: getStatusColor(detail.status),
                fontWeight: "medium",
              }}
            >
              {detail.status}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Check-In Image
            </Typography>
            {detail.checkInImage ? (
              <img
                src={detail.checkInImage}
                alt="Check-In"
                style={{
                  maxWidth: "200px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                No check-in image available
              </Typography>
            )}
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Check-Out Image
            </Typography>
            {detail.checkOutImage ? (
              <img
                src={detail.checkOutImage}
                alt="Check-Out"
                style={{
                  maxWidth: "200px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                No check-out image available
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Amount
            </Typography>
            <Typography variant="body1" sx={{ color: "#374151" }}>
              ${detail.amount}
            </Typography>
          </Box>

          {detail.status === "Completed" && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#f87171", fontWeight: "bold", mb: 2 }}
                >
                  Leave Feedback
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Rating
                  </Typography>
                  <Rating
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                  />
                </Box>
                <TextField
                  label="Comment"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Upload Image (Optional)
                  </Typography>
                  {feedbackPreview && (
                    <img
                      src={feedbackPreview}
                      alt="Feedback Preview"
                      style={{
                        maxWidth: "200px",
                        borderRadius: "8px",
                        marginBottom: "8px",
                      }}
                    />
                  )}
                  <TextField
                    type="file"
                    onChange={handleImageUpload}
                    fullWidth
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#f87171",
                    "&:hover": { bgcolor: "#ef4444" },
                    color: "white",
                  }}
                  onClick={handleSubmitFeedback}
                  disabled={!rating || !comment || loading}
                >
                  Submit Feedback
                </Button>
              </Box>
            </>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              sx={{
                color: "#f87171",
                borderColor: "#f87171",
                "&:hover": {
                  bgcolor: "rgb(254 226 226)",
                  borderColor: "#f87171",
                },
              }}
              onClick={() => router.push("/user/appointments")}
            >
              Back to List
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

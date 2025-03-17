"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/stores";
import {
  getAppointmentDetailThunk,
  updateAppointmentThunk,
} from "@/stores/appointmentManager/thunk";
import { useAppointment } from "@/hooks/useAppointment";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function AppointmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { detail, loading } = useAppointment();
  const router = useRouter();

  const [status, setStatus] = useState("");
  const [checkInImage, setCheckInImage] = useState<File | null>(null);
  const [checkOutImage, setCheckOutImage] = useState<File | null>(null);
  const [checkInPreview, setCheckInPreview] = useState<string | null>(null);
  const [checkOutPreview, setCheckOutPreview] = useState<string | null>(null);
  const [canUpdateStatus, setCanUpdateStatus] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getAppointmentDetailThunk(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (detail) {
      setStatus(detail.status);

      // Logic kiểm tra có thể cập nhật status hay không
      if (detail.status === "Scheduled") {
        setCanUpdateStatus(true); // Cho phép chuyển sang "In Progress" mà không cần kiểm tra thời gian
      } else if (detail.status === "In Progress") {
        setCanUpdateStatus(true); // Cho phép chuyển sang "Completed" nếu có đủ ảnh
      } else {
        setCanUpdateStatus(false); // Không cho phép chỉnh sửa nếu là "Completed" hoặc "Cancelled"
      }
    }
  }, [detail]);

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

  const handleStatusChange = (event: any) => {
    const newStatus = event.target.value as string;

    if (detail?.status === "Scheduled" && newStatus === "In Progress") {
      setStatus(newStatus);
    } else if (
      detail?.status === "In Progress" &&
      newStatus === "Completed" &&
      (detail.checkInImage || checkInImage) &&
      (detail.checkOutImage || checkOutImage)
    ) {
      setStatus(newStatus);
    }
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "checkIn" | "checkOut"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "checkIn") {
        setCheckInImage(file);
        setCheckInPreview(previewUrl);
      } else {
        setCheckOutImage(file);
        setCheckOutPreview(previewUrl);
      }
    }
  };

  const handleUpdate = () => {
    if (!detail) return;

    const formData = new FormData();
    if (status && status !== detail.status) {
      formData.append("status", status);
    }
    if (checkInImage) {
      formData.append("checkInImage", checkInImage);
    }
    if (checkOutImage) {
      formData.append("checkOutImage", checkOutImage);
    }
    formData.append("notes", detail.notes || "");

    if (
      formData.has("status") ||
      formData.has("checkInImage") ||
      formData.has("checkOutImage") ||
      formData.get("notes") !== detail.notes
    ) {
      dispatch(updateAppointmentThunk({ id, req: formData as any }));
    }
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
            <FormControl fullWidth sx={{ mt: 1 }}>
              <Select
                value={status}
                onChange={handleStatusChange}
                disabled={!canUpdateStatus}
                sx={{ color: getStatusColor(status) }}
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled" disabled>
                  Cancelled
                </MenuItem>
              </Select>
            </FormControl>
            {detail.status === "In Progress" &&
              !(detail.checkInImage || checkInImage) &&
              !(detail.checkOutImage || checkOutImage) && (
                <Typography variant="body2" sx={{ color: "#6b7280", mt: 1 }}>
                  Both Check-In and Check-Out images are required to mark as
                  "Completed".
                </Typography>
              )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Check-In Image
            </Typography>
            {(checkInPreview || detail.checkInImage) && (
              <img
                src={checkInPreview || detail.checkInImage}
                alt="Check-In"
                style={{
                  maxWidth: "200px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            )}
            <TextField
              type="file"
              onChange={(e) => handleImageUpload(e as any, "checkIn")}
              sx={{ mt: 1 }}
              fullWidth
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ color: "#f87171", fontWeight: "bold" }}
            >
              Check-Out Image
            </Typography>
            {(checkOutPreview || detail.checkOutImage) && (
              <img
                src={checkOutPreview || detail.checkOutImage}
                alt="Check-Out"
                style={{
                  maxWidth: "200px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            )}
            <TextField
              type="file"
              onChange={(e) => handleImageUpload(e as any, "checkOut")}
              sx={{ mt: 1 }}
              fullWidth
            />
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

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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
              onClick={() => router.push("/therapist/appointments")}
            >
              Back to List
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#f87171",
                "&:hover": { bgcolor: "#ef4444" },
                color: "white",
                minWidth: "100px",
              }}
              onClick={handleUpdate}
              disabled={
                (!status && !checkInImage && !checkOutImage) ||
                loading ||
                detail.status === "Completed"
              }
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Update"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
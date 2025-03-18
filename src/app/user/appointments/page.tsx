"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/stores";
import { getAllAppointmentByCustomerThunk } from "@/stores/appointmentManager/thunk";
import { useAppointment } from "@/hooks/useAppointment";
import useAuth from "@/libs/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function AppointmentsPage() {
  const dispatch = useAppDispatch();
  const { appointment, loading } = useAppointment();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    dispatch(getAllAppointmentByCustomerThunk(user._id));
  }, [dispatch, user]);

  if (loading) {
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

  if (!appointment || appointment.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "rgb(254 241 242)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No appointments found.
        </Typography>
      </Box>
    );
  }

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "rgb(254 241 242)",
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#f87171",
            mb: 4,
            textAlign: "center",
          }}
        >
          Your Appointments
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            border: "1px solid #fee2e2",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Therapist
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Service
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Date & Time
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointment.map((appt) => (
                <TableRow
                  key={appt._id}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgb(254 226 226)",
                    },
                  }}
                >
                  <TableCell align="center">
                    {appt.therapistId.accountId.username}
                  </TableCell>
                  <TableCell align="center">
                    {appt.serviceId.serviceName}
                  </TableCell>
                  <TableCell align="center">
                    {`${appt.slotsId.startTime} - ${appt.slotsId.endTime}`}
                  </TableCell>
                  <TableCell align="center">${appt.amount}</TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        color: getStatusColor(appt.status),
                        fontWeight: "medium",
                      }}
                    >
                      {appt.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "#f87171",
                        borderColor: "#f87171",
                        "&:hover": {
                          bgcolor: "rgb(254 226 226)",
                          borderColor: "#f87171",
                        },
                      }}
                      onClick={() =>
                        router.push(`/user/appointments/${appt._id}`)
                      }
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

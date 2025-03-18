"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/stores";
import { getTransactionByCustomerThunk } from "@/stores/transactionManager/thunk";
import { useTransaction } from "@/hooks/useTransaction";
import useAuth from "@/libs/context/AuthContext";
import { useRouter } from "next/navigation";
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

export default function TransactionsPage() {
  const dispatch = useAppDispatch();
  const { transactions, loading } = useTransaction();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    dispatch(getTransactionByCustomerThunk(user?._id));
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

  if (!transactions || transactions.length === 0) {
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
          No transactions found.
        </Typography>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#6b7280"; // gray-500
      case "completed":
        return "#10b981"; // green-500
      case "failed":
        return "#ef4444"; // red-500
      default:
        return "#374151"; // gray-700
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
          Your Transactions
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
                  Transaction ID
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Customer Email
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Appointment ID
                </TableCell>
                <TableCell
                  sx={{ fontWeight: "bold", color: "#f87171" }}
                  align="center"
                >
                  Payment Method
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
                  Created At
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
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction._id}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgb(254 226 226)",
                    },
                  }}
                >
                  <TableCell align="center">{transaction._id}</TableCell>
                  <TableCell align="center">
                    {transaction.customerId.email}
                  </TableCell>
                  <TableCell align="center">
                    {transaction.appointmentId._id}
                  </TableCell>
                  <TableCell align="center">
                    {transaction.paymentMethod}
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        color: getStatusColor(transaction.status),
                        fontWeight: "medium",
                      }}
                    >
                      {transaction.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {new Date(transaction.createdAt).toLocaleString()}
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
                        router.push(
                          `/user/appointments/${transaction.appointmentId._id}`
                        )
                      }
                    >
                      View Appointment
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

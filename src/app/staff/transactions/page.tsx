"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";
import { role } from "@/libs/constants/role";

import Swal from "sweetalert2";
import useAuth from "@/libs/context/AuthContext";

export default function TransactionManagementPage() {
  const [transactions, setTransactions] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function fetchTransactions() {
      if (!loading && user && user.role.toLowerCase() === role.ADMIN.toLowerCase()) {
        try {
          const res = await api.get("/transaction");
          console.log("Fetched transactions:", res.data);
          setTransactions(res.data);
        } catch (error) {
          console.error("Error fetching transaction data:", error);
        }
      }
    }
    fetchTransactions();
  }, [user, loading]);

  const toggleStatus = async (transactionId, currentStatus) => {
    const actionText = currentStatus === "Completed" ? "mark as Pending" : "mark as Completed";
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${actionText} this transaction?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText}!`,
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/transaction/${transactionId}`, { status: newStatus });
        setTransactions((prev) =>
          prev.map((transaction) =>
            transaction._id === transactionId ? { ...transaction, status: newStatus } : transaction
          )
        );
        Swal.fire({
          title: "Success!",
          text: `Transaction has been updated to ${newStatus}.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error updating transaction status:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update transaction status.",
          icon: "error",
        });
      }
    }
  };

  const customActions = (row) => {
    const isCompleted = row.status === "Completed";

    return (
      <>
        <button
          onClick={() => !isCompleted && toggleStatus(row._id, row.status)} // Only trigger if not completed
          disabled={isCompleted} // Disable button when status is Completed
          style={{
            padding: "5px 10px",
            backgroundColor: isCompleted ? "#ccc" : "#4CAF50", // Grey when disabled, green when active
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isCompleted ? "not-allowed" : "pointer", // Change cursor based on state
            opacity: isCompleted ? 0.6 : 1, // Visual feedback for disabled state
          }}
        >
          {isCompleted ? "Completed" : "Mark Completed"}
        </button>
      </>
    );
  };

  const transformedData = transactions.map((transaction) => ({
    _id: transaction._id,
    customerId: transaction.customerId || "N/A",
    appointmentId: transaction.appointmentId || "N/A",
    paymentMethod: transaction.paymentMethod || "N/A",
    status: transaction.status || "N/A",
  }));

  const columns = [
    { field: "_id", header: "Transaction ID" },
    { field: "customerId", header: "Customer ID" },
    { field: "appointmentId", header: "Appointment ID" },
    { field: "paymentMethod", header: "Payment Method" },
    { field: "status", header: "Status" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role.toLowerCase() !== role.ADMIN.toLowerCase()) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>Only administrators can view transactions.</p>
      </div>
    );
  }

  return (
    <>
      {transformedData.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <TableDisplay
          data={transformedData}
          columns={columns}
          title="Transaction Management"
          idField="_id"
          defaultRowsPerPage={5}
          actions={customActions}
        />
      )}
    </>
  );
}
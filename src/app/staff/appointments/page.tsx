"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";

export default function AppointmentManagementPage() {
  const [appointments, setAppointments] = useState([]);
  const [updatedAppointments, setUpdatedAppointments] = useState(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/appointment");
        console.log("Fetched appointments:", res.data); // Debug fetched data
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    }
    fetchData();
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    if (updatedAppointments.has(appointmentId)) {
      alert("This appointment's status has already been updated.");
      return;
    }

    try {
      await api.put(`/appointment/${appointmentId}`, { status: newStatus });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: newStatus } : appt
        )
      );
      setUpdatedAppointments((prev) => new Set(prev).add(appointmentId));
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const customActions = (row) => {
    const isUpdated = updatedAppointments.has(row._id);
    const isCancelled = row.status === "Cancelled";
    const isCompleted = row.status === "Completed";

    return (
      <>
        <button
          onClick={() => updateStatus(row._id, "Completed")}
          disabled={isUpdated || isCancelled || isCompleted}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: isUpdated || isCancelled || isCompleted ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isUpdated || isCancelled || isCompleted ? "not-allowed" : "pointer",
          }}
        >
          Complete
        </button>
        <button
          onClick={() => updateStatus(row._id, "Cancelled")}
          disabled={isUpdated || isCancelled || isCompleted}
          style={{
            padding: "5px 10px",
            backgroundColor: isUpdated || isCancelled || isCompleted ? "#ccc" : "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isUpdated || isCancelled || isCompleted ? "not-allowed" : "pointer",
          }}
        >
          Cancel
        </button>
      </>
    );
  };

  // Transform nested data to match your appointment structure
  const transformedData = appointments.map((appt) => ({
    _id: appt._id,
    therapistId: appt.therapistId?._id || "N/A", // Handle potential missing data
    therapistName: appt.therapistId?.accountId || "Unknown",
    customerId: appt.customerId?._id || "N/A",
    customerName: appt.customerId?.username || "Unknown",
    slotId: appt.slotsId?._id || "N/A",
    slotTime: appt.slotsId ? `${appt.slotsId.startTime} - ${appt.slotsId.endTime}` : "N/A",
    serviceId: appt.serviceId?._id || "N/A",
    serviceName: appt.serviceId?.serviceName || "Unknown",
    checkInImage: appt.checkInImage || "N/A",
    checkOutImage: appt.checkOutImage || "N/A",
    notes: appt.notes || "No notes",
    amount: appt.amount || 0,
    status: appt.status || "Unknown",
  }));

  // Define columns based on transformed data
  const columns = [
    { field: "_id", headerName: "Appointment ID" },
    { field: "therapistId", headerName: "Therapist ID" },
    { field: "therapistName", headerName: "Therapist Account" },
    { field: "customerId", headerName: "Customer ID" },
    { field: "customerName", headerName: "Customer Name" },
    { field: "slotId", headerName: "Slot ID" },
    { field: "slotTime", headerName: "Slot Time" },
    { field: "serviceId", headerName: "Service ID" },
    { field: "serviceName", headerName: "Service Name" },
    { field: "checkInImage", headerName: "Check-In Image" },
    { field: "checkOutImage", headerName: "Check-Out Image" },
    { field: "notes", headerName: "Notes" },
    { field: "amount", headerName: "Amount" },
    { field: "status", headerName: "Status" },
  ];

  // Debug transformed data and columns
  console.log("Transformed data:", transformedData);
  console.log("Columns:", columns);

  return (
    <>
      {transformedData.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <TableDisplay
          data={transformedData}
          columns={columns}
          title="Appointment Management"
          idField="_id"
          defaultRowsPerPage={5}
          actions={customActions}
        />
      )}
    </>
  );
}
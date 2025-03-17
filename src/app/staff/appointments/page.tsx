"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

export default function AppointmentManagementPage() {
  const [appointments, setAppointments] = useState([]);
  const [updatedAppointments, setUpdatedAppointments] = useState(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/appointment");
        console.log("Fetched appointments:", res.data);
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    }
    fetchData();
  }, []);

  const updateStatus = async (appointmentId, newStatus) => {
    if (updatedAppointments.has(appointmentId)) {
      Swal.fire({
        title: "Warning!",
        text: "This appointment's status has already been updated.",
        icon: "warning",
        confirmButtonColor: "#f44336",
      });
      return;
    }

    const actionText = newStatus === "Completed" ? "complete" : "cancel";
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${actionText} this appointment?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} it!`,
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/appointment/${appointmentId}`, { status: newStatus });
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === appointmentId ? { ...appt, status: newStatus } : appt
          )
        );
        setUpdatedAppointments((prev) => new Set(prev).add(appointmentId));
        Swal.fire({
          title: "Success!",
          text: `Appointment has been ${actionText}ed.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error updating appointment status:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update appointment status.",
          icon: "error",
        });
      }
    }
  };

  const customActions = (row) => {
    const isUpdated = updatedAppointments.has(row._id);
    const isCancelled = row.status === "Cancelled";
    const isCompleted = row.status === "Completed";

    return (
      <>
        <IconButton
          onClick={() => updateStatus(row._id, "Completed")}
          disabled={isUpdated || isCancelled || isCompleted}
          sx={{
            color: isUpdated || isCancelled || isCompleted ? "#ccc" : "#4CAF50",
            "&:hover": {
              color: isUpdated || isCancelled || isCompleted ? "#ccc" : "#388E3C",
            },
          }}
          title="Complete Appointment"
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton
          onClick={() => updateStatus(row._id, "Cancelled")}
          disabled={isUpdated || isCancelled || isCompleted}
          sx={{
            color: isUpdated || isCancelled || isCompleted ? "#ccc" : "#f44336",
            "&:hover": {
              color: isUpdated || isCancelled || isCompleted ? "#ccc" : "#d32f2f",
            },
          }}
          title="Cancel Appointment"
        >
          <CancelIcon />
        </IconButton>
      </>
    );
  };

  const truncateId = (id) => {
    if (typeof id !== "string" || id.length <= 10) return id;
    return `${id.slice(0, 7)}....`;
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    const date = new Date(time);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMinutesToHrMins = (minutes) => {
    if (minutes === undefined || minutes === null || isNaN(minutes)) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr - ${remainingMinutes} mins`;
  };

  const transformedData = appointments.map((appt) => ({
    _id: truncateId(appt._id),
    therapistId: truncateId(appt.therapistId?._id || "N/A"),
    therapistName: appt.therapistId?.accountId || "Unknown",
    customerId: truncateId(appt.customerId?._id || "N/A"),
    customerName: appt.customerId?.username || "Unknown",
    slotId: truncateId(appt.slotsId?._id || "N/A"),
    slotTime: appt.slotsId
      ? `${formatTime(appt.slotsId.startTime)} - ${formatTime(appt.slotsId.endTime)}`
      : "N/A",
    serviceId: truncateId(appt.serviceId?._id || "N/A"),
    serviceName: appt.serviceId?.serviceName || "Unknown",
    checkInImage: appt.checkInImage ? (
      <img
        src={appt.checkInImage}
        alt="Check-In"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
        onError={(e) => (e.target.src = "N/A")}
      />
    ) : (
      "N/A"
    ),
    checkOutImage: appt.checkOutImage ? (
      <img
        src={appt.checkOutImage}
        alt="Check-Out"
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
        onError={(e) => (e.target.src = "N/A")}
      />
    ) : (
      "N/A"
    ),
    notes: appt.notes || "No notes",
    amount: formatMinutesToHrMins(appt.amount),
    status: appt.status || "Unknown",
  }));

  const columns = [
    { field: "_id", header: "Appointment ID" },
    { field: "therapistId", header: "Therapist ID" },
    { field: "therapistName", header: "Therapist Account" },
    { field: "customerId", header: "Customer ID" },
    { field: "customerName", header: "Customer Name" },
    { field: "slotId", header: "Slot ID" },
    { field: "slotTime", header: "Slot Time" },
    { field: "serviceId", header: "Service ID" },
    { field: "serviceName", header: "Service Name" },
    { field: "checkInImage", header: "Check-In Image" },
    { field: "checkOutImage", header: "Check-Out Image" },
    { field: "notes", header: "Notes" },
    { field: "amount", header: "Duration" },
    { field: "status", header: "Status" },
  ];

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
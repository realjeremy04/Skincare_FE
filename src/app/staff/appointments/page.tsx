"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";

import { role } from "@/libs/constants/role";
import useAuth from "@/libs/context/AuthContext";

export default function AppointmentManagementPage() {
  const [appointments, setAppointments] = useState([]);
  const [updatedAppointments, setUpdatedAppointments] = useState(new Set());
  const [therapists, setTherapists] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [slots, setSlots] = useState([]);
  const [services, setServices] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!loading && user && user.role.toLowerCase() === role.ADMIN.toLowerCase()) {
        try {
          const apptRes = await api.get("/appointment");
          setAppointments(apptRes.data);

          const therapistRes = await api.get("/therapist");
          setTherapists(therapistRes.data);

          const accountRes = await api.get("/account");
          const customerAccounts = accountRes.data.filter(
            (account) => account.role === role.CUSTOMER
          );
          setCustomers(customerAccounts);

          const slotsRes = await api.get("/slots");
          setSlots(slotsRes.data);

          const serviceRes = await api.get("/service");
          setServices(serviceRes.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [user, loading]);

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

  const addAppointment = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Appointment",
      html: `
        <select id="therapistId" class="swal2-select" required>
          <option value="" disabled selected>Select Therapist</option>
          ${therapists.map(t => `<option value="${t._id}">${t.accountId || t._id}</option>`).join('')}
        </select>
        <select id="customerId" class="swal2-select" required>
          <option value="" disabled selected>Select Customer</option>
          ${customers.map(c => `<option value="${c._id}">${c.username || c._id}</option>`).join('')}
        </select>
        <select id="slotsId" class="swal2-select" required>
          <option value="" disabled selected>Select Slot</option>
          ${slots.map(s => `<option value="${s._id}">${s.startTime ? new Date(s.startTime).toLocaleString() : s._id}</option>`).join('')}
        </select>
        <select id="serviceId" class="swal2-select" required>
          <option value="" disabled selected>Select Service</option>
          ${services.map(s => `<option value="${s._id}">${s.serviceName || s._id}</option>`).join('')}
        </select>
        <input id="amount" class="swal2-input" type="number" placeholder="Duration (minutes)" required>
        <textarea id="notes" class="swal2-textarea" placeholder="Notes (optional)"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Appointment",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const therapistId = document.getElementById("therapistId").value;
        const customerId = document.getElementById("customerId").value;
        const slotsId = document.getElementById("slotsId").value;
        const serviceId = document.getElementById("serviceId").value;
        const amount = parseInt(document.getElementById("amount").value);
        const notes = document.getElementById("notes").value;

        if (!therapistId || !customerId || !slotsId || !serviceId || isNaN(amount)) {
          Swal.showValidationMessage("Please select all required fields and enter a valid amount.");
          return false;
        }

        return { therapistId, customerId, slotsId, serviceId, amount, notes, status: "Scheduled" };
      },
    });

    if (formValues) {
      try {
        const res = await api.post("/appointment", formValues);
        setAppointments((prev) => [...prev, res.data]);
        Swal.fire({
          title: "Success!",
          text: "Appointment has been added.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error adding appointment:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add appointment.",
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
    { field: "customerName", header: "Customer Name" },
    { field: "slotTime", header: "Slot Time" },
    { field: "serviceName", header: "Service Name" },
    { field: "checkInImage", header: "Check-In Image" },
    { field: "checkOutImage", header: "Check-Out Image" },
    { field: "notes", header: "Notes" },
    { field: "amount", header: "Duration" },
    { field: "status", header: "Status" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role.toLowerCase() !== role.ADMIN.toLowerCase()) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>Only administrators can view and manage appointments.</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <button
          onClick={addAppointment}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Appointment
        </button>
      </div>
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
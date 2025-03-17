"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ServiceManagementPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/service");
        console.log("Fetched services:", res.data);
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    }
    fetchData();
  }, []);

  const toggleActiveStatus = async (serviceId, currentStatus) => {
    const actionText = currentStatus ? "deactivate" : "activate";
    const newStatus = !currentStatus;

    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${actionText} this service?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} it!`,
    });

    if (result.isConfirmed) {
      try {
        await api.put(`/service/${serviceId}`, { isActive: newStatus });
        setServices((prev) =>
          prev.map((service) =>
            service._id === serviceId ? { ...service, isActive: newStatus } : service
          )
        );
        Swal.fire({
          title: "Success!",
          text: `Service has been ${actionText}d.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error updating service status:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update service status.",
          icon: "error",
        });
      }
    }
  };

  const addService = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Service",
      html: `
        <input id="serviceName" class="swal2-input" placeholder="Service Name" required>
        <input id="description" class="swal2-input" placeholder="Description" required>
        <input id="price" class="swal2-input" type="number" placeholder="Price" step="0.01" required>
        <input id="image" class="swal2-input" placeholder="Image URL" required>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Service",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      preConfirm: () => {
        const serviceName = document.getElementById("serviceName").value;
        const description = document.getElementById("description").value;
        const price = parseFloat(document.getElementById("price").value);
        const image = document.getElementById("image").value;

        if (!serviceName || !description || isNaN(price) || !image) {
          Swal.showValidationMessage("Please fill in all required fields correctly.");
          return false;
        }

        // Always send isActive as true for new services
        return { serviceName, description, price, isActive: true, image };
      },
    });

    if (formValues) {
      try {
        const res = await api.post("/service", formValues);
        setServices((prev) => [...prev, res.data]);
        Swal.fire({
          title: "Success!",
          text: "Service has been added.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error adding service:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add service.",
          icon: "error",
        });
      }
    }
  };

  const customActions = (row) => {
    const isActive = row.isActive;

    return (
      <>
        <button
          onClick={() => toggleActiveStatus(row._id, isActive)}
          style={{
            padding: "5px 10px",
            backgroundColor: isActive ? "#f44336" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isActive ? "Deactivate" : "Activate"}
        </button>
      </>
    );
  };

  const transformedData = services.map((service) => ({
    _id: service._id,
    serviceName: service.serviceName || "N/A",
    description: service.description || "N/A",
    price: service.price !== undefined ? `$${service.price}` : "N/A",
    isActive: service.isActive !== undefined ? service.isActive : "N/A", // Kept for backend use, not displayed
    image: service.image ? (
      <img
        src={service.image}
        alt={service.serviceName}
        style={{ width: "50px", height: "50px", objectFit: "cover" }}
      />
    ) : (
      "N/A"
    ),
  }));

  const columns = [
    { field: "_id", header: "Service ID" },
    { field: "serviceName", header: "Service Name" },
    { field: "description", header: "Description" },
    { field: "price", header: "Price", renderCell: (row) => row.price },
    { field: "image", header: "Image" },
  ];

  return (
    <>
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <button
          onClick={addService}
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
          Add Service
        </button>
      </div>
      {transformedData.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <TableDisplay
          data={transformedData}
          columns={columns}
          title="Service Management"
          idField="_id"
          defaultRowsPerPage={5}
          actions={customActions}
        />
      )}
    </>
  );
}
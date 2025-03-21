"use client";

import TableDisplay from "@/libs/components/TableDisplayer";
import api from "@/libs/hooks/axiosInstance";
import { useEffect, useState } from "react";
import { role } from "@/libs/constants/role";
import {
  filterAccountByRole,
  removeUneccessaryColumns,
} from "@/libs/helpers/FitlterAccountData";
import { renderActions } from "@/libs/components/RenderActionButton";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Swal from "sweetalert2";
import useAuth from "@/libs/context/AuthContext";

export default function EmployeesPage() {
  const [accounts, setAccounts] = useState([]);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
    const { user } = useAuth();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    dob: "", // Changed from null to empty string
    phone: "",
    password: "",
    role: role.STAFF, // Changed from CUSTOMER to STAFF
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/account");
      setAccounts(res.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load customer accounts",
      });
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await api.patch(`/account/${id}`, { isActive: !currentStatus });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Account status updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchData(); // Refresh the data
    } catch (error) {
      console.error("Error updating account status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update account status",
      });
    }
  };

  const handleRegisterOpen = () => {
    setOpenRegisterForm(true);
  };

  const handleRegisterClose = () => {
    setOpenRegisterForm(false);
    setNewUser({
      username: "",
      email: "",
      phone: "",
      dob: "", // Changed from null to empty string
      password: "",
      role: role.STAFF, // Changed from CUSTOMER to STAFF
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async () => {
    try {
      await api.post("/account", newUser);
      handleRegisterClose();
      fetchData(); // Refresh the data

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "New staff account created successfully", // Changed from "customer" to "staff"
          timer: 1500,
          showConfirmButton: false,
        });
      }, 300);
    } catch (error) {
      console.error("Error creating staff account:", error); // Changed from "customer" to "staff"
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Failed to create account",
      });
    }
  };

  const filterData = filterAccountByRole(accounts, [
    role.STAFF,
    role.ADMIN,
    role.THERAPIST,
  ]);
  const columns = removeUneccessaryColumns(filterData, [
    "avatar",
    "password",
    "__v",
    "updatedAt",
  ]);

  // Add custom column for isActive toggle
  const enhancedColumns = columns.map((col) =>
    col.field === "isActive"
      ? {
          ...col,
          renderCell: (row) => (
            <Switch
              checked={row.isActive}
              onChange={() => handleToggleActive(row._id, row.isActive)}
              color="primary"
            />
          ),
        }
      : col
  );
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
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleRegisterOpen}
        >
          Add New Staff
        </Button>
      </Box>

      <TableDisplay
        data={filterData}
        columns={enhancedColumns}
        title="Staff Accounts" // Changed from "Customer Accounts" to "Staff Accounts"
        idField="_id"
        defaultRowsPerPage={5}
        actions={renderActions}
      />

      {/* Register New User Dialog */}
      <Dialog
        open={openRegisterForm}
        onClose={handleRegisterClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            helperText="Required field"
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="user@example.com"
            helperText="Enter a valid email address"
            required
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            required
          />
          <TextField
            margin="dense"
            name="dob"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="outlined"
            value={newUser.dob}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            helperText="Format: YYYY-MM-DD"
            required
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newUser.password}
            onChange={handleInputChange}
            helperText="Enter a strong password"
            required
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            select
            fullWidth
            variant="outlined"
            value={newUser.role}
            onChange={handleInputChange}
            required
            SelectProps={{
              native: true,
            }}
          >
            <option value={role.STAFF}>Staff</option>
            <option value={role.ADMIN}>Admin</option>
            <option value={role.THERAPIST}>Therapist</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRegisterClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleRegisterSubmit}
            color="primary"
            variant="contained"
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useAuth from "@/libs/context/AuthContext";
import api from "@/libs/hooks/axiosInstance";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Profile() {
  const { user, setUser, loading: authLoading } = useAuth(); // Rename to avoid confusion
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [infoForm, setInfoForm] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formLoading, setFormLoading] = useState(false); // Local loading state for form submissions

  useEffect(() => {
    if (authLoading) return; // Wait for auth loading to finish
    if (user) {
      setInfoForm({
        username: user.username || "",
        email: user.email || "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        phone: user.phone || "",
      });
    } else {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoForm({ ...infoForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true); // Start form loading

    try {
      const response = await api.put("/account/updateProfile", {
        username: infoForm.username,
        dob: infoForm.dob,
        phone: infoForm.phone,
      });
      setUser(response.data.user);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully",
        confirmButtonColor: "#F38A7F",
      });
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Failed to update profile";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#F38A7F",
      });
      console.error("Update failed:", e);
    } finally {
      setFormLoading(false); // Stop form loading
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true); // Start form loading

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New passwords don't match",
        confirmButtonColor: "#F38A7F",
      });
      setFormLoading(false);
      return;
    }

    try {
      const response = await api.post("/account/changePassword", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Password updated successfully",
        confirmButtonColor: "#F38A7F",
      });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Failed to update password";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#F38A7F",
      });
      console.error("Password update failed:", e);
    } finally {
      setFormLoading(false); // Stop form loading
    }
  };

  // Show loading spinner while auth is initializing
  if (authLoading) {
    return (
      <Container maxWidth="md" className="py-12 flex justify-center items-center">
        <CircularProgress sx={{ color: "#F38A7F" }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="py-12">
      <Paper elevation={3} className="p-6 rounded-lg bg-white">
        <Box className="flex flex-col items-center gap-6">
          <Avatar
            alt={user?.username}
            src={user?.avatar || "/default-avatar.png"}
            sx={{ width: 120, height: 120, bgcolor: "#F38A7F" }}
            className="border-4 border-white shadow-md"
          />

          <Typography
            variant="h4"
            className="font-semibold"
            sx={{ color: "#F38A7F" }}
          >
            {user?.username || "Your Profile"}
          </Typography>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: "#F38A7F",
                fontWeight: 500,
                textTransform: "none",
                fontSize: "1.1rem",
              },
              "& .Mui-selected": { color: "#F38A7F" },
              "& .MuiTabs-indicator": { backgroundColor: "#F38A7F" },
            }}
          >
            <Tab label="Personal Information" />
            <Tab label="Change Password" />
          </Tabs>

          {/* Personal Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <form
              onSubmit={handleInfoSubmit}
              className="w-full flex flex-col gap-6"
            >
              <TextField
                label="Username"
                name="username"
                value={infoForm.username}
                onChange={handleInfoChange}
                fullWidth
                variant="outlined"
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#F38A7F" },
                    "&:hover fieldset": { borderColor: "#F38A7F" },
                    "&.Mui-focused fieldset": { borderColor: "#F38A7F" },
                  },
                  "& .MuiInputLabel-root": { color: "#F38A7F" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F38A7F" },
                }}
              />

              <TextField
                label="Email"
                name="email"
                value={infoForm.email}
                disabled
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#e5e7eb" },
                    "&:hover fieldset": { borderColor: "#e5e7eb" },
                    "&.Mui-disabled": {
                      "& fieldset": { borderColor: "#e5e7eb" },
                      color: "#6b7280",
                      backgroundColor: "#f3f4f6",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#F38A7F" },
                  "& .MuiInputLabel-root.Mui-disabled": { color: "#F38A7F" },
                }}
              />

              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={infoForm.dob}
                onChange={handleInfoChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#F38A7F" },
                    "&:hover fieldset": { borderColor: "#F38A7F" },
                    "&.Mui-focused fieldset": { borderColor: "#F38A7F" },
                  },
                  "& .MuiInputLabel-root": { color: "#F38A7F" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F38A7F" },
                }}
              />

              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={infoForm.phone}
                onChange={handleInfoChange}
                fullWidth
                variant="outlined"
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#F38A7F" },
                    "&:hover fieldset": { borderColor: "#F38A7F" },
                    "&.Mui-focused fieldset": { borderColor: "#F38A7F" },
                  },
                  "& .MuiInputLabel-root": { color: "#F38A7F" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F38A7F" },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  backgroundColor: "#F38A7F",
                  "&:hover": { backgroundColor: "#e57368" },
                  "&.Mui-disabled": {
                    backgroundColor: "#F38A7F",
                    opacity: 0.6,
                  },
                  textTransform: "none",
                  fontWeight: "medium",
                  padding: "12px",
                  fontSize: "1rem",
                }}
              >
                {formLoading ? (
                  <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </TabPanel>

          {/* Change Password Tab */}
          <TabPanel value={tabValue} index={1}>
            <form
              onSubmit={handlePasswordSubmit}
              className="w-full flex flex-col gap-6"
            >
              <TextField
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                fullWidth
                variant="outlined"
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#F38A7F" },
                    "&:hover fieldset": { borderColor: "#F38A7F" },
                    "&.Mui-focused fieldset": { borderColor: "#F38A7F" },
                  },
                  "& .MuiInputLabel-root": { color: "#F38A7F" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F38A7F" },
                }}
              />

              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                fullWidth
                variant="outlined"
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#F38A7F" },
                    "&:hover fieldset": { borderColor: "#F38A7F" },
                    "&.Mui-focused fieldset": { borderColor: "#F38A7F" },
                  },
                  "& .MuiInputLabel-root": { color: "#F38A7F" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F38A7F" },
                }}
              />

              <TextField
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                fullWidth
                variant="outlined"
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#F38A7F" },
                    "&:hover fieldset": { borderColor: "#F38A7F" },
                    "&.Mui-focused fieldset": { borderColor: "#F38A7F" },
                  },
                  "& .MuiInputLabel-root": { color: "#F38A7F" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F38A7F" },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={formLoading || authLoading} // Disable during form or auth loading
                sx={{
                  backgroundColor: "#F38A7F",
                  "&:hover": { backgroundColor: "#e57368" },
                  "&.Mui-disabled": {
                    backgroundColor: "#F38A7F",
                    opacity: 0.6,
                  },
                  textTransform: "none",
                  fontWeight: "medium",
                  padding: "12px",
                  fontSize: "1rem",
                }}
              >
                {formLoading ? (
                  <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
}
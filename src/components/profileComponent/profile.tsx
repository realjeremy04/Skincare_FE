"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import useAuth from "@/libs/context/AuthContext";
import api from "@/libs/hooks/axiosInstance";
import { AxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ProfileData {
  username: string;
  email: string;
  dob: string;
  phone: string;
  role: string;
}

// Schema validation với yup
const schema = yup.object().shape({
  username: yup
    .string()
    .test("max-words", "Username must not exceed 5 words", (value) =>
      value ? value.trim().split(/\s+/).length <= 5 : true
    )
    .required("Username is required"),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/,
      "Invalid email format"
    )
    .required("Email is required"),
  dob: yup
    .string()
    .required("Date of Birth is required")
    .test("valid-dob", "Date of Birth cannot be in the future", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      return selectedDate <= new Date();
    })
    .test("minimum-age", "You must be at least 13 years old", (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const minAgeDate = new Date(
        new Date().getFullYear() - 13,
        new Date().getMonth(),
        new Date().getDate()
      );
      return selectedDate <= minAgeDate;
    }),
  phone: yup
    .string()
    .matches(
      /^\d{9,15}$/,
      "Phone must be between 9-15 digits and contain only numbers"
    )
    .required("Phone is required"),
  role: yup.string().required("Role is required"),
});

const Profile = () => {
  const router = useRouter();
  const { user, checkAuthStatus } = useAuth();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: yupResolver(schema), // Đảm bảo có dòng này
  });

  useEffect(() => {
    const initProfile = async () => {
      try {
        const isAuthenticated = await checkAuthStatus();
        if (!isAuthenticated) {
          router.push("/login");
          return;
        }
        await fetchProfile();
      } catch (err) {
        setError("Failed to initialize profile");
      }
    };

    initProfile();
  }, [user, checkAuthStatus, router]);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/account/profile");
      const userData = response.data.user;

      if (!userData) {
        setError("Failed to fetch profile data");
        return;
      }

      setValue("username", userData.username || "");
      setValue("email", userData.email || "");
      setValue(
        "dob",
        userData.dob ? new Date(userData.dob).toISOString().split("T")[0] : ""
      );
      setValue("phone", userData.phone || "");
      setValue("role", userData.role || "");
    } catch (err) {
      setError("Failed to fetch profile data");
    }
  };

  const onSubmit = async (data: ProfileData) => {
    try {
      const updateData = {
        ...data,
        dob: data.dob.split("T")[0], // Định dạng lại DOB
      };

      if (user?._id) {
        await api.put(`/account/${user._id}`, updateData);
      }

      setSuccess("Profile updated successfully");
      setError("");
      fetchProfile();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to update profile. Please try again later.");
      }
      setSuccess("");
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgb(230, 209, 214) 0%,rgb(234, 213, 221) 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: "600px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              fontWeight: 600,
              color: "#2c3e50",
              mb: 6,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                background:
                  "linear-gradient(90deg,rgb(209, 85, 133) 0%,rgb(217, 117, 172) 100%)",
                borderRadius: "2px",
              },
            }}
          >
            Your&apos;s Profile
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label="Username"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#666",
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          top: 0,
                          "& legend": {
                            display: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label="Email"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#666",
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          top: 0,
                          "& legend": {
                            display: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label="Date of Birth"
                      type="date"
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#666",
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          top: 0,
                          "& legend": {
                            display: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#666",
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          top: 0,
                          "& legend": {
                            display: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      label="Role"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          color: "#666",
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          position: "relative",
                          transform: "none",
                          marginBottom: "8px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#f5f5f5",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          top: 0,
                          "& legend": {
                            display: "none",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    py: 1.5,
                    mt: 2,
                    background:
                      "linear-gradient(90deg,rgb(227, 99, 127) 0%,rgb(230, 103, 127) 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg,rgb(238, 136, 182) 0%,rgb(236, 127, 176) 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;

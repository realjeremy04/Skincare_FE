"use client";

import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/libs/hooks/axiosInstance";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  username: Yup.string()
    .min(3, "Username need to be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password need to be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password is not match")
    .required("Please confirm your password"),
  dob: Yup.string()
    .matches(
      /^\d{2}-\d{2}-\d{4}$/,
      "Date of birth must be in DD-MM-YYYY format"
    )
    .required("Date of birth is required")
    .test("is-valid-date", "Invalid date", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year &&
        year >= 1900 &&
        year <= new Date().getFullYear()
      );
    }),
  phone: Yup.string()
    .min(6, "Phone need to be at least 10 digits")
    .required("Phone is required"),
});

const RegisterForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      dob: "",
      phone: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setError("");
        const [day, month, year] = values.dob.split("-");
        const dobFormatted = `${year}-${month}-${day}`;

        const payload = {
          email: values.email,
          username: values.username,
          password: values.password,
          dob: dobFormatted,
          phone: values.phone
        };
        const response = await api.post("/account/register", payload);
        if (response.status === 201) {
          router.push("/login");
          Swal.fire({
            title: "Register Successful!",
            icon: "success",
          });
        }
      } catch (err) {
        console.error("Register error:", err); // Debug: Log the error
        setError("Register failed. Please try again");
        Swal.fire({
          title: "Error",
          text: "Register failed. Please try again",
          icon: "error",
        });
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submit event triggered"); // Debug: Check if form submits
        formik.handleSubmit();
      }}
      sx={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{
          "& .MuiInputLabel-root": { color: "E26169" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#FEE0D9" },
            "&.Mui-focused fieldset": { borderColor: "#E26169" },
          },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{
          "& .MuiInputLabel-root": { color: "E26169" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#FEE0D9" },
            "&.Mui-focused fieldset": { borderColor: "#E26169" },
          },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{
          "& .MuiInputLabel-root": { color: "E26169" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#FEE0D9" },
            "&.Mui-focused fieldset": { borderColor: "#E26169" },
          },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Confirm password"
        name="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        sx={{
          "& .MuiInputLabel-root": { color: "E26169" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#FEE0D9" },
            "&.Mui-focused fieldset": { borderColor: "#E26169" },
          },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Phone number"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone &&
          Boolean(formik.errors.phone)
        }
        helperText={
          formik.touched.phone && formik.errors.phone
        }
        sx={{
          "& .MuiInputLabel-root": { color: "E26169" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#FEE0D9" },
            "&.Mui-focused fieldset": { borderColor: "#E26169" },
          },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Date of Birth (DD-MM-YYYY)"
        name="dob"
        value={formik.values.dob}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.dob && Boolean(formik.errors.dob)}
        helperText={formik.touched.dob && formik.errors.dob}
        placeholder="DD-MM-YYYY"
        sx={{
          "& .MuiInputLabel-root": { color: "E26169" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#FEE0D9" },
            "&.Mui-focused fieldset": { borderColor: "#E26169" },
          },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          textTransform: "none",
          fontSize: "1rem",
          py: 1.5,
          mt: 3,
          backgroundColor: "#ff80ab",
          color: "white",
          "&:hover": {
            backgroundColor: "#f06292",
          },
        }}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;

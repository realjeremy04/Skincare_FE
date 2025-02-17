"use client";

import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  username: Yup.string()
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
    .required("Vui lòng nhập tên người dùng"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Dữ liệu gửi đi:", values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
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
        label="Tên người dùng"
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
        label="Mật khẩu"
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
        label="Xác nhận mật khẩu"
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
        Đăng ký
      </Button>
    </Box>
  );
};

export default RegisterForm;

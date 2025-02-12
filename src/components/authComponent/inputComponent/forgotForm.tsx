import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError("");
        setSuccess("");
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSuccess("Liên kết khôi phục mật khẩu đã được gửi đến email của bạn.");
      } catch (err) {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: "100%" }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        disabled={isLoading}
        InputLabelProps={{
          style: { color: "#FF909A" },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          py: 1.5,
          backgroundColor: "#FF909A",
          color: "white",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#E26169",
          },
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Gửi liên kết"}
      </Button>
    </Box>
  );
};

export default ForgotPassForm;
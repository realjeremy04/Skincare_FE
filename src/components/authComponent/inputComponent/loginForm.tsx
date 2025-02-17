"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Slide,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isLoading,
  setIsLoading,
  setError,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt"
      )
      .required("Mật khẩu là bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setError("");
        // Thực hiện logic đăng nhập ở đây
      } catch (err) {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
      {error && (
        <Slide direction="down" in={!!error}>
          <Alert severity="error" sx={{ width: "100%", mb: 1 }}>
            {error}
          </Alert>
        </Slide>
      )}

      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        autoFocus
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        disabled={isLoading}
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
        margin="normal"
        fullWidth
        name="password"
        label="Mật khẩu"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                disabled={isLoading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "E26169" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#FEE0D9" },
            "&.Mui-focused fieldset": { borderColor: "#E26169" },
          },
          "& .MuiFormHelperText-root": { color: "red" },
        }}
      />

      <div className="flex justify-end">
        <Button
          sx={{
            color: "#E26169",
            "&:hover": {
              color: "#FF909A",
              textDecoration: "underline",
            },
          }}
          onClick={() => router.push("/forgotPass")}
        >
          Quên mật khẩu
        </Button>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 1,
          mb: 1,
          backgroundColor: "#ff80ab",
          color: "white",
          "&:hover": {
            backgroundColor: "#f06292",
          },
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Đăng nhập"
        )}
      </Button>

      <div className="mb-3 text-center text-red-400">Hoặc</div>

      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{
          mb: 3,
          backgroundColor: "#ff9a98",
          color: "white",
          "&:hover": {
            backgroundColor: "#ffb6c1",
          },
        }}
        onClick={() => router.push("/register")}
      >
        Đăng ký
      </Button>
    </Box>
  );
};

export default LoginForm;

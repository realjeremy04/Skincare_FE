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
import useAuth from "@/libs/context/AuthContext";
import Swal from "sweetalert2";

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
  const { login } = useAuth(); // Get the login function from AuthContext

  const validationSchema = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password needs to have 6 characters")
      .required("Password is required"),
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
        // Use the login function from AuthContext
        await login(values.email, values.password);
        // Success is handled in AuthContext (redirects to /staff/services)
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
        });
      } catch (err: unknown) {
        console.error(err);
        setError("Login failed. Please try again");
        Swal.fire({
          title: "Error",
          text: "Login failed. Please try again",
          icon: "error",
        });
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
        label="Password"
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
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>

      <div className="mb-3 text-center text-red-400">Or</div>

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
        Register
      </Button>
    </Box>
  );
};

export default LoginForm;

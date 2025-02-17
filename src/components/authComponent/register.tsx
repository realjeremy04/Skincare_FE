"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import RegisterForm from "./inputComponent/registerForm";
import { useRouter } from "next/navigation";

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: isMobile ? 3 : 4,
          width: isMobile ? "90%" : "400px",
          borderRadius: "16px",
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "600",
            color: "#FF909A",
            textAlign: "center",
          }}
        >
          Tạo tài khoản
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 3,
            color: "#FF909A",
            textAlign: "center",
          }}
        >
          Điền đầy đủ thông tin bên dưới để tạo tài khoản
        </Typography>

        <RegisterForm />

        {/* Buttons for Register and Login */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            width: "100%",
          }}
        >
          <Button
            variant="text"
            onClick={() => router.back()}
            sx={{
              textTransform: "none",
              fontSize: "0.9rem",
              color: "#FF909A",
              fontWeight: "500",
              "&:hover": { textDecoration: "underline" },
              mt: 1,
            }}
          >
            Đã có tài khoản? Đăng nhập
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;

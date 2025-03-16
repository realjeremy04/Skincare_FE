"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import LoginForm from "./inputComponent/loginForm";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafaf9",
        position: "relative",
      }}
    >
      {/* Nút Home nằm góc trái trên */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
        }}
      >
        <Button
          variant="text"
          onClick={() => router.push("/")}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            color: "#FF909A",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Home
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: isMobile ? 2 : 4,
          width: isMobile ? "90%" : "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fafaf9",
        }}
      >
        <img src="/Skincare-Logo.png" className="w-40" alt="Logo" />

        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 1, fontWeight: "bold", color: "#FF909A" }}
        >
          Welcome back
        </Typography>

        <Typography variant="body2" sx={{ mb: 1, color: "#FF909A" }}>
          Login to continue
        </Typography>

        <LoginForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setError={setError}
          error={error}
        />
      </Paper>
    </Box>
  );
};

export default Login;

import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import ForgotPassForm from "./inputComponent/forgotForm";
import { useRouter } from "next/navigation";

const ForgotPass: React.FC = () => {
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
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2, fontWeight: "bold", color: "#FF909A" }}
        >
          Quên mật khẩu
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "#555", textAlign: "center" }}
        >
          Nhập email của bạn để nhận liên kết khôi phục mật khẩu.
        </Typography>
        <ForgotPassForm />
        <Button
          type="button"
          fullWidth
          variant="outlined"
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "1rem",
            color: "#FF909A",
            borderColor: "#FF909A",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255, 144, 154, 0.1)",
              borderColor: "#E26169",
              color: "#E26169",
            },
          }}
          onClick={() => router.back()}
        >
          Quay lại
        </Button>
      </Paper>
    </Box>
  );
};

export default ForgotPass;

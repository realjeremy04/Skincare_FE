"use client";
import React from "react";
import { Header } from "../../components/homeComponent/Header";
import { Footer } from "../../components/homeComponent/Footer";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Swal from "sweetalert2";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  message: Yup.string().required("Message is required"),
});

export const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: "Success!",
        text: "Thank you for your message! We’ll get back to you soon.",
        icon: "success"
      });
      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Fixed Header */}
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex flex-col mt-24 w-full bg-[#F9F6F2] grow-0 max-md:max-w-full overflow-hidden">
        {/* Hero Section */}
        <section className="w-full py-12 bg-[#F9F6F2] text-center">
          <Typography
            variant="h1"
            className="text-5xl font-bold text-[#333] mb-2"
          >
            Contact Us
          </Typography>
    
        </section>

        {/* Contact Info and Form Section */}
        <section className="w-full py-16 bg-[#F9F6F2]">
          <Box className="max-w-6xl mx-auto px-4">
            <Grid container spacing={4}>
              {/* Left: Contact Info */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  className="text-2xl font-semibold text-[#333] mb-6"
                >
                  Get in Touch
                </Typography>
                <Box className="flex flex-col gap-6">
                  <Box className="flex items-start gap-3">
                    <LocationOnIcon sx={{ color: "#F28C8C" }} />
                    <Box>
                      <Typography variant="h6" className="text-[#333] font-medium">
                        Address
                      </Typography>
                      <Typography variant="body2" className="text-[#666]">
                        123 Skincare Lane, Wellness City, 90210
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-start gap-3">
                    <PhoneIcon sx={{ color: "#F28C8C" }} />
                    <Box>
                      <Typography variant="h6" className="text-[#333] font-medium">
                        Phone
                      </Typography>
                      <Typography variant="body2" className="text-[#666]">
                        (555) 123-4567
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-start gap-3">
                    <EmailIcon sx={{ color: "#F28C8C" }} />
                    <Box>
                      <Typography variant="h6" className="text-[#333] font-medium">
                        Email
                      </Typography>
                      <Typography variant="body2" className="text-[#666]">
                        support@crystalcare.com
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right: Contact Form */}
              <Grid item xs={12} md={6}>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#666" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#E0E0E0" },
                        "&:hover fieldset": { borderColor: "#999" },
                        "&.Mui-focused fieldset": { borderColor: "#F28C8C" },
                      },
                      "& .MuiFormHelperText-root": { color: "#F28C8C" },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#666" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#E0E0E0" },
                        "&:hover fieldset": { borderColor: "#999" },
                        "&.Mui-focused fieldset": { borderColor: "#F28C8C" },
                      },
                      "& .MuiFormHelperText-root": { color: "#F28C8C" },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#666" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#E0E0E0" },
                        "&:hover fieldset": { borderColor: "#999" },
                        "&.Mui-focused fieldset": { borderColor: "#F28C8C" },
                      },
                      "& .MuiFormHelperText-root": { color: "#F28C8C" },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#666" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#E0E0E0" },
                        "&:hover fieldset": { borderColor: "#999" },
                        "&.Mui-focused fieldset": { borderColor: "#F28C8C" },
                      },
                      "& .MuiFormHelperText-root": { color: "#F28C8C" },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#F28C8C",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#E07B7B" },
                      padding: "12px 0",
                      fontSize: "1rem",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Box>
        </section>

        {/* Map Section */}
        <section className="w-full py-16 bg-[#F9F6F2]">
          <Box className="max-w-full mx-auto">
            <img
              src="https://via.placeholder.com/1200x400?text=Map+Placeholder"
              alt="Location Map"
              className="w-full h-auto"
            />
          </Box>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default ContactPage;
"use client";
import React from "react";
import { Header } from "../../components/homeComponent/Header";
import { Footer } from "../../components/homeComponent/Footer";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

export const ContactPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Placeholder for form submission (replace with your API call)
      console.log("Form submitted:", values);
      alert("Thank you for your message! We’ll get back to you soon.");
      formik.resetForm();
    },
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Fixed Header matching HomePage */}
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex flex-col mt-24 w-full bg-stone-50 grow-0 max-md:max-w-full overflow-hidden">
        {/* Contact Hero Section */}
        <section className="w-full py-16 bg-stone-50 text-center">
          <Typography
            variant="h2"
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We’re here to assist you with all your skincare needs. Reach out to
            our dedicated team for inquiries, bookings, or expert advice.
          </Typography>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-16 bg-stone-50">
          <Box
            className="max-w-3xl mx-auto px-4"
            sx={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
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
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "#999" },
                    "&.Mui-focused fieldset": { borderColor: "#F28C8C" }, // Figma’s pinkish-red
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
                    "& fieldset": { borderColor: "#ccc" },
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
                    "& fieldset": { borderColor: "#ccc" },
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
                  backgroundColor: "#F28C8C", // Figma’s pinkish-red button
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#E07B7B", // Slightly darker on hover
                  },
                  padding: "12px 0",
                  fontSize: "1rem",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Send Message
              </Button>
            </form>
          </Box>
        </section>

        {/* Contact Info Section */}
        <section className="w-full py-16 bg-stone-50 text-center">
          <Typography
            variant="h4"
            className="text-2xl font-semibold text-gray-800 mb-8"
          >
            Get in Touch
          </Typography>
          <Box className="max-w-4xl mx-auto flex flex-col md:flex-row justify-around gap-6 text-gray-600">
            <Box>
              <Typography variant="h6" className="font-semibold text-gray-700">
                Address
              </Typography>
              <Typography variant="body2">
                123 Skincare Lane, Wellness City, 90210
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold text-gray-700">
                Phone
              </Typography>
              <Typography variant="body2">(555) 123-4567</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="font-semibold text-gray-700">
                Email
              </Typography>
              <Typography variant="body2">support@crystalcare.com</Typography>
            </Box>
          </Box>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default ContactPage;
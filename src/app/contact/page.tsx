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
      // Placeholder for form submission logic (e.g., API call)
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
            className="text-4xl font-bold text-stone-800 mb-4"
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            className="text-lg text-stone-600 max-w-2xl mx-auto"
          >
            We’re here to assist you with all your skincare needs. Reach out to
            our expert team for inquiries, appointments, or personalized advice.
          </Typography>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-16 bg-stone-100">
          <Box
            className="max-w-3xl mx-auto px-4"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Typography
              variant="h4"
              className="text-2xl font-semibold text-stone-800 text-center"
            >
              Get in Touch
            </Typography>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{
                  "& .MuiInputLabel-root": { color: "stone.600" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "stone.300" },
                    "&:hover fieldset": { borderColor: "stone.400" },
                    "&.Mui-focused fieldset": { borderColor: "stone.600" },
                  },
                  "& .MuiFormHelperText-root": { color: "red" },
                }}
              />
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  "& .MuiInputLabel-root": { color: "stone.600" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "stone.300" },
                    "&:hover fieldset": { borderColor: "stone.400" },
                    "&.Mui-focused fieldset": { borderColor: "stone.600" },
                  },
                  "& .MuiFormHelperText-root": { color: "red" },
                }}
              />
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                sx={{
                  "& .MuiInputLabel-root": { color: "stone.600" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "stone.300" },
                    "&:hover fieldset": { borderColor: "stone.400" },
                    "&.Mui-focused fieldset": { borderColor: "stone.600" },
                  },
                  "& .MuiFormHelperText-root": { color: "red" },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#d6d3d1", // Stone-300 for a neutral tone
                  color: "#44403c", // Stone-700 for text
                  "&:hover": {
                    backgroundColor: "#a8a29e", // Stone-400 on hover
                  },
                  padding: "12px 0",
                  fontSize: "1rem",
                  textTransform: "none",
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
            className="text-2xl font-semibold text-stone-800 mb-6"
          >
            Our Contact Details
          </Typography>
          <Box className="max-w-3xl mx-auto flex flex-col md:flex-row justify-around gap-6">
            <Box>
              <Typography variant="h6" className="text-stone-700">
                Address
              </Typography>
              <Typography variant="body2" className="text-stone-600">
                123 Skincare Lane, Wellness City, 90210
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="text-stone-700">
                Phone
              </Typography>
              <Typography variant="body2" className="text-stone-600">
                (555) 123-4567
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="text-stone-700">
                Email
              </Typography>
              <Typography variant="body2" className="text-stone-600">
                support@skincarepro.com
              </Typography>
            </Box>
          </Box>
        </section>

        {/* Footer matching HomePage */}
        <Footer />
      </main>
    </div>
  );
};

export default ContactPage;
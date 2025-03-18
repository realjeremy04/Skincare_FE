"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface ProfileData {
  username: string;
  email: string;
  dob: string;
  phone: string;
  role: string;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    email: "",
    dob: "",
    phone: "",
    role: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setProfile({
        username: data.username,
        email: data.email,
        dob: new Date(data.dob).toISOString().split("T")[0],
        phone: data.phone,
        role: data.role,
      });
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error("Error fetching profile:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      await axios.put("http://localhost:8080/api/account", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Profile updated successfully");
      setError("");
    } catch (err) {
      setError("Failed to update profile");
      setSuccess("");
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile
          </Typography>

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

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  required
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={profile.dob}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  value={profile.role}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;

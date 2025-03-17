import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageShift } from "@/services/manageShift";

export const getAllShiftByTherapistThunk = createAsyncThunk(
  "getAllShiftByTherapist",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageShift.getAllShiftByTherapist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getAllShiftByAccountThunk = createAsyncThunk(
  "getAllShiftByAccount",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageShift.getAllShiftByAccount(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

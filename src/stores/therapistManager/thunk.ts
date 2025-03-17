import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageTherapist } from "@/services/manageTherapist";

export const getAllTherapistByServiceThunk = createAsyncThunk(
  "getAllTherapistByService",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageTherapist.getAllTherapistByService(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

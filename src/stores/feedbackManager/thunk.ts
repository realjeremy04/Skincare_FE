import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageFeedback } from "@/services/manageFeedback";

export const createFeedbackThunk = createAsyncThunk(
  "createFeedback",
  async (req: FormData, { rejectWithValue }) => {
    try {
      const data = await manageFeedback.createFeedback(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

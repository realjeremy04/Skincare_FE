import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageService } from "@/services/manageService";

export const getAllServiceThunk = createAsyncThunk(
  "getAllService",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageService.getAllService();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getDetailServiceThunk = createAsyncThunk(
  "getDetailService",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageService.getDetailService(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

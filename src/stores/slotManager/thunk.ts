import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageSlot } from "@/services/manageSlot";

export const getAllSlotThunk = createAsyncThunk(
  "getAllSlot",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageSlot.getAllSlots();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

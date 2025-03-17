import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageAppointment } from "@/services/manageAppointment";
import { UpdateAppointment } from "@/types/appointment";

export const getAllAppointmentByTherapistThunk = createAsyncThunk(
  "getAllAppointmentByTherapist",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageAppointment.getAllAppointmentByTherapist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getAppointmentDetailThunk = createAsyncThunk(
  "getAppointmentDetail",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageAppointment.getAppointmentDetail(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const updateAppointmentThunk = createAsyncThunk(
  "updateAppointment",
  async ({ id, req }: { id: string; req: FormData }, { rejectWithValue }) => {
    try {
      const data = await manageAppointment.updateAppointment(id, req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAppointmentByTherapistThunk,
  getAllAppointmentByCustomerThunk,
  getAppointmentDetailThunk,
  updateAppointmentThunk,
} from "./thunk";
import { Appointment } from "@/types/appointment";
import Swal from "sweetalert2";

type stateType = {
  appointment: Appointment[];
  detail: Appointment | null;
  loading: boolean;
};

const initialState: stateType = {
  appointment: [],
  detail: null,
  loading: false,
};

export const manageAppointmentSlice = createSlice({
  name: "manageAppointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointmentByTherapistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(getAllAppointmentByCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.appointment = action.payload;
      })
      .addCase(getAppointmentDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(updateAppointmentThunk.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Updated Appointment successfully.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "swal-popup-custom",
            title: "swal-title-custom",
            confirmButton: "swal-confirm-button-custom",
          },
        });
      })
      .addCase(updateAppointmentThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAppointmentDetailThunk.rejected, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:
            action.error.message ||
            "An error occurred while updating appointment.",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
          customClass: {
            popup: "swal-popup-custom",
            title: "swal-title-custom",
            confirmButton: "swal-confirm-button-custom",
          },
        });
      });
  },
});

export const {
  reducer: manageAppointmentReducer,
  actions: manageAppointmentActions,
} = manageAppointmentSlice;

import { createSlice } from "@reduxjs/toolkit";
import { createFeedbackThunk } from "./thunk";
import Swal from "sweetalert2";

type stateType = {
  loading: boolean;
};

const initialState: stateType = {
  loading: false,
};

export const manageFeedbackSlice = createSlice({
  name: "manageFeedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeedbackThunk.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Feedback successfully.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "swal-popup-custom",
            title: "swal-title-custom",
            confirmButton: "swal-confirm-button-custom",
          },
        });
      })
      .addCase(createFeedbackThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createFeedbackThunk.rejected, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: action.error.message || "An error occurred while feedback.",
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
  reducer: manageFeedbackReducer,
  actions: manageFeedbackActions,
} = manageFeedbackSlice;

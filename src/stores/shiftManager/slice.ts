import { createSlice } from "@reduxjs/toolkit";
import {
  getAllShiftByTherapistThunk,
  getAllShiftByAccountThunk,
} from "./thunk";
import { Shift } from "@/types/shift";
import Swal from "sweetalert2";

type stateType = {
  shift: Shift[];
  loading: boolean;
};

const initialState: stateType = {
  shift: [],
  loading: false,
};

export const manageShiftSlice = createSlice({
  name: "manageShift",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllShiftByTherapistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.shift = action.payload;
      })
      .addCase(getAllShiftByAccountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.shift = action.payload;
      });
  },
});

export const { reducer: manageShiftReducer, actions: manageShiftActions } =
  manageShiftSlice;

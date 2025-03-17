import { createSlice } from "@reduxjs/toolkit";
import { getAllSlotThunk } from "./thunk";
import { Slot } from "@/types/slots";
import Swal from "sweetalert2";

type stateType = {
  slot: Slot[];
  loading: boolean;
};

const initialState: stateType = {
  slot: [],
  loading: false,
};

export const manageSlotSlice = createSlice({
  name: "manageSlot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSlotThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.slot = action.payload;
    });
  },
});

export const { reducer: manageSlotReducer, actions: manageSlotActions } =
  manageSlotSlice;

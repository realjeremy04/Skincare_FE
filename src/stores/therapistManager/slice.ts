import { createSlice } from "@reduxjs/toolkit";
import { getAllTherapistByServiceThunk } from "./thunk";
import { Therapist } from "@/types/therapist";
import Swal from "sweetalert2";

type stateType = {
  therapist: Therapist[];
  loading: boolean;
};

const initialState: stateType = {
  therapist: [],
  loading: false,
};

export const manageTherapistSlice = createSlice({
  name: "manageTherapist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllTherapistByServiceThunk.fulfilled,
      (state, action) => {
        state.loading = false;
        state.therapist = action.payload;
      }
    );
  },
});

export const {
  reducer: manageTherapistReducer,
  actions: manageTherapistActions,
} = manageTherapistSlice;

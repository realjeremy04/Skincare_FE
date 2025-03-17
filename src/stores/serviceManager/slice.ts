import { createSlice } from "@reduxjs/toolkit";
import { getAllServiceThunk, getDetailServiceThunk } from "./thunk";
import { Services, ServiceDetail } from "@/types/services";
import Swal from "sweetalert2";

type stateType = {
  services: Services[];
  serviceDetail: ServiceDetail | null;
  loading: boolean;
};

const initialState: stateType = {
  services: [],
  serviceDetail: null,
  loading: false,
};

export const manageServiceSlice = createSlice({
  name: "manageService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getDetailServiceThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceDetail = action.payload.service;
      });
  },
});

export const { reducer: manageServiceReducer, actions: manageServiceActions } =
  manageServiceSlice;

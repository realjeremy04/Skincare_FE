import { createSlice } from "@reduxjs/toolkit";
import { createTransactionThunk, getTransactionByCustomerThunk } from "./thunk";
import { Transaction } from "@/types/transaction";
import Swal from "sweetalert2";

type stateType = {
  loading: boolean;
  transactions: Transaction[];
};

const initialState: stateType = {
  loading: false,
  transactions: [],
};

export const manageTransactionSlice = createSlice({
  name: "manageTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransactionThunk.fulfilled, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Transaction created successfully.",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "swal-popup-custom",
            title: "swal-title-custom",
            confirmButton: "swal-confirm-button-custom",
          },
        });
      })
      .addCase(createTransactionThunk.rejected, (state, action) => {
        state.loading = false;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:
            action.error.message ||
            "An error occurred while creating the transaction.",
          confirmButtonText: "OK",
          confirmButtonColor: "#d33",
          customClass: {
            popup: "swal-popup-custom",
            title: "swal-title-custom",
            confirmButton: "swal-confirm-button-custom",
          },
        });
      })
      .addCase(getTransactionByCustomerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.data;
      });
  },
});

export const {
  reducer: manageTransactionReducer,
  actions: manageTransactionActions,
} = manageTransactionSlice;

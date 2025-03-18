import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageTransaction } from "@/services/manageTransaction";
import { CreateTransaction } from "@/types/transaction";

export const createTransactionThunk = createAsyncThunk(
  "createTransaction",
  async (req: CreateTransaction, { rejectWithValue }) => {
    try {
      const data = await manageTransaction.createTransaction(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getTransactionByCustomerThunk = createAsyncThunk(
  "getTransactionByCustomer",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageTransaction.getTransactionByCustomer(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

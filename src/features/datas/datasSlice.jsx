/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../app/api";

const initialState = {
  balance: null,
  services: null,
  banner: null,
  topup: null,
  transactionHistory: null,
  transaction: null,
  status: "idle",
  statusTopup: "idle",
  error: null,
};
export const fetchBalance = createAsyncThunk("datas/fetchBalance", async () => {
  const response = await API.get("/balance");
  return response.data;
});
export const fetchServices = createAsyncThunk(
  "datas/fetchServices",
  async () => {
    const response = await API.get("/services");
    return response.data;
  }
);
export const fetchBanner = createAsyncThunk("datas/fetchBanner", async () => {
  try {
    const response = await API.get("/banner");
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const fetchTransactionHistory = createAsyncThunk(
  "datas/fetchTransactionHistory",
  async (offset) => {
    try {
      const response = await API.get(
        `/transaction/history?offset=0&limit=${offset}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const topUp = createAsyncThunk("datas/topUp", async (nominal) => {
  try {
    const response = await API.post("/topup", nominal);
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const Transaction = createAsyncThunk(
  "datas/transaction",
  async (nominal) => {
    try {
      const response = await API.post("/transaction", nominal);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const formatIDR = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);

const datasSlice = createSlice({
  name: "datas",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //balance
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBalance.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //service
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchServices.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //banner
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banner = action.payload;
      })
      .addCase(fetchBanner.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //topup
      .addCase(topUp.fulfilled, (state, action) => {
        state.topup = action.payload;
        state.statusTopup = "succeeded";
      })
      .addCase(topUp.pending, (state, action) => {
        state.statusTopup = "loading";
      })
      .addCase(topUp.rejected, (state, action) => {
        state.statusTopup = "failed";
        state.error = action.error.message;
      }) //history
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.transactionHistory = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTransactionHistory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //history
      .addCase(Transaction.fulfilled, (state, action) => {
        state.transaction = action.payload;
        state.status = "succeeded";
      })
      .addCase(Transaction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(Transaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getBalance = (state) => state.datas.balance;
export const getServices = (state) => state.datas.services;
export const getBanner = (state) => state.datas.banner;
export const getStatusTopup = (state) => state.datas.statusTopup;
export const getTransactionHistory = (state) => state.datas.transactionHistory;

export default datasSlice.reducer;

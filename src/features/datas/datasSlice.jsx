/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../app/api";

const initialState = {
  balance: {
    data: null,
    status: "idle",
    error: null,
  },
  services: {
    data: null,
    status: "idle",
    error: null,
  },
  banner: {
    data: null,
    status: "idle",
    error: null,
  },
  topup: {
    data: null,
    status: "idle",
    error: null,
  },
  transactionHistory: {
    data: null,
    status: "idle",
    error: null,
  },
  transaction: {
    data: null,
    status: "idle",
    error: null,
  },
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
        state.balance.data = action.payload;
        state.balance.status = "succeeded";
      })
      .addCase(fetchBalance.pending, (state, action) => {
        state.balance.status = "loading";
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.balance.status = "failed";
        state.balance.error = action.error.message;
      })
      //service
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services.data = action.payload;
        state.services.status = "succeeded";
      })
      .addCase(fetchServices.pending, (state, action) => {
        state.services.status = "loading";
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.services.status = "failed";
        state.services.error = action.error.message;
      })
      //banner
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banner.data = action.payload;
        state.banner.status = "succeeded";
      })
      .addCase(fetchBanner.pending, (state, action) => {
        state.banner.status = "loading";
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.banner.status = "failed";
        state.banner.error = action.error.message;
      })
      //topup
      .addCase(topUp.fulfilled, (state, action) => {
        state.topup.data = action.payload;
        state.topup.status = "succeeded";
      })
      .addCase(topUp.pending, (state, action) => {
        state.topup.status = "loading";
      })
      .addCase(topUp.rejected, (state, action) => {
        state.topup.status = "failed";
        state.topup.error = action.error.message;
      }) //history
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.transactionHistory.data = action.payload;
        state.transactionHistory.status = "succeeded";
      })
      .addCase(fetchTransactionHistory.pending, (state, action) => {
        state.transactionHistory.status = "loading";
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.transactionHistory.status = "failed";
        state.transactionHistory.error = action.error.message;
      })
      //history
      .addCase(Transaction.fulfilled, (state, action) => {
        state.transaction.data = action.payload;
        state.transaction.status = "succeeded";
      })
      .addCase(Transaction.pending, (state, action) => {
        state.transaction.status = "loading";
      })
      .addCase(Transaction.rejected, (state, action) => {
        state.transaction.status = "failed";
        state.transaction.error = action.error.message;
      });
  },
});

export const getBalanceData = (state) => state.datas.balance.data;
export const getBalanceStatus = (state) => state.datas.balance.status;
export const getServicesData = (state) => state.datas.services.data;
export const getServicesStatus = (state) => state.datas.services.status;
export const getBannerData = (state) => state.datas.banner.data;
export const getBannerStatus = (state) => state.datas.banner.status;

export const getTopupStatus = (state) => state.datas.topup.status;
export const getTransactionHistoryData = (state) =>
  state.datas.transactionHistory.data;

export default datasSlice.reducer;

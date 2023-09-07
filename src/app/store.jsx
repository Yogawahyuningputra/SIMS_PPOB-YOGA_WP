import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlice";
import authReducer from "../features/auth/authSlice";
import datasReducer from "../features/datas/datasSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    datas: datasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Untuk mengabaikan tipe data yang tidak dapat di-serialize
    }),
});

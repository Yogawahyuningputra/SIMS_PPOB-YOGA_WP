/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../app/api";
import { login } from "../auth/authSlice";
import axios from "axios";

const initialState = {
  users: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  profile_image: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    try {
      const response = await API.post("/registration", userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error during registration:", error.response);
      } else if (error.request) {
        console.error(
          "Error during registration: Network Error",
          error.request.message
        );
      } else {
        console.error("Error during registration:", error);
      }
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { dispatch }) => {
    try {
      const response = await API.post("login", userData);
      const token = response.data.data.token;
      //set token in authSlice
      dispatch(login(token));

      return response.data;
    } catch (error) {
      console.error("Error during login:", error.response);
      return error.response.data;
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData) => {
    try {
      const response = await API.put("/profile/update", userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error Update User:", error.response);
      } else if (error.request) {
        console.error(
          "Error Update User: Network Error",
          error.request.message
        );
      } else {
        console.error("Error Update User:", error);
      }
    }
  }
);
export const uploadImageUser = createAsyncThunk(
  "user/uploadImageUser",
  async (userData) => {
    try {
      const formData = new FormData();
      formData.append("profile_image", userData.profile_image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await API.put("/profile/image", formData, config);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error Update User:", error.response);
      } else if (error.request) {
        console.error(
          "Error Update User: Network Error",
          error.request.message
        );
      } else {
        console.error("Error Update User:", error);
      }
    }
  }
);

export const fetchProfile = createAsyncThunk("user/fetchProfile", async () => {
  try {
    const response = await API.get("/profile");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //register user
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //login user
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update user
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadImageUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadImageUser.fulfilled, (state, action) => {
        state.profile_image = action.payload;
        state.status = "succeeded";
      })
      .addCase(uploadImageUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const { addUser, updateUser } = usersSlice.actions;
export const getProfile = (state) => state.users.users;
export const getStatusUser = (state) => state.users.status;

export default usersSlice.reducer;

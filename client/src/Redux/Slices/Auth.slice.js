import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosinstance from "../../Helpers/axiosinstance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const createAccount = createAsyncThunk(
  "/auth/createAccount",
  async (data, { rejectWithValue }) => {
    console.log("data into thunk", data);

    try {
      const response = axiosinstance.post("/api/users/signIn", data);
      toast.promise(response, {
        success: (resolvedPromise) => {
          return resolvedPromise.data.message;
        },
        loading: "Hold back tight, we are resgistering you",
        error: (rejctedPromise) => {
          return (
            rejctedPromise.response?.data.message || "something went wrong"
          );
        },
      });

      const signupresp = await response;
      return signupresp.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async (data, { rejectWithValue }) => {
    console.log("data into thunk", data);
    try {
      const response = axiosinstance.post("/api/users/login", data);

      toast.promise(response, {
        success: (resolvedPromise) => {
          return resolvedPromise.data.message;
        },
        loading: "Hold back tight, we are login you",
        error: (rejctedPromise) => {
          return (
            rejctedPromise.response?.data.message || "something went wrong"
          );
        },
      });

      const loginresp = await response;

      return loginresp.data;
    } catch (error) {
      console.log("error in login", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = axiosinstance.post("/api/users/logout");
      toast.promise(response, {
        success: "log out successfully",
        loading: "Logging Out",
        error: (rejctedPromise) => {
          return rejctedPromise.response.data.message;
        },
      });

      const logoutresp = await response;
      return logoutresp.data;
    } catch (error) {
      console.log("error in logout", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // reducer which will execute when the login thunk in fullfilled

      console.log("action", action.payload);
      state.isLoggedIn = true;
      state.data = action.payload?.data.userDetail;

      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem(
        "data",
        JSON.stringify(action.payload?.data.userDetail)
      );
    });

    builder.addCase(logout.fulfilled, (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.data = {};
    });
  },
});

export default AuthSlice.reducer;

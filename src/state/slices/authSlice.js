import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuth: localStorage.getItem("auth") || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log("action.payload", action.payload);
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("auth", action.payload.isAuth);
    },
    resetAuth: (state) => {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuth: false || localStorage.getItem("auth"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log("action.payload", action.payload);
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      localStorage.setItem("auth", true);
    },
    signOut: (state) => {
      state.token = null;
      state.isAuth = false;
      localStorage.setItem("auth", false);
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

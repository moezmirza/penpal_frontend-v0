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
      state.token = action.payload;
      state.isAuth = true;
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

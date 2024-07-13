import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;

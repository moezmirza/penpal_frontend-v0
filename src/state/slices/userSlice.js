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
    setCurrentUserProfileStatus: (state, action) => {
      let currUser = JSON.parse(localStorage.getItem("user"));
      currUser.profileComplete = action.payload;
      state.currentUser = currUser;
      localStorage.setItem("user", JSON.stringify(currUser));
    },
  },
});

export const { setCurrentUser, setCurrentUserProfileStatus } = userSlice.actions;
export default userSlice.reducer;

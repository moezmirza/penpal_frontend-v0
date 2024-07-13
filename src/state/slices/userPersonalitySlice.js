import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const userPersonalitySlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setUserPersonality: (state, action) => {
      console.log(action.payload);
      state.info = action.payload;
    },
  },
});

export const { setUserPersonality } = userPersonalitySlice.actions;
export default userPersonalitySlice.reducer;

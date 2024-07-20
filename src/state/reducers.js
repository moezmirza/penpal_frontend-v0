import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import userPersonalityReducer from "./slices/userPersonalitySlice";

const rootReducer = combineReducers({
  user: userReducer,
  userPersonality: userPersonalityReducer,
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import userPersonalityReducer from "./slices/userPersonalitySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userPersonality: userPersonalityReducer,
});

export default rootReducer;

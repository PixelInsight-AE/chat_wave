import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import roomReducer from "./slices/roomSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isValid: false,
  currentRoom: null,
};

const roomSlice = createSlice({
  initialState,
  name: "room",
  reducers: {
    setAccess(state, action) {
      state.isValid = action.payload;
    },
  },
});

export default roomSlice.reducer;
export const roomActions = roomSlice.actions;

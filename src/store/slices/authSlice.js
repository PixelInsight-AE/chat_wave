import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: "",
  id: "",
  status: "",
  avatar_url: "",
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login(state, action) {
      const { username, id, avatar_url } = action.payload;
      state.isAuthenticated = true;
      state.username = username;
      state.id = id;
      state.avatar_url = avatar_url;
    },
    logout() {
      return initialState;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  username: '',
  id: '',
  status: '',
  avatar_url: '',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
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
    authenticat(state) {
      state.isAuthenticated = true;
    },
    updateAccount(state, action) {
      const { username, avatar_url } = action.payload;
      state.username = username;
      state.avatar_url = avatar_url;
    },
    updateUsername(state, action) {
      const { username } = action.payload;
      state.username = username;
    },
  },
});

// //ac6tion creators
// const thunkAction = () => {
//   return async (dispatch)=>{
//     dispatch();
//     try{

//     }
//     catch(error){}

//   }
// };

export default authSlice.reducer;
export const authActions = authSlice.actions;

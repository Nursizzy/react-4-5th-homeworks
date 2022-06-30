import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  currentUser: {},
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = true;
    },
    setLoggedOut(state, action) {
      state.isLoggedIn = false;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setLoggedIn, setLoggedOut, setCurrentUser } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;

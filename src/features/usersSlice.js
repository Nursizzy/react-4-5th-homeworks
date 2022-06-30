import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const usersFetch = createAsyncThunk('users/usersFetch', async () => {
  const response = await fetch('https://api.escuelajs.co/api/v1/users');
  return response?.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    usersStatus: null,
  },
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.usersStatus = 'pending';
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.usersStatus = 'success';
      state.users = action.payload;
    },
    [usersFetch.rejected]: (state, action) => {
      state.usersStatus = 'rejected';
    },
  },
});
export default usersSlice.reducer;

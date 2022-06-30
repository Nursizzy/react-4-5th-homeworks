import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalIsHidden: true,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setReveal(state, action) {
      state.modalIsHidden = false;
    },
    setHidden(state, action) {
      state.modalIsHidden = true;
    },
  },
});

export const { setReveal, setHidden } = modalSlice.actions;

export default modalSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState: {
    isLoading: false,
  },
  reducers: {
    showSpinner: (state) => {
      state.isLoading = true;
    },
    hideSpinner: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;

export const selectSpinner = (state) => state.spinner.isLoading
export default spinnerSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
export const customerTourSlice = createSlice({
    name: "customerTour",
    initialState: {
        booking: {},
    },
    reducers: {
        addBookingTour: (state, action) => {
          state.booking = action.payload;
        },
        removeBookingTour: (state, action) => {
          state.booking = null;
        },
      },
})

export const { addBookingTour, removeBookingTour } = customerTourSlice.actions;

export default customerTourSlice.reducer
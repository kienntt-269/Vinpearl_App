import { createSlice } from "@reduxjs/toolkit";
export const customerTourSlide = createSlice({
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

export const { addBookingTour, removeBookingTour } = customerTourSlide.actions;

export default customerTourSlide.reducer
import { createSlice } from "@reduxjs/toolkit";
export const customerHotelSlide = createSlice({
    name: "customerHotel",
    initialState: {
        booking: {},
    },
    reducers: {
        addBookingHotel: (state, action) => {
          state.booking = action.payload;
        },
        removeBookingHotel: (state, action) => {
          state.booking = null;
        },
      },
})

export const { addBookingHotel, removeBookingHotel } = customerHotelSlide.actions;

export default customerHotelSlide.reducer
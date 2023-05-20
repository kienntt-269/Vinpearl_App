import { createSlice } from "@reduxjs/toolkit";
export const customerHotelSlice = createSlice({
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

export const { addBookingHotel, removeBookingHotel } = customerHotelSlice.actions;

export default customerHotelSlice.reducer
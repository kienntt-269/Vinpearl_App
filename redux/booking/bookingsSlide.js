import { createSlice } from "@reduxjs/toolkit";
export const bookingsSlice = createSlice({
    name: "booking",
    initialState: {
        booking: {},
    },
    reducers: {
        addBooking: (state, action) => {
          state = action.payload;
        },
        removeBooking: (state, action) => {
          state = null;
        },
      },
})

export const { addBooking, removeBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer
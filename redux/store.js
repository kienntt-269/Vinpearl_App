import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
// import productModalReducer from './product-modal/productModalSlice';
import cartItemsReducer from './tour-cart/cartItemsSlide';
import customerHotelReducer from './customerHotel/customerHotelSlide';
import customerTourReducer from './customerTour/customerTourSlide';

const store = configureStore({
  reducer: {
    user: userReducer,
    customerHotel: customerHotelReducer,
    customerTour: customerTourReducer,
    cartItems: cartItemsReducer,
  }
})

export default store
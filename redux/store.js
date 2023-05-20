import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
// import productModalReducer from './product-modal/productModalSlice';
import cartItemsReducer from './tour-cart/cartItemsSlide';
import customerHotelReducer from './customerHotel/customerHotelSlice';
import customerTourReducer from './customerTour/customerTourSlice';
import spinnerReducer from './spinner/spinnerSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    customerHotel: customerHotelReducer,
    customerTour: customerTourReducer,
    cartItems: cartItemsReducer,
    spinner: spinnerReducer,
  }
})

export default store
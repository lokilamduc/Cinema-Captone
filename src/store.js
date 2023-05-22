import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import bookingMovieSlice from "./slices/bookingMovieSlice";


const store = configureStore({
  reducer: {
    user: userReducer,
    bookingMovieSlice: bookingMovieSlice,
  },
});

export default store;
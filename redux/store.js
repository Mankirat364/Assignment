import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './apislice'

const store = configureStore({
    reducer: {
      api: apiReducer,
    },
  });
  
  export default store;
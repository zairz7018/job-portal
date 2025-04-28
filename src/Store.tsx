import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/UserSlice";

export default configureStore({
  reducer:{
    user: useReducer
  }
})
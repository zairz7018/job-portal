import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/UserSlice";
import  ProfileReducer  from "./Slices/ProfileSlice";


export default configureStore({
  reducer:{
    user: useReducer ,
    profile: ProfileReducer
  }
})
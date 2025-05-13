import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/UserSlice";
import  ProfileReducer  from "./Slices/ProfileSlice";
import filterReducer from "./Slices/FilterSlice"; // ✅ IMPORT MANQUANT



export default configureStore({
  reducer:{
    user: useReducer ,
    profile: ProfileReducer,
    filter: filterReducer, 
  },
})
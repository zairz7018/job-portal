import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./Slices/UserSlice";
import  ProfileReducer  from "./Slices/ProfileSlice";
import filterReducer from "./Slices/FilterSlice";
import sortReducer from "./Slices/SortSlice"; // ✅ IMPORT MANQUANT



export default configureStore({
  reducer:{
    user: useReducer ,
    profile: ProfileReducer,
    filter: filterReducer, 
    sort: sortReducer
  },
})
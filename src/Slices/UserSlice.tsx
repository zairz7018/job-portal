import { createSlice } from "@reduxjs/toolkit";
import { GetItem, RemoveItem, SetItem } from "../Services/LocalStorageService";

const UserSlice = createSlice({
  name:"user",
  initialState:GetItem("user"),
  reducers:{
    setUser:(state , action)=>{
      SetItem("user" , action.payload);
      state=GetItem("user");
      return state;
    },
    removeUser:(state )=>{
      RemoveItem("user");
      RemoveItem("token");
      state=null;
      return state;
    } 
  }
})
export const {setUser , removeUser} = UserSlice.actions;
export default UserSlice.reducer;
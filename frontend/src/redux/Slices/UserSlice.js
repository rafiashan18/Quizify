import { createSlice } from "@reduxjs/toolkit";
const initialState={
   
    name: null,
    email:null,
    username: null,
    role: "user",
    bio:null,

}
const UserSlice = createSlice(
    {
        name:"UserSlice",
        initialState,
        reducers:{
            setUserData:(state,action)=>{
                console.log("consoling from rtk:", action.payload)
                state.name=action.payload.name;
                state.email=action.payload.email;
                state.username=action.payload.username;
                state.role=action.payload.role;
                state.bio=action.payload.bio;
            }
        }
    }
)

export const {setUserData}= UserSlice.actions
export default UserSlice.reducer
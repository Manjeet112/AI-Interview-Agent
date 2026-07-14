import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(STATES,action)=>{
            STATES.userData=action.payload
        }
    }
})
export const { setUserData }=userSlice.actions
export default userSlice.reducer

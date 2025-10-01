import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading : false,
  isAuth : false,
}

export const adminSlice = createSlice({
    name : 'adminAuth',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.isLoading =  true;
        },
        signInSuccess : (state) =>{
            state.isAuth = true;
            state.isLoading = false;
        },
        signInFailure : (state, action) => {
           state.isLoading = false
        }
    }
})

export const { signInStart, signInFailure, signInSuccess } = adminSlice.actions
export default adminSlice.reducer;
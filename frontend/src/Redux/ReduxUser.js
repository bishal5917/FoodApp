import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            curruser: JSON.parse(localStorage.getItem('foodappuser')),
            isFetching: false,
            error: false
        },
        reducers: {
            loginStart: (state) => {
                state.isFetching = true;
            },
            loginSuccess: (state, action) => {
                state.isFetching = false;
                state.curruser = action.payload
            },
            loginFailure: (state) => {
                state.isFetching = false;
                state.error = true
            },
            logoutUser: (state) => {
                state.curruser = null;
                localStorage.removeItem('foodappuser')
            },
        }
    }
)

export const { loginStart, loginSuccess, loginFailure, logoutUser } = userSlice.actions
export default userSlice.reducer
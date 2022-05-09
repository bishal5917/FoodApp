import { createSlice } from '@reduxjs/toolkit'

const sellerSlice = createSlice(
    {
        name: "seller",
        initialState: {
            currseller: JSON.parse(localStorage.getItem('foodappseller')),
            isFetching: false,
            error: false
        },
        reducers: {
            sellerloginStart: (state) => {
                state.isFetching = true;
            },
            sellerloginSuccess: (state, action) => {
                state.isFetching = false;
                state.currseller = action.payload
            },
            sellerloginFailure: (state) => {
                state.isFetching = false;
                state.error = true
            },
            logoutSeller: (state) => {
                state.currseller = null;
                localStorage.removeItem('foodappseller')
            },
        }
    }
)

export const { sellerloginStart, sellerloginSuccess, sellerloginFailure, logoutSeller } = sellerSlice.actions
export default sellerSlice.reducer
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    token: '',
    user: {},
    isResetPassword: false,
    forgotPassEmail : ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.token = action.payload;
        },
        setResetPassword: (state, action) => {
            state.isResetPassword = action.payload;
        },
        setuser: (state, action) => {
            state.user = action.payload;
        },
        saveForgotPassEmail: (state, action) => {
            state.forgotPassEmail = action.payload;
        },
        logout: (state, action) => {
            state.user = {}
            state.token = ''
        },
    },
});

export const { setAccessToken, setResetPassword, setuser, logout , saveForgotPassEmail } = authSlice.actions;

export default authSlice.reducer;
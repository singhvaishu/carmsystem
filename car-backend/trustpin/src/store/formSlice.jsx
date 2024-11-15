import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        name: '',
        email: '',
        mobile: '',
        qualification: '',
        referral: '',
        pinCode: '',
        city: '',
        state: '',
        password: '',
        otpVerified: false,
        jwtToken: '',
    },
    reducers: {
        updateForm: (state, action) => {
            Object.assign(state, action.payload);
        },
        verifyOtp: (state, action) => {
            state.otpVerified = true;
            state.jwtToken = action.payload;
        },
    },
});

export const { updateForm, verifyOtp } = formSlice.actions;
export default formSlice.reducer;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateForm } from '../store/formSlice'; // Adjust the import based on your file structure

const Form = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.form);
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [mobileDisabled, setMobileDisabled] = useState(false);

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('https://web-rupay-lender-back-production.up.railway.app/auth/send-otp', {
                mobile: formData.mobile,
            });
            const token = response.data.token; // Make sure this is the correct field
            console.log('Received token:', token); // Log the token to verify its format
            dispatch(updateForm({ jwtToken: token })); // Save the token in Redux store
            console.log('OTP sent successfully:', response.data);
            setShowOtpInput(true); // Show OTP input field after sending OTP
        } catch (error) {
            console.error('Error sending OTP:', error.response?.data || error.message);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const token = formData.jwtToken; // Get the JWT token from Redux store
            console.log('Token for verification:', token); // Log the token

            const response = await axios.post(
                'https://web-rupay-lender-back-production.up.railway.app/auth/mobile-verify',
                {
                    mobile: formData.mobile,
                    otp: otp,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );

            console.log('OTP verification successful:', response.data);
            dispatch(updateForm({ otpVerified: true, jwtToken: response.data.token }));
            setMobileDisabled(true);
        } catch (error) {
            console.error('Error verifying OTP:', error.response?.data || error.message);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with:', formData);
        // Further submission logic here...
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit} className="bg-blue-500 p-5 rounded-lg">
                <div>
                    <label htmlFor="name" className="block text-white">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => dispatch(updateForm({ name: e.target.value }))}
                        className="p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-white">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => dispatch(updateForm({ email: e.target.value }))}
                        className="p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobile" className="block text-white">Mobile:</label>
                    <input
                        type="text"
                        id="mobile"
                        value={formData.mobile}
                        onChange={(e) => dispatch(updateForm({ mobile: e.target.value }))}
                        className="p-2 w-full rounded"
                        disabled={mobileDisabled}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="qualification" className="block text-white">Qualification:</label>
                    <input
                        type="text"
                        id="qualification"
                        value={formData.qualification}
                        onChange={(e) => dispatch(updateForm({ qualification: e.target.value }))}
                        className="p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="referral" className="block text-white">Referral:</label>
                    <input
                        type="text"
                        id="referral"
                        value={formData.referral}
                        onChange={(e) => dispatch(updateForm({ referral: e.target.value }))}
                        className="p-2 w-full rounded"
                    />
                </div>
                <div>
                    <label htmlFor="pinCode" className="block text-white">Pin Code:</label>
                    <input
                        type="text"
                        id="pinCode"
                        value={formData.pinCode}
                        onChange={(e) => dispatch(updateForm({ pinCode: e.target.value }))}
                        className="p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block text-white">City:</label>
                    <input
                        type="text"
                        id="city"
                        value={formData.city}
                        onChange={(e) => dispatch(updateForm({ city: e.target.value }))}
                        className="p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state" className="block text-white">State:</label>
                    <input
                        type="text"
                        id="state"
                        value={formData.state}
                        onChange={(e) => dispatch(updateForm({ state: e.target.value }))}
                        className="p-2 w-full rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-white">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => dispatch(updateForm({ password: e.target.value }))}
                        className="p-2 w-full rounded"
                        required
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSendOtp}
                    className="mt-3 bg-white text-blue-500 p-2 rounded"
                >
                    Send OTP
                </button>

                {/* OTP Input Field */}
                {showOtpInput && (
                    <div className="mt-3">
                        <label htmlFor="otp" className="block text-white">Enter OTP:</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="p-2 w-full rounded"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="mt-2 bg-white text-blue-500 p-2 rounded"
                        >
                            Verify OTP
                        </button>
                    </div>
                )}
                <button type="submit" className="mt-3 bg-white text-blue-500 p-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;

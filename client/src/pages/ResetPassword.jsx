import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../components/TextInput'; // Correct the import path
// Import the missing components (Loading and CustomButton) here

// Define a placeholder function for resetPassword
const resetPassword = async (email) => {
  // Replace this with your actual password reset logic
  try {
    // Make an API call or perform password reset logic here
    // For example:
    // const response = await fetch('/api/resetPassword', {
    //   method: 'POST',
    //   body: JSON.stringify({ email }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // Check the response and handle success or failure accordingly
    // if (response.ok) {
    //   return true; // Password reset successful
    // } else {
    //   throw new Error('Password reset failed');
    // }
  } catch (error) {
    throw error; // Propagate the error if reset fails
  }
};

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      // Implement your password reset logic here
      // You should set isSubmitting to true here
      setIsSubmitting(true);

      // For example, you can make an API call to reset the password
      // Replace the following line with your actual logic
      await resetPassword(data.email);

      // If the password reset is successful, you can redirect the user
      // or show a success message
      console.log('Password reset successful');

      // Reset the form and error message
      setErrMsg('');
      setIsSubmitting(false);
    } catch (error) {
      console.error('Password reset failed:', error);

      // Set an appropriate error message based on the error received
      setErrMsg('Password reset failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen bg-bgColor flex items-center justify-center p-6">
      <div className="bg-primary w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-ascent-1 text-lg font-semibold">Email Address</p>

          <span className="text-sm text-ascent-2">
            Enter your email address used during registration
          </span>

          <TextInput
            name="email"
            placeholder="email@example.com"
            type="email"
            // Use register() to associate validation rules
            {...register('email', {
              required: 'Email Address is required!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Email format validation
                message: 'Invalid email address',
              },
            })}
          />

          {errMsg && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg.status === 'failed' ? 'text-red-500' : 'text-green-500'
              } mt-0.5`}
            >
              {errMsg}
            </span>
          )}

          {isSubmitting ? (
            // Replace this with the Loading component or a loading message
            <div>Loading...</div>
          ) : (
            // Submit Button
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Reset Password'}
            </button>
          )}

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import TextInput from '../components/TextInput';
import { BgImage } from '../assets';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const [errMsg, setErrMsg] = useState({ message: '', status: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Here, you would make an actual API call to authenticate the user.
      // For example, you can use axios or fetch to send a POST request to your authentication endpoint.
      // Replace the commented code below with your actual API call:

      // const response = await authService.login(data.email, data.password);

      // Example: Dispatch action based on API response
      // if (response.success) {
      //   dispatch(userLoggedIn(response.user));
      //   // Redirect to the user's dashboard or another route
      // } else {
      //   setErrMsg({ message: response.error, status: 'failed' });
      // }

    } catch (error) {
      console.error('Error during login:', error);
      setErrMsg({ message: 'An error occurred during login.', status: 'failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-screen flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2x1:h-5/6 py-8 lg:py-0 flex bg-primary rounded-x1 overflow-hidden shadow-x1">
        {/* LEFT */}
        <div className="w-full lg:w-1/2 h-full p-10 2x1:px-10 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white"></div>
            <span className="text-2xl text-[#065ad8] font-semibold">ShareFun</span>
          </div>
          <p className="text-ascent-1 text-base font-semibold">Log in to your account</p>
          <span className="text-sm mt-2 text-ascent-2">Welcome back</span>

          <form className="py-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register('email', {
                required: 'Email Address is required',
              })}
              styles="w-full rounded-full"
              labelStyle="m-2"
              error={errors.email ? errors.email.message : ''}
            />
            <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              styles="w-full rounded-full"
              labelStyle="m-2"
              register={register('password', {
                required: 'Password is required!',
              })}
              error={errors.password ? errors.password.message : ''}
            />

            <Link to="/reset-password" className="text-sm text-right text-blue font-semibold">
              Forgot Password?
            </Link>

            {errMsg.message && (
              <span
                className={`text-sm ${
                  errMsg.status === 'failed' ? 'text-[#f6494f]' : 'text-[#2ba150]'
                } mt-0.5`}
              >
                {errMsg.message}
              </span>
            )}

            <button type="submit" className="bg-blue text-white py-2 rounded-full mt-4">
              Login
            </button>

            {/* Add the "Create Account" link below the Login button */}
            <Link to="/register" className="text-sm text-center text-blue font-semibold mt-2">
              Don't have an account? Create Account
            </Link>
          </form>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={BgImage}
              alt='Bg Image'
              className='w-48 2x1:w-48 h-100 2x1:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
              <span className='text-xs font-medium'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span>
            </div>

            <div className='mt-16 text-center'>
              <p className='text-white text-base'>
                Connect with friends & have share for fun
              </p>
              <span className='text-sm text-white/80'>
                Share memories with friends and the world.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

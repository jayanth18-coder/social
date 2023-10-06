import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import TextInput from '../components/TextInput';
import { BgImage } from '../assets';

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
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

    } catch (error) {
      console.error('Error during login:', error);
      setErrMsg({ message: 'An error occurred during login.', status: 'failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bgColor w-full h-screen flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2x1:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-x1 overflow-hidden shadow-x1">
        {/* LEFT */}
        <div className="w-full lg:w-1/2 h-full p-10 2x1:px-10 flex flex-col justify-center">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white"></div>
            <span className="text-2xl text-[#065ad8] font-semibold">ShareFun</span>
          </div>
          <p className="text-ascent-1 text-base font-semibold">Create your account</p>

          <form className="py-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
              name='firstName'
              label='First Name'
              placeholder='First Name'
              type='text'
              styles='w-full'
              register={register("firstName", {
                required: "First Name is Required"
             })}
             error={errors.firstName ? errors.firstName?.message : ""}
            />

            <TextInput
            label='Last Name'
            placeholder='Last Name'
            type='lastName'
            styles='w-full'
            register={register("lastName" , {
              required: "Last Name is required",
            })}
            error={errors.lastName ? errors.lastName?.message : ""}
            />
            </div>

            <TextInput
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={register('email', {
                required: 'Email Address is required',
              })}
              styles='w-full'
              error={errors.email ? errors.email.message : ''}
            />
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              styles='w-full'
              register={register("password",{
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
              />

              <TextInput
              label='Confirm Password'
              placeholder='Password'
              type='password'
              styles='w-full'
              register={register("cPassword",{
                validate: (value) => {
                  const { password } = getValues();

                  if(password != value) {
                    return "Passwords do not match";
                  }
                },
              })}
              error={
                errors.cPassword && errors.cPassword.type === "validate"
                ? errors.cPassword?.message
                :""
              }
              />
            </div>

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
              Create Account
            </button>

            {/* Add the "Create Account" link below the Login button */}
            <Link to="/login" className="text-sm text-center text-blue font-semibold mt-2">
                Already have an account?{" "}
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

export default Register;

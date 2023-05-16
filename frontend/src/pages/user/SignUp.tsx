import { useRef } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import { showAlert } from '../../utils';
import BackButton from '../../components/BackButton';

import { UserSignupPayload, UserTokenResponse } from '../../interfaces';

const SignUp = () => {
  const navigate = useNavigate();

  const matricRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const signUp = () => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_USER_API!,
    };

    const payload: UserSignupPayload = {
      fullName: fullNameRef.current!.value,
      password: passwordRef.current!.value,
      phoneNumber: phoneNumberRef.current!.value,
      matricNumber: matricRef.current!.value.toLowerCase(),
    };

    axios
      .post('/signup', payload, generalInfoConfig)
      .then(res => {
        const response: UserTokenResponse = res.data;
        Cookies.set('token-payvry', response.token);
        navigate('/user/create-pin');
      })
      .catch((error: AxiosError) => showAlert({ msg: error.message }));
  };

  return (
    <main className='w-screen min-h-screen px-[35px] flex flex-col items-center justify-center'>
      <h1 className='font-semibold text-[34px] leading-[44px] tracking-[0.04em] text-black'>
        Let's set up your account to get started
      </h1>
      <BackButton />

      <div className='font-light text-[13px] leading-4 tracking-[0.06em] mt-[54px] max-w-[400px]'>
        <input
          type='text'
          ref={matricRef}
          autoCorrect='off'
          autoComplete='off'
          placeholder='Matric number'
          className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5'
        />

        <input
          type='text'
          autoCorrect='off'
          autoComplete='off'
          ref={fullNameRef}
          placeholder='Full name'
          className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-5'
        />

        <input
          type='text'
          autoCorrect='off'
          autoComplete='off'
          ref={phoneNumberRef}
          placeholder='Phone number'
          className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-5'
        />

        <input
          type='password'
          ref={passwordRef}
          placeholder='Password'
          className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-5'
        />

        <button
          onClick={signUp}
          className='bg-mine-shaft text-white w-full py-[15px] rounded-[100px] mt-5'
        >
          Sign up
        </button>

        <p className='mt-5 font-normal text-[14px] leading-7 tracking-[0.06em] text-mine-shaft text-center'>
          Already have an account?{' '}
          <Link to='/user/login' className='font-bold'>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;

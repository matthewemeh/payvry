import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { togglePassword } from '../../utils';

import eyeImage from '../../assets/svgs/eye.svg';
import eyeSlashImage from '../../assets/svgs/eye-slash.svg';

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [pwdHidden, setPwdHidden] = useState(true);

  const login = () => {};

  return (
    <main className='w-screen h-screen px-[35px] flex flex-col items-center justify-center'>
      <h1 className='font-semibold text-[34px] leading-[44px] tracking-[0.04em] text-black'>
        Just a little more
      </h1>

      <p className='font-medium text-[16px] leading-[27px] tracking-[0.06em] text-[rgba(0,0,0,0.5)] pt-[21px]'>
        You are one step away to a managing your sales.
      </p>

      <div className='relative font-light text-[13px] leading-4 tracking-[0.06em] mt-[54px]'>
        <input
          type='text'
          ref={usernameRef}
          autoCorrect='off'
          autoComplete='off'
          placeholder='username'
          className='placeholder:capitalize placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5'
        />

        <input
          type='password'
          ref={passwordRef}
          placeholder='password'
          className='placeholder:capitalize placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5 mt-5'
        />
        <img
          alt=''
          onClick={() => {
            setPwdHidden(!pwdHidden);
            togglePassword(passwordRef);
          }}
          src={pwdHidden ? eyeImage : eyeSlashImage}
          className='absolute top-[33%] right-[5%] w-[19px] h-[13px] cursor-pointer'
        />

        <Link
          to='/forgot-password'
          className='block mr-auto ml-5 mt-[10px] font-light text-[12px] leading-[14px] text-mine-shaft cursor-pointer'
        >
          Forgot Password
        </Link>

        <button
          onClick={login}
          className='bg-mine-shaft text-white w-full py-[15px] rounded-[100px] mt-[22px]'
        >
          Login
        </button>

        <p className='mt-5 font-normal text-[14px] leading-7 tracking-[0.06em] text-mine-shaft text-center'>
          Don't have an account?{' '}
          <Link to='/vendor/sign-up' className='font-bold'>
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;

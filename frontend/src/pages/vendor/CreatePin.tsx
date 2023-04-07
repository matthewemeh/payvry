import { useRef } from 'react';
import { Link } from 'react-router-dom';

const CreatePin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const vendorNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const vendorOwnerNameRef = useRef<HTMLInputElement>(null);

  const signIn = () => {};

  return (
    <main className='w-screen h-screen px-[35px] flex flex-col items-center justify-center'>
      <h1 className='font-semibold text-[34px] leading-[44px] tracking-[0.04em] text-black'>
        Let's create your 4-digit payment pin
      </h1>

      <p className='font-medium text-[16px] leading-[27px] tracking-[0.06em] text-[rgba(0,0,0,0.5)] pt-[21px]'>
        Your 4-digit pin will serve as your payment pin. Try not to disclose to anyone.
      </p>

      <div className='font-light text-[13px] leading-4 tracking-[0.06em] mt-[54px] max-w-[400px]'>
        <input
          type='text'
          ref={usernameRef}
          autoCorrect='off'
          autoComplete='off'
          placeholder='4-digit pin'
          className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5'
        />

        <button
          onClick={signIn}
          className='bg-mine-shaft text-white w-full py-[15px] rounded-[100px] mt-5'
        >
          Sign in
        </button>
      </div>
    </main>
  );
};

export default CreatePin;

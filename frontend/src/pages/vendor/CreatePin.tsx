import { useRef } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import { showAlert } from '../../utils';
import { CreatePinPayload } from '../../interfaces';

interface Props {
  vendorBaseUrl: string;
}

const CreatePin: React.FC<Props> = ({ vendorBaseUrl }) => {
  const navigate = useNavigate();
  const pinRef = useRef<HTMLInputElement>(null);

  const signIn = () => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: vendorBaseUrl,
    };
    const token: string | undefined = Cookies.get('token-payvry');

    if (!token) {
      showAlert({ msg: 'An error occured while creating your pin' });
      navigate('/vendor/login');
      return;
    }

    const payload: CreatePinPayload = {
      token,
      pin: pinRef.current!.value,
    };

    axios
      .post('/setpin', payload, generalInfoConfig)
      .then(res => {
        const response: { message: string } = res.data;
        showAlert({ msg: response.message });
        navigate('/vendor');
      })
      .catch((error: AxiosError) => showAlert({ msg: error.message }));
  };

  return (
    <main className='w-screen min-h-screen px-[35px] flex flex-col items-center justify-center'>
      <h1 className='font-semibold text-[34px] leading-[44px] tracking-[0.04em] text-black'>
        Let's create your 6-digit payment pin
      </h1>

      <p className='font-medium text-[16px] leading-[27px] tracking-[0.06em] text-[rgba(0,0,0,0.5)] pt-[21px]'>
        Your 6-digit pin will serve as your payment pin. Try not to disclose to anyone.
      </p>

      <div className='font-light text-[13px] leading-4 tracking-[0.06em] mt-[54px] max-w-[400px]'>
        <input
          type='text'
          ref={pinRef}
          maxLength={6}
          autoCorrect='off'
          autoComplete='off'
          placeholder='6-digit pin'
          className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[15px] px-5'
        />

        <button
          onClick={signIn}
          className='bg-mine-shaft text-white w-full py-[15px] rounded-[100px] mt-5 font-medium text-[15px] leading-[18px] tracking-[0.06em]'
        >
          Sign in
        </button>
      </div>
    </main>
  );
};

export default CreatePin;

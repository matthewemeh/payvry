import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import eyeImage from '../../assets/svgs/eye.svg';
import userImage from '../../assets/svgs/user.svg';
import chatImage from '../../assets/svgs/chat.svg';
import eyeSlashImage from '../../assets/svgs/eye-slash.svg';

import { showAlert, showInfo, togglePassword } from '../../utils';
import { UserHistoryData, UserResponse } from '../../interfaces';

import HistoryPanel from '../../components/user/HistoryPanel';

const PaystackPop = require('@paystack/inline-js');

const Home = () => {
  const navigate = useNavigate();

  const balanceRef = useRef<HTMLInputElement>(null);
  const [balanceHidden, setBalanceHidden] = useState(true);

  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [fullName, setFullName] = useState('');
  const [history, setHistory] = useState<UserHistoryData[]>([]);

  // componentDidMount
  useEffect(() => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_USER_API!,
    };
    const token: string | undefined = Cookies.get('token-payvry');

    if (!token) {
      showAlert({ msg: 'An error occured while getting your details' });
      navigate('/user/login');
      return;
    }

    const payload = { token };

    axios
      .post('/user', payload, generalInfoConfig)
      .then(res => {
        const response: UserResponse = res.data;
        const { user, userTransaction } = response;
        const { fullName } = user;

        setFullName(fullName);
        setHistory(userTransaction);
      })
      .catch((error: AxiosError) => showAlert({ msg: error.message }));

    axios
      .post('/balance', payload, generalInfoConfig)
      .then(res => {
        const response: { message: number } = res.data;
        const balance: number = response.message;

        balanceRef.current!.value = `C${balance.toLocaleString()}`;
      })
      .catch((error: AxiosError) => showAlert({ msg: error.message }));
  }, []);

  const payWithPaystack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.REACT_APP_PAYSTACK_KEY!,
      amount,
      email,
    });
  };

  return (
    <main className='px-5 pt-[59px] tracking-[0.04em] pb-[57px]'>
      <header className='flex items-center justify-between text-center'>
        <Link
          to='/user/profile'
          className='w-[50px] h-[50px] rounded-full grid place-items-center border-[1px] border-alto'
        >
          <img src={userImage} alt='' />
        </Link>

        <h1 className='font-semibold text-[18px] leading-[30px]'>Hello {fullName}</h1>

        <Link
          to='/user/profile'
          className='w-[50px] h-[50px] rounded-full grid place-items-center border-[1px] border-alto'
        >
          <img src={chatImage} alt='' />
        </Link>
      </header>

      <form
        onSubmit={payWithPaystack}
        className='info-bubble pay-modal text-center hidden bg-white w-[370px] fixed z-[1] p-[30px] rounded-[30px] border-[1px] border-alto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      >
        <h4 className='font-semibold text-[18px]'>Receipt details</h4>

        <label htmlFor='email' className='text-left mt-5 block'>
          <span className='block mx-3'>Email</span>
          <input
            required
            type='email'
            id='email'
            name='email'
            onChange={e => setEmail(e.target.value)}
            className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[10px] px-5 mt-1'
          />
        </label>

        <label htmlFor='amount' className='text-left mt-5 block'>
          <span className='block mx-3'>Amount paid</span>
          <input
            required
            type='text'
            id='amount'
            name='amount'
            onChange={e => setAmount(e.target.value)}
            className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[10px] px-5 mt-1'
          />
        </label>

        <input
          type='submit'
          value='Send Receipt'
          className='bg-mine-shaft text-white w-full py-[15px] rounded-[100px] mt-[22px] font-medium text-[15px] leading-[18px] tracking-[0.06em] cursor-pointer'
        />
      </form>

      <div className='flex flex-col items-center gap-y-5 mt-[10px]'>
        <p className='font-medium text-[16px] leading-[27px] text-[rgba(0,0,0,0.5)]'>
          Coin Balance
        </p>

        <img
          alt=''
          className='w-6 h-6 cursor-pointer'
          onClick={() => {
            setBalanceHidden(!balanceHidden);
            togglePassword(balanceRef);
          }}
          src={balanceHidden ? eyeImage : eyeSlashImage}
        />

        <input
          disabled
          value='C0'
          type='password'
          ref={balanceRef}
          className='text-center outline-0 font-semibold text-[34px] leading-[41px] max-w-full'
        />
      </div>

      <div className='text-mine-shaft font-semibold text-[14px] leading-[17px] flex justify-between mt-[30px]'>
        <button
          onClick={() => showInfo({ classTarget: '.pay-modal' })}
          className='py-[14px] px-5 bg-[rgba(190,161,161,0.2)] rounded-[30px]'
        >
          Add money
        </button>

        <button className='py-[14px] px-5 bg-[rgba(190,161,161,0.2)] rounded-[30px]'>
          Withdraw money
        </button>
      </div>

      <HistoryPanel history={history} />
    </main>
  );
};

export default Home;

import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

import eyeImage from '../../assets/svgs/eye.svg';
import userImage from '../../assets/svgs/user.svg';
import chatImage from '../../assets/svgs/chat.svg';

import { HistoryData, Student } from '../../interfaces';
import { showAlert, showInfo, togglePassword } from '../../utils';

import HistoryPanel from '../../components/student/HistoryPanel';

interface Props {
  studentBaseUrl: string;
}

const Home: React.FC<Props> = ({ studentBaseUrl }) => {
  const navigate = useNavigate();

  const balanceRef = useRef<HTMLInputElement>(null);

  const [balance, setBalance] = useState(0);
  const [fullName, setFullName] = useState('');
  const [history, setHistory] = useState<HistoryData[]>([]);

  // componentDidMount
  useEffect(() => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: studentBaseUrl,
    };
    const token: string | undefined = Cookies.get('token-payvry');

    if (!token) {
      showAlert({ msg: 'An error occured while getting your details' });
      navigate('/student/login');
      return;
    }

    const payload = { token };

    axios
      .post('/user', payload, generalInfoConfig)
      .then(res => {
        const response: { studentTransaction: HistoryData[]; student: Student; message: string } =
          res.data;
        setHistory(response.studentTransaction);
        setFullName(response.student.fullName);
        setBalance(response.student.balance);
      })
      .catch((error: AxiosError) => showAlert({ msg: error.message }));
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const receiptFileRef = useRef<HTMLInputElement>(null);
  const matricNumberRef = useRef<HTMLInputElement>(null);
  const [paymentMade, setPaymentMade] = useState(false);

  const sendReceipt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullName: string = fullNameRef.current!.value;
    const matricNumber: string = matricNumberRef.current!.value;
    const receiptFile: File | null =
      receiptFileRef.current!.files && receiptFileRef.current!.files[0];
    const SERVICE_ID = process.env.REACT_APP_SERVICE_ID!;
    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY!;
    const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID!;

    if (fullName && matricNumber && receiptFile) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY)
        .then(() => showAlert({ msg: 'Your receipt has been sent', zIndex: '5' }))
        .catch((error: EmailJSResponseStatus) => {
          if (error.status === 413) {
            // maximum email size is 50kb
            // most likely a large image might be the cause of this error
            showAlert({
              zIndex: '5',
              msg: 'Upload receipt image with smaller file size',
            });
          } else if (error.status === 0) {
            // internet connection issues
            showAlert({
              zIndex: '5',
              msg: 'Receipt not sent, check your internet connection and try again',
            });
          } else {
            showAlert({
              zIndex: '5',
              msg: 'An unexpected error has occured, please try again',
            });
          }
        });
    } else {
      showAlert({ msg: 'Please fill in empty fields', zIndex: '5' });
    }
  };

  return (
    <main className='px-5 pt-[59px] tracking-[0.04em] pb-[57px]'>
      <header className='flex items-center justify-between text-center'>
        <Link
          to='/student/profile'
          className='w-[50px] h-[50px] rounded-full grid place-items-center border-[1px] border-alto'
        >
          <img src={userImage} alt='' />
        </Link>

        <h1 className='font-semibold text-[18px] leading-[30px]'>Hello {fullName}</h1>

        <Link
          to='/student/profile'
          className='w-[50px] h-[50px] rounded-full grid place-items-center border-[1px] border-alto'
        >
          <img src={chatImage} alt='' />
        </Link>
      </header>

      <div className='info-bubble pay-modal text-center hidden bg-white w-[370px] fixed z-[1] p-[30px] rounded-[30px] border-[1px] border-alto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {paymentMade ? (
          <form onSubmit={sendReceipt} ref={formRef}>
            <h4 className='font-semibold text-[18px]'>Receipt details</h4>
            <label htmlFor='fullName' className='text-left mt-5 block'>
              <span className='block mx-3'>Full name</span>
              <input
                type='text'
                id='fullName'
                name='fullName'
                ref={fullNameRef}
                className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[10px] px-5 mt-1'
              />
            </label>

            <label htmlFor='matricNumber' className='text-left mt-5 block'>
              <span className='block mx-3'>Matric number</span>
              <input
                type='text'
                id='matricNumber'
                name='matricNumber'
                ref={matricNumberRef}
                className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[10px] px-5 mt-1'
              />
            </label>

            <label htmlFor='receipt' className='text-left mt-5 block'>
              <span className='block mx-3'>Upload Receipt image</span>
              <input
                type='file'
                id='receipt'
                name='receipt'
                accept='.jpg, .png'
                ref={receiptFileRef}
                className='placeholder:text-mine-shaft bg-grey-200 w-full rounded-[100px] py-[10px] px-5 mt-1'
              />
            </label>

            <input
              type='submit'
              value='Send Receipt'
              className='bg-mine-shaft text-white w-full py-[15px] rounded-[100px] mt-[22px] font-medium text-[15px] leading-[18px] tracking-[0.06em] cursor-pointer'
            />
          </form>
        ) : (
          <>
            <h3 className='font-semibold text-[20px] leading-[26px]'>
              <span className='font-normal mb-[11px] inline-block'>Account Number:</span> 8252546650
            </h3>
            <p className='mt-[11px] font-medium text-[16px] leading-7 text-[rgba(0,0,0,0.5)]'>
              Bank: Moniepoint
            </p>
            <p className='mt-[11px] font-semibold text-[20px] leading-[26px]'>
              <span className='font-normal mb-[11px] inline-block'>Account Name:</span> Payvry
            </p>
            <p className='bg-[rgba(253,90,93,0.1)] text-carnation rounded-lg py-3 px-2'>
              The payment description should be <strong>DEPOSIT TO PAYVRY ACCOUNT</strong>
            </p>
            <p className='mt-[11px] font-normal'>
              Made payment already?{' '}
              <span
                className='font-semibold cursor-pointer underline'
                onClick={() => setPaymentMade(true)}
              >
                Click here
              </span>
            </p>
          </>
        )}
      </div>

      <div className='flex flex-col items-center gap-y-5 mt-[10px]'>
        <p className='font-medium text-[16px] leading-[27px] text-[rgba(0,0,0,0.5)]'>
          Coin Balance
        </p>

        <img
          alt=''
          src={eyeImage}
          className='w-6 h-6 cursor-pointer'
          onClick={() => togglePassword(balanceRef)}
        />

        <input
          disabled
          type='password'
          ref={balanceRef}
          value={`C${balance.toLocaleString()}`}
          className='text-center outline-0 font-semibold text-[34px] leading-[41px] max-w-full'
        />
      </div>

      <div className='text-mine-shaft font-semibold text-[14px] leading-[17px] flex justify-between mt-[30px]'>
        <button
          onClick={() => {
            setPaymentMade(false);
            showInfo({ classTarget: '.pay-modal' });
          }}
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

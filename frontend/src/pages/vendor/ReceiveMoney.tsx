import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useMemo } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import eyeImage from '../../assets/svgs/eye.svg';
import payFailImage from '../../assets/svgs/pay-fail.svg';
import eyeSlashImage from '../../assets/svgs/eye-slash.svg';
import paySuccessImage from '../../assets/svgs/pay-success.svg';

import BackButton from '../../components/BackButton';

import { showAlert, togglePassword } from '../../utils';
import { PaymentPayload, PaymentResponse, VerifyAccountPayload } from '../../interfaces';

interface Props {
  vendorBaseUrl: string;
}

const ReceiveMoney: React.FC<Props> = ({ vendorBaseUrl }) => {
  const navigate = useNavigate();
  const pinRef = useRef<HTMLInputElement>(null);

  const [amount, setAmount] = useState(0);
  const [pinHidden, setPinHidden] = useState(true);
  const [matricNumber, setMatricNumber] = useState('');
  const [accountVerified, setAccountVerified] = useState(false);
  const [verifiedOwnerName, setVerifiedOwnerName] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const newDate = useMemo(() => new Date(), [paymentSuccessful]);
  const paymentID = useMemo(() => 'D32SASFGD243DF', [paymentSuccessful]);

  const verifyAccount = () => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: vendorBaseUrl,
    };

    const token: string | undefined = Cookies.get('token-payvry');

    if (!token) {
      showAlert({ msg: 'An error occured while accessing your details' });
      navigate('/vendor');
      return;
    }

    const payload: VerifyAccountPayload = { token, matricNumber };

    axios
      .post('/getstudent', payload, generalInfoConfig)
      .then(res => {
        const response: { message: string } = res.data;
        if (response.message) {
          setAccountVerified(true);
          setVerifiedOwnerName(response.message);
        }
      })
      .catch((error: AxiosError) => showAlert({ msg: error.message }));
  };

  const confirmPayment = () => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: vendorBaseUrl,
    };

    const token: string | undefined = Cookies.get('token-payvry');

    if (!token) {
      showAlert({ msg: 'An error occured while accessing your details' });
      navigate('/vendor');
      return;
    }

    const payload: PaymentPayload = {
      token,
      matricNumber,
      amount: amount.toString(),
      pin: pinRef.current!.value,
    };

    axios
      .post('/acceptpayment', payload, generalInfoConfig)
      .then(res => {
        const response: PaymentResponse = res.data;
        setPaymentSuccessful(response.vendorTransaction.status === 'completed');
        showAlert({ msg: response.message });
      })
      .catch((error: AxiosError) => {
        setPaymentSuccessful(false);
        showAlert({ msg: error.message });
      });

    setPaymentConfirmed(true);
  };

  return (
    <main className='min-h-screen px-5 mb-[100px] flex flex-col items-center justify-center'>
      <h1 className='font-semibold text-[20px] leading-[26px] text-center pt-14'>
        Receive payment
      </h1>
      <BackButton />

      {paymentConfirmed ? (
        <section className='mt-[180px] bg-alto rounded-[30px] p-[10px]'>
          <div className='grid grid-cols-3 gap-y-[15px] bg-white rounded-[20px] py-5 px-[30px] font-medium'>
            <p className='col-start-1 col-end-3 text-[10px] leading-[17px]'>
              {newDate.toDateString()} {newDate.toLocaleTimeString()}
            </p>
            <p className='text-[10px] leading-[17px] text-right'>{paymentID}</p>

            <img
              alt=''
              className='w-[30px] h-[30px] col-start-1 col-end-4 mx-auto'
              src={paymentSuccessful ? paySuccessImage : payFailImage}
            />
            <p
              className={`col-start-1 col-end-4 text-center font-semibold text-[24px] leading-10 ${
                paymentSuccessful ? 'text-mountain-meadow' : 'text-carnation'
              }`}
            >
              C{amount.toLocaleString()}
            </p>

            <p className='col-start-1 col-end-3 text-[14px] leading-6'>{matricNumber}</p>
            <p
              className={`text-right text-[14px] leading-6 ${
                paymentSuccessful ? 'text-mountain-meadow' : 'text-carnation'
              }`}
            >
              {paymentSuccessful ? 'Payment Successful' : 'Payment Unsuccessful'}
            </p>
          </div>
        </section>
      ) : (
        <section className='mt-[180px] border-[1px] border-alto rounded-[30px] p-[30px] max-w-[400px]'>
          <h2 className='font-medium text-[16px] leading-[27px] text-[rgba(0,0,0,0.5)]'>
            Verify student's ID before proceeding to complete the payment
          </h2>

          <input
            type='text'
            value={matricNumber}
            placeholder='Matric number'
            onChange={e => {
              setMatricNumber(e.target.value);
              setAccountVerified(false);
              setVerifiedOwnerName('');
            }}
            className='mt-[30px] bg-gallery rounded-[100px] py-[15px] px-5 w-full placeholder:font-light text-[13px] leading-4 placeholder:text-mine-shaft tracking-[0.06em]'
          />

          <input
            type='text'
            placeholder='Amount'
            value={amount.toString()}
            onChange={e => setAmount(Number(e.target.value))}
            className='mt-5 bg-gallery rounded-[100px] py-[15px] px-5 w-full placeholder:font-light text-[13px] leading-4 placeholder:text-mine-shaft tracking-[0.06em]'
          />

          {accountVerified && (
            <>
              <p className='mt-[30px] text-center font-medium text-[20px] leading-[26px]'>
                {verifiedOwnerName}
              </p>

              <div className='relative mt-[30px]'>
                <input
                  type='password'
                  ref={pinRef}
                  placeholder='Pin'
                  className='bg-gallery rounded-[100px] py-[15px] px-5 w-full placeholder:font-light text-[13px] leading-4 placeholder:text-mine-shaft tracking-[0.06em]'
                />
                <img
                  alt=''
                  onClick={() => {
                    togglePassword(pinRef);
                    setPinHidden(!pinHidden);
                  }}
                  src={pinHidden ? eyeImage : eyeSlashImage}
                  className='w-5 h-5 absolute top-[30%] right-5 cursor-pointer'
                />
              </div>
            </>
          )}

          <button
            onClick={accountVerified ? confirmPayment : verifyAccount}
            className='bg-mine-shaft rounded-[100px] py-[15px] px-[88px] whitespace-nowrap text-white mt-[30px] font-medium text-[15px] leading-[18px] tracking-[0.06em] w-full'
          >
            {accountVerified ? 'Confirm Payment' : 'Verify Account'}
          </button>
        </section>
      )}
    </main>
  );
};

export default ReceiveMoney;

import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

import eyeImage from '../../assets/svgs/eye.svg';
import userImage from '../../assets/svgs/user.svg';
import chatImage from '../../assets/svgs/chat.svg';

import { HistoryData, Student } from '../../interfaces';
import { showAlert, togglePassword } from '../../utils';

import HistoryPanel from '../../components/student/HistoryPanel';

interface Props {
  studentBaseUrl: string;
}

const Home: React.FC<Props> = ({ studentBaseUrl }) => {
  const navigate = useNavigate();

  const token = Cookies.get('token-payvry');
  const balanceRef = useRef<HTMLInputElement>(null);

  const [balance, setBalance] = useState(0);
  const [fullName, setFullName] = useState('');
  const [history, setHistory] = useState<HistoryData[]>([]);

  // componentDidMount
  useEffect(() => {
    const generalInfoConfig: AxiosRequestConfig = {
      baseURL: studentBaseUrl,
    };

    if (!token) {
      showAlert('An error occured while getting your details');
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
      .catch((error: AxiosError) => showAlert(error.message));
  }, []);

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
        <button className='py-[14px] px-5 bg-[rgba(190,161,161,0.2)] rounded-[30px]'>
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

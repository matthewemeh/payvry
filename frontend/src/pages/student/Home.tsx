import { useRef } from 'react';

import eyeImage from '../../assets/svgs/eye.svg';
import userImage from '../../assets/svgs/user.svg';
import chatImage from '../../assets/svgs/chat.svg';

import { User } from '../../interfaces';
import { togglePassword } from '../../utils';

import BackButton from '../../components/BackButton';
import HistoryPanel from '../../components/student/HistoryPanel';

interface Props {
  user: User;
}

const Home: React.FC<Props> = ({ user }) => {
  const { name, balance, history } = user;
  const balanceRef = useRef<HTMLInputElement>(null);

  return (
    <main className='px-5 pt-[59px] tracking-[0.04em] pb-[57px]'>
      <BackButton />

      <header className='flex items-center justify-between text-center'>
        <div className='w-[50px] h-[50px] rounded-full grid place-items-center border-[1px] border-alto'>
          <img src={userImage} alt='' />
        </div>

        <h1 className='font-semibold text-[18px] leading-[30px]'>Hello {name}</h1>

        <div className='w-[50px] h-[50px] rounded-full grid place-items-center border-[1px] border-alto'>
          <img src={chatImage} alt='' />
        </div>
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

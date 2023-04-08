import { useState } from 'react';

import { HistoryDuration } from '../../types';
import { User } from '../../interfaces';
import HistoryPanel from '../../components/student/HistoryPanel';

import paidImage from '../../assets/svgs/paid.svg';
import receivedImage from '../../assets/svgs/received.svg';
import caretDownImage from '../../assets/svgs/caret-down.svg';

import { showInfo } from '../../utils';

interface Props {
  user: User;
}

const History: React.FC<Props> = ({ user }) => {
  const { balance, history } = user;
  const durationOptions: HistoryDuration[] = [
    'last 7 days',
    'last 30 days',
    'last 3 months',
    'last 14 days',
    'all-time',
  ];
  const [duration, setDuration] = useState<HistoryDuration>('all-time');
  const totalTransactions = history.length;
  const creditPercentage =
    (history.filter(({ transactionType }) => transactionType === 'credit').length /
      totalTransactions) *
    100;
  const debitPercentage =
    (history.filter(({ transactionType }) => transactionType === 'debit').length /
      totalTransactions) *
    100;

  return (
    <main className='min-h-screen px-4 mt-14 mb-5'>
      <h1 className='text-center font-semibold text-[20px] leading-[26px]'>History</h1>

      <div className='info-bubble menu hidden bg-white w-[355px] fixed z-[1] p-[30px] pr-[102px] rounded-[30px] border-[1px] border-alto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h3 className='font-semibold text-[20px] leading-[26px]'>Select a Duration</h3>
        <p className='mt-[11px] mb-[30px] font-medium text-[16px] leading-7 text-[rgba(0,0,0,0.5)]'>
          Select a duration to filter your transaction history from
        </p>
        {durationOptions.map(dur => (
          <button
            key={dur}
            onClick={() => {
              setDuration(dur);
              showInfo();
            }}
            className='block my-[10px] capitalize font-medium text-[16px] leading-[21px]'
          >
            {dur}
          </button>
        ))}
      </div>

      <section className='flex gap-x-5 items-center justify-center mt-[60px]'>
        <div
          className='w-[168px] h-[168px] rounded-full grid place-items-center'
          style={{
            background: `conic-gradient(#13ad95 ${creditPercentage}%, #fd5a5d ${debitPercentage}%)`,
          }}
        >
          <div className='bg-white w-[77%] h-[77%] rounded-full flex flex-col items-center justify-center text-center'>
            <p className='font-semibold text-[12px] leading-5'>C{balance.toLocaleString()}</p>
            <p className='font-medium text-[10px] leading-[17px] text-[rgba(0,0,0,0.5)] capitalize'>
              Transaction
              <br /> Volume {duration}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-[20px_minmax(0,1fr)] gap-x-[5px] gap-y-2 font-medium text-[10px] leading-[17px]'>
          <img src={receivedImage} className='w-5 h-5' alt='' />
          <p>Credit: {creditPercentage.toFixed(0)}%</p>
          <img src={paidImage} className='w-5 h-5' alt='' />
          <p>Debit: {debitPercentage.toFixed(0)}%</p>

          <button className='bg-alto-shade-1 col-start-1 col-end-3 rounded-[10px] py-[2px] px-[10px]'>
            More categories
          </button>

          <button
            onClick={e => showInfo('.menu')}
            className='border-[1px] border-alto w-4/5 min-w-fit col-start-1 col-end-3 rounded-[10px] mt-[5px] py-[5px] px-[10px] capitalize flex items-center justify-center gap-x-[5px]'
          >
            {duration}
            <img src={caretDownImage} alt='' />
          </button>
        </div>
      </section>

      <HistoryPanel history={history} panelExpanded={true} extraStyles={{ marginTop: '52px' }} />
    </main>
  );
};

export default History;

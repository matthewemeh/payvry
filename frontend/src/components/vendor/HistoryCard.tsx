import { useRef } from 'react';
import { TransactionType } from '../../types';

import { showInfo } from '../../utils';

import paidImage from '../../assets/svgs/paid.svg';
import receivedImage from '../../assets/svgs/received.svg';

interface Props {
  id: string;
  date: string;
  title: string;
  index: number;
  description: string;
  panelExpanded?: boolean;
  transactionAmount: number;
  transactionType: TransactionType;
}

const HistoryCard: React.FC<Props> = ({
  id,
  date,
  index,
  title,
  description,
  panelExpanded,
  transactionType,
  transactionAmount,
}) => {
  const newDate = new Date(date);
  const matricRef = useRef<HTMLInputElement>(null);

  const refund = () => {
    showInfo();
  };

  return (
    <div
      className={`bg-white rounded-[20px] p-5 grid grid-rows-3 grid-cols-[40px_repeat(2,minmax(0,1fr))] font-medium text-[10px] leading-[17px] last:mb-0 ${
        index === 0 ? (panelExpanded ? 'mt-0' : 'mt-5') : ''
      } ${panelExpanded ? 'my-[10px]' : 'my-3'}`}
    >
      <div className='info-bubble refund bg-white w-[355px] hidden font-medium fixed z-[1] p-[30px] rounded-[30px] border-[1px] border-alto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h3 className='font-semibold text-[20px] leading-[26px]'>
          Enter the matric number below to process refund
        </h3>
        <p className='mt-[11px] text-[16px] leading-7 text-[rgba(0,0,0,0.5)]'>{title}</p>
        <input
          type='text'
          ref={matricRef}
          placeholder='Matric number'
          className='mt-[30px] bg-gallery rounded-[100px] py-[15px] px-5 w-full placeholder:font-light text-[13px] leading-4 placeholder:text-mine-shaft tracking-[0.06em]'
        />
        <button
          onClick={refund}
          className='bg-mine-shaft rounded-[30px] py-[15px] px-[111px] text-white mt-[30px] text-[15px] leading-[18px]'
        >
          Refund
        </button>
      </div>

      <p className='col-start-1 col-end-3 text-left'>
        {newDate.toDateString()} {newDate.toLocaleTimeString()}
      </p>
      <p className='text-right'>{id}</p>
      <img
        alt=''
        className='row-start-2 row-end-4 w-[30px] h-[30px] mt-[10%]'
        src={transactionType === 'credit' ? receivedImage : paidImage}
      />
      <p className='capitalize text-left font-normal'>{description}</p>
      <p
        className={`text-right ${
          transactionType === 'credit' ? 'text-mountain-meadow' : 'text-carnation'
        }`}
      >
        C{transactionAmount.toLocaleString()}
      </p>
      <p className='text-left text-[14px] leading-6 font-medium'>{title}</p>
      <p
        className={`capitalize text-right ${
          transactionType === 'credit' ? 'text-mountain-meadow' : 'text-carnation'
        }`}
      >
        {transactionType}
      </p>
      {transactionType === 'credit' && (
        <button
          onClick={() => showInfo('.refund')}
          className='bg-[rgba(253,90,93,0.1)] text-carnation col-start-1 col-end-4 rounded-[30px] py-[5px] px-5 max-w-[80px] mx-auto mt-[15px] text-[12px] leading-5'
        >
          Refund
        </button>
      )}
    </div>
  );
};

export default HistoryCard;

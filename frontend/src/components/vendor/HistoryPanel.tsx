import { Link } from 'react-router-dom';

import HistoryCard from './HistoryCard';
import { ExtraStyle, HistoryData } from '../../interfaces';

interface Props {
  history: HistoryData[];
  panelExpanded?: boolean;
  extraStyles?: ExtraStyle;
}

const HistoryPanel: React.FC<Props> = ({ history, panelExpanded, extraStyles }) => {
  const MAX_HISTORY = panelExpanded ? history.length : 3;

  return (
    <section
      style={extraStyles}
      className={`relative bg-alto rounded-[30px] text-center mt-[55px] ${
        panelExpanded ? 'p-[10px]' : 'py-5 px-[15px]'
      }`}
    >
      {panelExpanded || (
        <>
          <h3 className='font-semibold text-[18px] leading-[23px]'>History</h3>
          <Link
            to='/vendor/history'
            className='absolute right-[25px] top-5 font-normal text-[17px] leading-[17px]'
          >
            View all
          </Link>
        </>
      )}

      {history
        .slice(0, MAX_HISTORY)
        .map(({ _id, date_time, amount, alert, vendor, status }, index) => {
          return (
            <HistoryCard
              id={_id}
              key={_id}
              index={index}
              title={vendor}
              date={date_time}
              description={status}
              transactionType={alert}
              transactionAmount={amount}
              panelExpanded={panelExpanded}
            />
          );
        })}
    </section>
  );
};

export default HistoryPanel;

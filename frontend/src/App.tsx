import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';

import { HistoryData, Student, Vendor } from './interfaces';

import HomeStudent from './pages/student/Home';
import LoginStudent from './pages/student/Login';
import SignUpStudent from './pages/student/SignUp';
import HistoryStudent from './pages/student/History';
import ProfileStudent from './pages/student/Profile';
import CreatePinStudent from './pages/student/CreatePin';
import SendMoneyStudent from './pages/student/SendMoney';
import ReceiveMoneyStudent from './pages/student/ReceiveMoney';

import HomeVendor from './pages/vendor/Home';
import LoginVendor from './pages/vendor/Login';
import SignUpVendor from './pages/vendor/SignUp';
import HistoryVendor from './pages/vendor/History';
import ProfileVendor from './pages/vendor/Profile';
import CreatePinVendor from './pages/vendor/CreatePin';
import ReceiveMoneyVendor from './pages/vendor/ReceiveMoney';

import Admin from './pages/admin/Admin';
import HomeAdmin from './pages/admin/Home';

// this information should be fetched and stored using useState and
// then made available throughout the application.
// this is just dummy data
const history1: HistoryData[] = [
  {
    id: 'D32SASFGD243DF',
    title: 'Mobile top-up',
    transactionAmount: 4000,
    transactionType: 'credit',
    date: '2023-03-24T17:03:00Z',
    description: 'money received',
  },
  {
    id: 'ASFD32S3DFGD24',
    title: 'Blosom Kitchen',
    transactionAmount: 8000,
    transactionType: 'debit',
    date: '2023-03-24T15:03:00Z',
    description: 'service payment',
  },
  {
    id: 'ASFD32S3DFGD25',
    title: 'Elon Musk',
    transactionAmount: 1300,
    transactionType: 'debit',
    date: '2023-03-24T03:03:00Z',
    description: 'withdrawal',
  },
  {
    id: 'ASFD32S3DFGD26',
    title: 'Deli buds',
    transactionAmount: 4000,
    transactionType: 'debit',
    date: '2023-03-14T13:03:00Z',
    description: 'service payment',
  },
];
const history2: HistoryData[] = [
  {
    id: 'D32SASFGD243DF',
    title: 'CLU200203-442',
    transactionAmount: 4000,
    transactionType: 'credit',
    date: '2023-03-24T17:03:00Z',
    description: 'money received',
  },
  {
    id: 'ASFD32S3DFGD24',
    title: 'Jide Cole',
    transactionAmount: 100000,
    transactionType: 'debit',
    date: '2023-03-24T15:03:00Z',
    description: 'withdrawal',
  },
  {
    id: 'ASFD32S3DFGD25',
    title: 'CLU200203-442',
    transactionAmount: 1000,
    transactionType: 'debit',
    date: '2023-03-24T03:03:00Z',
    description: 'refund',
  },
];

const user1: Student = {
  history: history1,
  pin: '123456',
  name: 'Joseph',
  balance: 168260,
  password: 'jiffy101#',
  phoneNumber: '09061281792',
  matricNumber: 'clu200203-442',
};

const user2: Vendor = {
  history: history2,
  pin: '123456',
  name: 'Blosom',
  balance: 168260,
  username: 'Buds',
  password: 'jiffy101#',
  vendorName: 'Deli Buds',
  phoneNumber: '09061281792',
};

const App = () => {
  const baseURLs = {
    vendor: 'https://shrouded-tor-29635.herokuapp.com/vendor/api',
    student: 'https://shrouded-tor-29635.herokuapp.com/student/api',
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />}></Route>

        <Route path='/student/home' element={<HomeStudent user={user1} />}></Route>
        <Route path='/student/history' element={<HistoryStudent user={user1} />}></Route>
        <Route
          path='/student/login'
          element={<LoginStudent studentBaseUrl={baseURLs.student} />}
        ></Route>
        <Route
          path='/student/sign-up'
          element={<SignUpStudent studentBaseUrl={baseURLs.student} />}
        ></Route>
        <Route
          path='/student/create-pin'
          element={<CreatePinStudent studentBaseUrl={baseURLs.student} />}
        ></Route>
        <Route
          path='/student/profile'
          element={<ProfileStudent user={user1} studentBaseUrl={baseURLs.student} />}
        ></Route>
        <Route path='/student/send-money' element={<SendMoneyStudent />}></Route>
        <Route path='/student/receive-money' element={<ReceiveMoneyStudent />}></Route>

        <Route path='/vendor/home' element={<HomeVendor user={user2} />}></Route>
        <Route path='/vendor/history' element={<HistoryVendor user={user2} />}></Route>
        <Route path='/vendor/login' element={<LoginVendor />}></Route>
        <Route
          path='/vendor/sign-up'
          element={<SignUpVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route path='/vendor/create-pin' element={<CreatePinVendor />}></Route>
        <Route
          path='/vendor/profile'
          element={<ProfileVendor user={user2} vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route path='/vendor/receive-money' element={<ReceiveMoneyVendor />}></Route>

        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/admin/home' element={<HomeAdmin />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

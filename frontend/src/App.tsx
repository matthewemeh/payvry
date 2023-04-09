import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';

import { HistoryData, Vendor } from './interfaces';

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
const history2: HistoryData[] = [
  {
    amount: 4000,
    alert: 'credit',
    vendor: 'top-up',
    status: 'completed',
    _id: 'D32SASFGD243DF',
    user_id: 'odo4343284732r5tio',
    date_time: '2023-03-24T17:03:00Z',
    transaction_ref: '$dn32ye8d8h128ex2en2x8ey1e8',
  },
  {
    amount: 100000,
    alert: 'debit',
    vendor: 'Jide Cole',
    status: 'completed',
    _id: 'ASFD32S3DFGD24',
    user_id: 'odo4343284732r5tio',
    date_time: '2023-03-24T15:03:00Z',
    transaction_ref: '$dn32ye8d8h128ex2en2x8ey1e8',
  },
  {
    amount: 1000,
    alert: 'debit',
    vendor: 'CLU200203-442',
    status: 'completed',
    _id: 'ASFD32S3DFGD25',
    user_id: 'odo4343284732r5tio',
    date_time: '2023-03-24T03:03:00Z',
    transaction_ref: '$dn32ye8d8h128ex2en2x8ey1e8',
  },
];

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

        <Route path='/student' element={<HomeStudent studentBaseUrl={baseURLs.student} />}></Route>
        <Route
          path='/student/history'
          element={<HistoryStudent studentBaseUrl={baseURLs.student} />}
        ></Route>
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
          element={<ProfileStudent studentBaseUrl={baseURLs.student} />}
        ></Route>
        <Route path='/student/send-money' element={<SendMoneyStudent />}></Route>
        <Route path='/student/receive-money' element={<ReceiveMoneyStudent />}></Route>

        <Route path='/vendor' element={<HomeVendor user={user2} />}></Route>
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

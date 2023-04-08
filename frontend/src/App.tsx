import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';

import { HistoryData, User } from './interfaces';

import HomeStudent from './pages/student/Home';
import LoginStudent from './pages/student/Login';
import SignUpStudent from './pages/student/SignUp';
import HistoryStudent from './pages/student/History';
import CreatePinStudent from './pages/student/CreatePin';

import HomeVendor from './pages/vendor/Home';
import LoginVendor from './pages/vendor/Login';
import SignUpVendor from './pages/vendor/SignUp';
import CreatePinVendor from './pages/vendor/CreatePin';

// this information should be fetched and stored using useState and
// then made available throughout the application.
// this is just dummy data
const history: HistoryData[] = [
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

const user: User = {
  history,
  name: 'Joseph',
  balance: 168260,
  clientType: 'student',
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

        <Route path='/student/home' element={<HomeStudent user={user} />}></Route>
        <Route path='/student/history' element={<HistoryStudent history={history} />}></Route>
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

        <Route path='/vendor/home' element={<HomeVendor />}></Route>
        <Route path='/vendor/login' element={<LoginVendor />}></Route>
        <Route
          path='/vendor/sign-up'
          element={<SignUpVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route path='/vendor/create-pin' element={<CreatePinVendor />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

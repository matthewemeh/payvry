import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';

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

const App = () => {
  const baseURLs = {
    vendor: process.env.REACT_APP_VENDOR_API!,
    student: process.env.REACT_APP_STUDENT_API!,
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

        <Route path='/vendor' element={<HomeVendor vendorBaseUrl={baseURLs.vendor} />}></Route>
        <Route
          path='/vendor/history'
          element={<HistoryVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route
          path='/vendor/login'
          element={<LoginVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route
          path='/vendor/sign-up'
          element={<SignUpVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route
          path='/vendor/create-pin'
          element={<CreatePinVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route
          path='/vendor/profile'
          element={<ProfileVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>
        <Route
          path='/vendor/receive-money'
          element={<ReceiveMoneyVendor vendorBaseUrl={baseURLs.vendor} />}
        ></Route>

        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/admin/home' element={<HomeAdmin />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

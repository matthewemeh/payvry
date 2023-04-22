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
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />}></Route>

        <Route path='/student' element={<HomeStudent />}></Route>
        <Route path='/student/login' element={<LoginStudent />}></Route>
        <Route path='/student/sign-up' element={<SignUpStudent />}></Route>
        <Route path='/student/history' element={<HistoryStudent />}></Route>
        <Route path='/student/profile' element={<ProfileStudent />}></Route>
        <Route path='/student/create-pin' element={<CreatePinStudent />}></Route>
        <Route path='/student/send-money' element={<SendMoneyStudent />}></Route>
        <Route path='/student/receive-money' element={<ReceiveMoneyStudent />}></Route>

        <Route path='/vendor' element={<HomeVendor />}></Route>
        <Route path='/vendor/login' element={<LoginVendor />}></Route>
        <Route path='/vendor/sign-up' element={<SignUpVendor />}></Route>
        <Route path='/vendor/history' element={<HistoryVendor />}></Route>
        <Route path='/vendor/profile' element={<ProfileVendor />}></Route>
        <Route path='/vendor/create-pin' element={<CreatePinVendor />}></Route>
        <Route path='/vendor/receive-money' element={<ReceiveMoneyVendor />}></Route>

        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/admin/home' element={<HomeAdmin />}></Route>
      </Routes>
    </Router>
  );
};

export default App;

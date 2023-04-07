import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginStudent from './pages/student/Login';
import SignUpStudent from './pages/student/SignUp';
import LandingStudent from './pages/student/Landing';
import CreatePinStudent from './pages/student/CreatePin';

import LoginVendor from './pages/vendor/Login';
import SignUpVendor from './pages/vendor/SignUp';
import LandingVendor from './pages/vendor/Landing';
import CreatePinVendor from './pages/vendor/CreatePin';

const App = () => {
  const baseURLs = {
    vendor: 'https://shrouded-tor-29635.herokuapp.com/vendor/api',
    student: 'https://shrouded-tor-29635.herokuapp.com/student/api',
  };

  return (
    <Router>
      <Routes>
        <Route path='/student/home' element={null}></Route>
        <Route path='/student' element={<LandingStudent />}></Route>
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

        <Route path='/vendor/home' element={null}></Route>
        <Route path='/vendor' element={<LandingVendor />}></Route>
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

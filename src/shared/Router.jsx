import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PubLogin from '../pages/PubLogin';
import PubMap from '../pages/PubMap';
import PubSignUp from '../pages/PubSignUp';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* 이하 퍼블리싱 테스트용 라우트입니다. */}
        <Route path="/publogin" element={<PubLogin />} />
        <Route path="/pubsignup" element={<PubSignUp />} />
        <Route path="/pub-map" element={<PubMap />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

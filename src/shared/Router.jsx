import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PubLogin from '../pages/PubLogin';
import PubMap from '../pages/PubMap';
import PubSignUp from '../pages/PubSignUp';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* 이하 퍼블리싱 테스트용 라우트입니다. */}
        <Route path="/publogin" element={<PubLogin isLogin={true} />} />
        <Route path="/pubsignup" element={<PubSignUp />} />
        <Route path="/pubMap" element={<PubMap />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

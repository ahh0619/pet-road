import { Link } from 'react-router-dom';
import LoginSignUpUI from '../components/login/LoginSignUpUI';
import { Hr, SignDiv, SignTitle, TxtP } from '../styles/PubLoginStyle';
import LoginForm from '../components/login/LoginForm';

const Login = () => {
  return (
    <LoginSignUpUI>
      <SignDiv>
        <SignTitle>로그인</SignTitle>
        <Hr />
        <LoginForm />
        <TxtP>
          아직 회원이 아니신가요? <Link to="/sign-up">회원가입</Link>
        </TxtP>
      </SignDiv>
    </LoginSignUpUI>
  );
};

export default Login;

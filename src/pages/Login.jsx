import LoginForm from '../components/login/LoginForm';
import { Main, Title, Wrap } from '../styles/user/signUpStyles';

const Login = () => {
  return (
    <Wrap>
      <Main>
        <Title>로그인</Title>
        <LoginForm />
      </Main>
    </Wrap>
  );
};

export default Login;

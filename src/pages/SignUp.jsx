import SignUpForm from '../components/sign-up/SignUpForm';
import { Main, Title, Wrap } from '../styles/user/signUpStyles';

const SignUp = () => {
  return (
    <Wrap>
      <Main>
        <Title>회원가입</Title>
        <SignUpForm />
      </Main>
    </Wrap>
  );
};

export default SignUp;

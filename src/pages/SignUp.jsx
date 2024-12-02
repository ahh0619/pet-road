import UserForm from '../components/sign-up/UserForm';
import { Main, Title, Wrap } from '../styles/user/signUpStyles';

const SignUp = () => {
  return (
    <Wrap>
      <Main>
        <Title>회원가입</Title>
        <UserForm />
      </Main>
    </Wrap>
  );
};

export default SignUp;

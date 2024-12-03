import LoginSignUpUI from '../components/login/LoginSignUpUI';
import SignUpForm from '../components/sign-up/SignUpForm';
import { Hr, SignDiv, SignTitle } from '../styles/PubLoginStyle';

const SignUp = () => {
  return (
    <LoginSignUpUI>
      <SignDiv $bottomGap="true">
        <SignTitle>회원가입</SignTitle>
        <Hr />
        <SignUpForm />
        {/* <TxtP>
        현재 위치 공유에 동의 하십니까?
        <input type="checkbox" />
      </TxtP> */}
      </SignDiv>
    </LoginSignUpUI>
  );
};

export default SignUp;

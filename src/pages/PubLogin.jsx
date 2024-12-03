import React from 'react';
import {
  Hr,
  Input,
  SignButton,
  SignDiv,
  SignTitle,
  TxtP,
} from '../styles/PubLoginStyle';
import { Link } from 'react-router-dom';
import LoginSignUpUI from '../components/login/LoginSignUpUI';

const PubLogin = () => {
  return (
    <LoginSignUpUI>
      <SignDiv>
        <SignTitle>로그인</SignTitle>
        <Hr />
        <Input type="text" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <SignButton>입장</SignButton>
        <TxtP>
          아직 회원이 아니신가요? <Link to="/pubsignup">회원가입</Link>
        </TxtP>
      </SignDiv>
    </LoginSignUpUI>
  );
};

export default PubLogin;

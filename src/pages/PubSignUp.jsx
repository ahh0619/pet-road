import React from 'react';
import {
  Hr,
  Input,
  SignButton,
  SignDiv,
  SignTitle,
  TxtP,
} from '../styles/PubLoginStyle';
import LoginSignUpUI from '../components/login/LoginSignUpUI';

const PubSignUp = () => {
  return (
    <LoginSignUpUI>
      <SignDiv bottomGap="true">
        <SignTitle>회원가입</SignTitle>
        <Hr />
        <Input type="text" placeholder="이메일" />
        <Input type="text" placeholder="닉네임" />
        <Input type="password" placeholder="비밀번호" />
        <Input type="password" placeholder="비밀번호 확인" />
        <TxtP>
          현재 위치 공유에 동의 하십니까?
          <input type="checkbox" />
        </TxtP>
        <SignButton>가입</SignButton>
      </SignDiv>
    </LoginSignUpUI>
  );
};

export default PubSignUp;

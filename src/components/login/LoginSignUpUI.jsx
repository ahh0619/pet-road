import React from 'react';
import {
  BgPatternImg,
  CopyrightP,
  LoginLogo,
  SignTotalWrap,
} from '../../styles/PubLoginStyle';

const LoginSignUpUI = ({ children }) => {
  return (
    <BgPatternImg>
      <LoginLogo src="/images/login-pet-logo.png" alt="로그인 로고"></LoginLogo>
      <SignTotalWrap>{children}</SignTotalWrap>
      <CopyrightP>
        &copy; 2024 Seven Warlords of the Sea. All rights reserved.
      </CopyrightP>
    </BgPatternImg>
  );
};

export default LoginSignUpUI;

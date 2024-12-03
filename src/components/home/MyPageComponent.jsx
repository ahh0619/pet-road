import React from 'react';
import {
  TitleP,
  MyPageWrap,
  MyPageTitle,
  MyPageUser,
  FileLabel,
  FileInput,
  FileName,
  FileUploadWrap,
} from '../../styles/PubMapPageStyle';
import { Input, SignButton } from '../../styles/PubLoginStyle';

const MyPageComponent = () => {
  return (
    <MyPageWrap>
      <MyPageTitle>
        <MyPageUser>
          <i class="fa-solid fa-circle-user"></i>
        </MyPageUser>
        <TitleP>칠무해 쿠마</TitleP>
      </MyPageTitle>
      <Input isMyPage="true" type="text" placeholder="닉네임" />
      <TitleP>프로필사진</TitleP>
      <FileUploadWrap>
        <FileLabel htmlFor="file-input">파일 선택</FileLabel>
        <FileInput id="file-input" type="file" accept="image/*, .pdf" />
        <FileName>선택된 파일: </FileName>
      </FileUploadWrap>
      <SignButton isMyPage="true">수정</SignButton>
    </MyPageWrap>
  );
};

export default MyPageComponent;

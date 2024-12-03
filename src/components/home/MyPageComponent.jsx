import { useNavigate } from 'react-router-dom';
import useAuthUserStore from '../../stores/useAuthUserStore';
import {
  TitleP,
  MyPageWrap,
  MyPageTitle,
  MyPageUser,
  FileLabel,
  FileInput,
  FileName,
  FileUploadWrap,
  UserProfileDiv,
} from '../../styles//KakaoMapStyle';
import { Input, SignButton } from '../../styles/PubLoginStyle';
import useAuth from '../../hooks/auth/useAuth';

import useProfileUpdate from '../../hooks/useProfile';

const MyPageComponent = () => {
  const navigate = useNavigate();
  const authUser = useAuthUserStore((state) => state.authUser);
  const { logout } = useAuth();

  const {
    newUserName,
    setNewUserName,
    newProfileImage,
    setNewProfileImage,
    handleProfileUpdate,
  } = useProfileUpdate();

  const handleSignButtonClick = () => {
    if (authUser) {
      handleProfileUpdate();
    } else {
      navigate('/login');
    }
  };

  return (
    <MyPageWrap>
      <MyPageTitle>
        <MyPageUser>
          {/* <i className="fa-solid fa-circle-user"></i> */}
          <UserProfileDiv></UserProfileDiv>
        </MyPageUser>
        <TitleP>
          {authUser?.userName ? `${authUser.userName}` : '로그인해주세요'}
        </TitleP>
      </MyPageTitle>
      {authUser ? (
        <>
          <div onClick={logout}>로그아웃</div>
          <Input
            $isMyPage="true"
            type="text"
            placeholder="닉네임"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TitleP>프로필사진</TitleP>
          <FileUploadWrap>
            <FileLabel htmlFor="file-input">파일 선택</FileLabel>
            <FileInput
              id="file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setNewProfileImage(e.target.files[0])}
            />
            <FileName>
              {newProfileImage
                ? `선택된 파일: ${newProfileImage.name}`
                : '선택된 파일 없음'}
            </FileName>
          </FileUploadWrap>
        </>
      ) : (
        <></>
      )}
      <SignButton $isMyPage="true" onClick={handleSignButtonClick}>
        {authUser ? '수정' : '로그인'}
      </SignButton>
    </MyPageWrap>
  );
};

export default MyPageComponent;

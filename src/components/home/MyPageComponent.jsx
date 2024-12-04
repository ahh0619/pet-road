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
  LogoutBtn,
} from '../../styles//KakaoMapStyle';
import { Input, SignButton } from '../../styles/PubLoginStyle';
import useAuth from '../../hooks/auth/useAuth';

import useProfileUpdate from '../../hooks/useProfileUpdate';

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
      // setNewUserName('');
      // setNewProfileImage('');
    } else {
      navigate('/login');
    }
  };

  return (
    <MyPageWrap>
      <MyPageTitle>
        <MyPageUser>
          {authUser ? (
            <UserProfileDiv
              $backgroundUrl={authUser.profileImage}
            ></UserProfileDiv>
          ) : (
            <i className="fa-solid fa-circle-user"></i>
          )}
        </MyPageUser>
        <TitleP>
          {authUser?.userName ? `${authUser.userName}` : '로그인해주세요'}
        </TitleP>
      </MyPageTitle>
      {authUser ? (
        <>
          <LogoutBtn onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </LogoutBtn>
          <Input
            $isMyPage="true"
            type="text"
            placeholder={authUser.userName}
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

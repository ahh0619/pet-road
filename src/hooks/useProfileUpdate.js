import { useState } from 'react';

import { uploadFile } from '../utils/uploadFile';
import { updateUserProfile } from '../api/user/profile';
import useAuthUserStore from '../stores/useAuthUserStore';

const useProfileUpdate = () => {
  const { authUser, updateAuthUser } = useAuthUserStore();

  const [newUserName, setNewUserName] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);

  // 프로필 업데이트 함수
  const handleProfileUpdate = async () => {
    try {
      let profileImageUrl = null;

      // 프로필 이미지가 있을 경우 업로드
      if (newProfileImage) {
        profileImageUrl = await uploadFile('profile_images', newProfileImage);
      }

      // 닉네임과 프로필 이미지 업데이트
      const data = await updateUserProfile({
        id: authUser.id,
        userName: newUserName || authUser.userName,
        profileImage: profileImageUrl || authUser.profileImage,
      });

      console.log('프로필이 성공적으로 업데이트되었습니다.', data);
      updateAuthUser({
        id: data[0].id,
        email: authUser.email,
        userName: data[0].user_name, // 'user_name'을 'userName'으로 변경
        profileImage: data[0].profile_image, // 'profile_image'를 'profileImage'로 변경
      });
      setNewUserName('');
      setNewProfileImage('');
    } catch (error) {
      console.error('프로필 업데이트 실패:', error); // 오류 처리
    }
  };

  return {
    newUserName,
    setNewUserName,
    newProfileImage,
    setNewProfileImage,
    handleProfileUpdate,
  };
};

export default useProfileUpdate;

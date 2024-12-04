import { supabase } from '../supabase/supabase'; // supabase 설정 가져오기

// 사용자 프로필 업데이트 함수
export const updateUserProfile = async ({ id, userName, profileImage }) => {
  console.log('Received values:', id, userName, profileImage);
  // 업데이트할 데이터 준비
  const updatedData = {
    user_name: userName,
    profile_image: profileImage,
  };

  // 데이터베이스 업데이트
  const { data, error } = await supabase
    .from('users')
    .update(updatedData)
    .eq('id', id)
    .select(); //

  // 에러 발생 시 처리
  if (error) {
    throw new Error('프로필 업데이트에 실패했습니다: ' + error.message);
  }

  return data; // 업데이트된 데이터 반환 (필요 시)
};

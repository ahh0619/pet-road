import { supabase } from '../supabase/supabase';

export const fetchBookmarks = async (authUser) => {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select()
      .eq('user_id', authUser.id);
    if (error) {
      throw Error(error.message);
    }
    // const fetchedBookmarks = data[0];
    // if (fetchedBookmarks) {
    // } else {
    //     alert('사용자를 찾을 수 없습니다.');
    // }
    return data;
  } catch (error) {
    console.error('북마크 정보 가져오기 실패:', error);
    throw error;
  }
};

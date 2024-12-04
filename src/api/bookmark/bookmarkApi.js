import { supabase } from '../supabase/supabase';

export const fetchBookmarks = async (authUser) => {
  try {
    const { data, error } = await supabase
      .from('bookmarks')
      .select()
      .eq('user_id', authUser.id)
      .order('create_at', { ascending: false });
    if (error) {
      throw Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('북마크 정보 가져오기 실패:', error);
    throw error;
  }
};

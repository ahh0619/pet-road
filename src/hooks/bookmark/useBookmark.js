import { useQuery } from '@tanstack/react-query';
import { fetchBookmarks } from '../../api/bookmark/bookmarkApi';
import useAuthUserStore from '../../stores/useAuthUserStore';

const useBookmark = () => {
  const authUser = useAuthUserStore((state) => state.authUser);
  const {
    data: bookmarks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookmarks', authUser],
    queryFn: () => fetchBookmarks(authUser),
    select: (data) => {
      // 데이터를 한 번만 정렬
      return data.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
    },
  });

  return {
    bookmarks,
    isLoading,
    error,
  };
};

export default useBookmark;

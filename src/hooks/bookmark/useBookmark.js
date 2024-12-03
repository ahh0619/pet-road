import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBookmarks } from '../../api/bookmark/bookmarkApi';
import useAuthUserStore from '../../stores/useAuthUserStore';

const useBookmark = () => {
  //   const queryClien = useQueryClient();
  const authUser = useAuthUserStore((state) => state.authUser);
  const {
    data: bookmarks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookmarks', authUser],
    queryFn: () => fetchBookmarks(authUser),
  });

  return {
    bookmarks,
    isLoading,
    error,
  };
};

export default useBookmark;

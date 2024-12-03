import React from 'react';
import useBookmark from '../../hooks/bookmark/useBookmark';

const Bookmark = () => {
  const { bookmarks, isLoading, error } = useBookmark();
  if (isLoading) return <p>로딩중...</p>;
  if (error) return <p>에러 확인: {error.message}</p>;
  console.log(bookmarks);
  return <div>Bookmark </div>;
};

export default Bookmark;

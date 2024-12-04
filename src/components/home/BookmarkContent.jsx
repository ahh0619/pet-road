import {
  ListItem,
  ListWrap,
  SearchTabLi,
  SearchTabUl,
  SerchListWrap,
  SerchTabWrap,
  ListLine,
  TitleP,
  ListBookmark,
  HeartIcon,
  AddressP,
  PhoneP,
} from '../../styles/KakaoMapStyle';
import useMapStore from '../../stores/useMapStore';
import { useEffect, useState } from 'react';
import useBookmark from '../../hooks/bookmark/useBookmark';
import usePlaceStore from '../../stores/usePlaceStore';

const BookmarkContent = ({ setShowDetail }) => {
  const { selectedCategory, setSelectedCategory } = useMapStore();
  const { selectedPlace, setSelectedPlace, isLiked } = usePlaceStore();
  const { bookmarks } = useBookmark();

  // 북마크 상태를 단일 상태로 관리
  const [filteredBookmarks, setFilteredBookmarks] = useState(() => {
    return bookmarks
      .map((item) => ({
        ...item,
        id: item.place_id,
      }))
      .sort((a, b) => new Date(b.create_at) - new Date(a.create_at)); // 정렬 유지
  });

  // 북마크 변경 시 filteredBookmarks 업데이트
  useEffect(() => {
    setFilteredBookmarks(
      bookmarks
        .map((item) => ({
          ...item,
          id: item.place_id,
        }))
        .sort((a, b) => new Date(b.create_at) - new Date(a.create_at)), // 정렬 유지
    );
  }, [bookmarks]);

  // 좋아요 상태(isLiked) 변경 시 filteredBookmarks 업데이트
  useEffect(() => {
    if (selectedPlace) {
      setFilteredBookmarks((prev) => {
        if (isLiked) {
          // 좋아요 추가
          const isAlreadyInList = prev.some(
            (place) => place.id === selectedPlace.id,
          );
          if (isAlreadyInList) return prev;

          return [...prev, selectedPlace].sort(
            (a, b) => new Date(b.create_at) - new Date(a.create_at),
          );
        } else {
          // 좋아요 제거
          return prev
            .filter((place) => place.id !== selectedPlace.id)
            .sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
        }
      });
    }
  }, [isLiked, selectedPlace]);

  return (
    <SerchListWrap>
      <SerchTabWrap>
        <SearchTabUl>
          <SearchTabLi
            $isActive={selectedCategory === 'CE7' ? 'true' : 'false'}
            onClick={() => setSelectedCategory('CE7')}
          >
            <i className="fa-solid fa-mug-saucer"></i>
            <p>카페</p>
          </SearchTabLi>
          <SearchTabLi
            $isActive={selectedCategory === 'AD5' ? 'true' : 'false'}
            onClick={() => setSelectedCategory('AD5')}
          >
            <i className="fa-solid fa-hotel"></i>
            <p>펜션</p>
          </SearchTabLi>
        </SearchTabUl>
      </SerchTabWrap>

      <ListWrap>
        {filteredBookmarks.map((place) => (
          <ListItem
            key={place.id}
            onClick={() => {
              setSelectedPlace(place);
              setShowDetail(true);
            }}
          >
            <ListLine>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className={`fa-solid ${
                    place.category_name?.includes('카페')
                      ? 'fa-mug-saucer'
                      : 'fa-hotel'
                  }`}
                  style={{ color: '#ff6732', marginRight: '8px' }}
                ></i>
                <TitleP $isListTitle="true">{place.place_name}</TitleP>
              </div>
              <ListBookmark>
                <HeartIcon className="fa-regular fa-heart" />
              </ListBookmark>
            </ListLine>
            <AddressP $isListTitle="true">
              {place.road_address_name || place.address_name}
            </AddressP>
            <PhoneP $isListTitle="true">
              {place.phone_number || '정보 없음'}
            </PhoneP>
          </ListItem>
        ))}
      </ListWrap>
    </SerchListWrap>
  );
};

export default BookmarkContent;

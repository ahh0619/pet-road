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
  const [selectedCategory, setSelectedCategory] = useState('카페');
  const { selectedPlace, setSelectedPlace, isLiked } = usePlaceStore();
  const { bookmarks } = useBookmark();

  const [filteredBookmarks, setFilteredBookmarks] = useState(() => {
    return bookmarks
      .map((item) => ({
        ...item,
        id: item.place_id,
      }))
      .sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
  });

  useEffect(() => {
    setFilteredBookmarks(
      bookmarks
        .map((item) => ({
          ...item,
          id: item.place_id,
        }))
        .sort((a, b) => new Date(b.create_at) - new Date(a.create_at)),
    );
  }, [bookmarks]);

  useEffect(() => {
    if (selectedPlace) {
      setFilteredBookmarks((prev) => {
        if (isLiked) {
          const isAlreadyInList = prev.some(
            (place) => place.id === selectedPlace.id,
          );
          if (isAlreadyInList) return prev;

          return [...prev, selectedPlace].sort(
            (a, b) => new Date(b.create_at) - new Date(a.create_at),
          );
        } else {
          return prev
            .filter((place) => place.id !== selectedPlace.id)
            .sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
        }
      });
    }
  }, [isLiked, selectedPlace]);

  const tabChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <SerchListWrap>
      <SerchTabWrap>
        <SearchTabUl $isActive="true">
          <SearchTabLi
            $isActive={selectedCategory === '카페' ? 'true' : 'false'}
            onClick={() => tabChange('카페')}
          >
            <i className="fa-solid fa-mug-saucer"></i>
            <p>카페</p>
          </SearchTabLi>
          <SearchTabLi
            $isActive={selectedCategory === '숙박' ? 'true' : 'false'}
            onClick={() => tabChange('숙박')}
          >
            <i className="fa-solid fa-hotel"></i>
            <p>펜션</p>
          </SearchTabLi>
        </SearchTabUl>
      </SerchTabWrap>

      <ListWrap>
        {filteredBookmarks
          .filter((place) => place.category_group_name === selectedCategory)
          .map((place) => (
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

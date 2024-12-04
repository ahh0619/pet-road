import {
  ListItem,
  ListWrap,
  SearchTabLi,
  SearchTabUl,
  SelectWrap,
  SerchListWrap,
  SerchTabWrap,
  SearchButton,
  ListLine,
  TitleP,
  ListBookmark,
  HeartIcon,
  AddressP,
  PhoneP,
} from '../../styles/KakaoMapStyle';
import RegionSelector from './RegionSelector';
import useMapStore from '../../stores/useMapStore';
import { useEffect, useRef, useState } from 'react';
import useBookmark from '../../hooks/bookmark/useBookmark';
import usePlaceStore from '../../stores/usePlaceStore';

const BookmarkContent = ({ setShowDetail }) => {
  const {
    map,
    markers,
    setMarkers,
    infowindow,
    places,
    setPlaces,
    selectedCategory,
    setSelectedCategory,
    selectedRegion,
    setSelectedRegion,
    selectedCity,
    setSelectedCity,
  } = useMapStore();

  const { selectedPlace, setSelectedPlace, isLiked } = usePlaceStore();
  const { bookmarks, isLoading, error } = useBookmark();
  const [filteredBookmarks, setFilteredBookmarks] = useState(() => {
    return bookmarks.map((items) => ({
      ...items,
      id: items.place_id,
    }));
  });
  console.log('filteredBookmarks123', filteredBookmarks);
  const updatedBookmarks = bookmarks.map((items) => ({
    ...items,
    id: items.place_id,
  }));

  useEffect(() => {
    // setFilteredBookmarks(updatedBookmarks);
    console.log('filteredBookmarks', filteredBookmarks);
  }, [filteredBookmarks]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isLiked) {
      if (selectedPlace) {
        // setFilteredBookmarks(updatedBookmarks);
        setFilteredBookmarks((prev) => [
          ...prev.filter((place) => place.id !== selectedPlace.id),
          selectedPlace,
        ]);
      }
    } else {
      setFilteredBookmarks((prev) =>
        prev.filter((place) => place.id !== selectedPlace.id),
      );
    }
  }, [isLiked]);

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
        {/* 첫 렌더링에서는 updatedBookmarks 사용, 그 이후에는 filteredBookmarks 사용 */}
        {(filteredBookmarks.length > 0
          ? filteredBookmarks
          : updatedBookmarks
        ).map((place, index) => (
          <ListItem
            key={index}
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

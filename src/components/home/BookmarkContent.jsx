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
import { createInfoWindowContent } from '../../utils/infoWindowUitl';
import { useEffect } from 'react';

const BookmarkContent = ({ setShowDetail, setSelectedPlaceId }) => {
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
        {places.map((place, index) => (
          <ListItem
            key={index}
            onClick={() => {
              const marker = markers[index];
              if (marker) {
                infowindow.setContent(createInfoWindowContent(place));
                infowindow.open(map, marker);
                map.panTo(marker.getPosition());
              }
              setSelectedPlaceId(place.id);
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
            <PhoneP $isListTitle="true">{place.phone || '정보 없음'}</PhoneP>
          </ListItem>
        ))}
      </ListWrap>
    </SerchListWrap>
  );
};

export default BookmarkContent;

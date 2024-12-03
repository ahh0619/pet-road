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

const MainContent = () => {
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

  const handleRegionChange = ({ region, city }) => {
    if (map && region && city) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const address = `${region} ${city}`;

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.panTo(coords);
        }
      });
    }
  };

  const searchByCategory = () => {
    if (!selectedCategory) {
      alert('카테고리를 선택해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    const center = map.getCenter();
    const keyword = selectedCategory === 'CE7' ? '애견 카페' : '애견 숙박';

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          displayPlaces(data);
        } else {
          alert('주변에 해당 시설이 존재하지 않아요.');
        }
      },
      {
        location: new window.kakao.maps.LatLng(
          center.getLat(),
          center.getLng(),
        ),
        radius: 20000,
      },
    );
  };

  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const newMarkers = places.map((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({ position });

      marker.setMap(map);
      bounds.extend(position);

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(createInfoWindowContent(place));
        infowindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
    map.setBounds(bounds);
  };

  useEffect(() => {
    if (selectedCategory) {
      searchByCategory(); // 선택된 카테고리로 자동 검색 실행
    }
  }, [selectedCategory]);

  return (
    <SerchListWrap>
      <SerchTabWrap>
        <SelectWrap>
          <RegionSelector
            selectedRegion={selectedRegion}
            selectedCity={selectedCity}
            setSelectedRegion={setSelectedRegion}
            setSelectedCity={setSelectedCity}
            onRegionChange={handleRegionChange}
          />
        </SelectWrap>
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

      <SearchButton onClick={searchByCategory}>현 위치로 검색</SearchButton>

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

export default MainContent;

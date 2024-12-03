import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useMapStore from '../../stores/useMapStore';
import RegionSelector from './RegionSelector';
import {
  HeartIcon,
  ListBookmark,
  ListItem,
  ListWrap,
  ListLine,
  PhoneP,
  SearchTabLi,
  SearchTabUl,
  SelectWrap,
  SerchListWrap,
  SerchTabWrap,
  TitleP,
  AddressP,
  SearchButton,
  SideBar,
} from '../../styles/KakaoMapStyle';
import MapControls from './MapControls';

const KakaoMap = () => {
  const location = useCurrentLocation();
  const { map, setMap } = useMapStore();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_REACT_APP_KAKAOMAP_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // 초기 지도 설정
  useEffect(() => {
    if (!loading && !error) {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const mapInstance = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(mapInstance);

      const infowindowInstance = new window.kakao.maps.InfoWindow({
        zIndex: 1,
      });
      setInfowindow(infowindowInstance);
    }
  }, [loading, error, setMap]);

  // 현재 위치 기반 RegionSelector 초기화
  useEffect(() => {
    if (location && map) {
      const { lat, lng } = location;
      const center = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(center);

      if (!currentMarker) {
        const marker = new window.kakao.maps.Marker({
          position: center,
          image: new window.kakao.maps.MarkerImage(
            '/mylocation.svg',
            new window.kakao.maps.Size(40, 40),
            { offset: new window.kakao.maps.Point(20, 20) },
          ),
        });
        marker.setMap(map);
        setCurrentMarker(marker);
      } else {
        currentMarker.setPosition(center);
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(lng, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const regionInfo = result.find((r) => r.region_type === 'H');
          if (regionInfo) {
            const regionName = regionInfo.region_1depth_name;
            const cityName = regionInfo.region_2depth_name;

            if (regionName && cityName) {
              setSelectedRegion(regionName);
              setSelectedCity(cityName);
            }
          }
        }
      });
    }
  }, [location, map, currentMarker]);

  // 지도 이동 시 RegionSelector 상태 업데이트
  useEffect(() => {
    if (map) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      const updateRegionSelector = () => {
        const center = map.getCenter();
        geocoder.coord2RegionCode(
          center.getLng(),
          center.getLat(),
          (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const regionInfo = result.find((r) => r.region_type === 'H');
              if (regionInfo) {
                setSelectedRegion(regionInfo.region_1depth_name);
                setSelectedCity(regionInfo.region_2depth_name);
              }
            }
          },
        );
      };

      window.kakao.maps.event.addListener(
        map,
        'center_changed',
        updateRegionSelector,
      );

      return () => {
        window.kakao.maps.event.removeListener(
          map,
          'center_changed',
          updateRegionSelector,
        );
      };
    }
  }, [map]);

  // RegionSelector 변경 시 지도 이동
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

  // 카테고리 검색
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

  // 검색 결과 마커 표시
  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const newMarkers = places.map((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position,
      });
      marker.setMap(map);
      bounds.extend(position);

      window.kakao.maps.event.addListener(marker, 'click', () => {
        const iconClass = place.category_name?.includes('카페')
          ? 'fa-mug-saucer'
          : 'fa-hotel'; // 카테고리에 따라 아이콘 클래스 결정

        infowindow.setContent(`
          <div style="
            padding: 10px; 
            font-size: 14px; 
            line-height: 1.6; 
            display: flex; 
            align-items: flex-start; 
            gap: 10px; 
            max-width: 250px; 
            width: auto; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
            background-color: #fff; 
            color: #333;
          ">
            <!-- 아이콘 -->
            <div style="flex-shrink: 0; font-size: 20px;">
              <i class="fa-solid ${iconClass}" style="color: #ff6732;"></i>
            </div>
            <!-- 텍스트 -->
            <div>
              <strong style="font-size: 16px; color: #4b74c6; font-weight:bold; display: block; margin-bottom: 5px;">
                ${place.place_name}
              </strong>
              <span style="font-size: 14px; color: #555; display: block; margin-bottom: 3px;">
                ${place.road_address_name || place.address_name}
              </span>
              <span style="font-size: 13px; color: #999;">
                ${place.phone || '전화번호 없음'}
              </span>
            </div>
          </div>
        `);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Kakao Map</div>;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <SideBar />
      <SerchListWrap>
        {/* 검색 및 필터 UI */}
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
              isActive={selectedCategory === 'AD5' ? 'true' : 'false'}
              onClick={() => setSelectedCategory('AD5')} // 선택된 카테고리 업데이트
            >
              <i className="fa-solid fa-hotel"></i>
              <p>숙박</p>
            </SearchTabLi>
            <SearchTabLi
              isActive={selectedCategory === 'CE7' ? 'true' : 'false'}
              onClick={() => setSelectedCategory('CE7')} // 선택된 카테고리 업데이트
            >
              <i className="fa-solid fa-mug-saucer"></i>
              <p>카페</p>
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
                  infowindow.setContent(`
            <div style="
              padding: 10px; 
              font-size: 14px; 
              line-height: 1.6; 
              display: flex; 
              align-items: flex-start; 
              gap: 10px; 
              max-width: 250px; 
              width: auto; /* 자동으로 콘텐츠에 맞게 */
              border-radius: 8px; 
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
              background-color: #fff; 
              color: #333;
            ">
              <!-- 아이콘 -->
              <div style="flex-shrink: 0; font-size: 20px;">
                <i class="fa-solid ${
                  place.category_name?.includes('카페')
                    ? 'fa-mug-saucer'
                    : 'fa-hotel'
                }" style="color: #ff6732;"></i>
              </div>
              <!-- 텍스트 -->
              <div>
                <strong style="font-size: 16px; color: #4b74c6; font-weight:bold; display: block; margin-bottom: 5px;">
                  ${place.place_name}
                </strong>
                <span style="font-size: 14px; color: #555; display: block; margin-bottom: 3px;">
                  ${place.road_address_name || place.address_name}
                </span>
                <span style="font-size: 13px; color: #999;">
                  ${place.phone || '전화번호 없음'}
                </span>
              </div>
            </div>
          `);
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
                  <TitleP isListTitle="true">{place.place_name}</TitleP>
                </div>
                <ListBookmark>
                  <HeartIcon className="fa-regular fa-heart" />
                </ListBookmark>
              </ListLine>
              <AddressP isListTitle="true">
                {place.road_address_name || place.address_name}
              </AddressP>
              <PhoneP isListTitle="true">{place.phone || '정보 없음'}</PhoneP>
            </ListItem>
          ))}
        </ListWrap>
      </SerchListWrap>

      <div style={{ flex: 1 }}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </div>
      <MapControls location={location} />
    </div>
  );
};

export default KakaoMap;

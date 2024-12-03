import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import MapControls from './MapControls';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useMapStore from '../../stores/useMapStore';
import RegionSelector from './RegionSelector';

const KakaoMap = () => {
  const location = useCurrentLocation(); // 현재 위치 가져오기
  const { map, setMap } = useMapStore(); // Zustand에서 map 상태 가져오기 및 설정
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_REACT_APP_KAKAOMAP_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null); // 내 현재 위치 마커
  const [places, setPlaces] = useState([]); // 검색 결과
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리

  // RegionSelector 상태
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

      // 초기 인포윈도우 설정
      const infowindowInstance = new window.kakao.maps.InfoWindow({
        zIndex: 1,
      });
      setInfowindow(infowindowInstance);
    }
  }, [loading, error, setMap]);

  // 초기 로딩 시 현재 위치 기반 RegionSelector 설정
  useEffect(() => {
    if (location && map) {
      const { lat, lng } = location;
      const center = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(center);

      // 현재 위치 마커 표시
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

      // 현재 위치 기반 RegionSelector 업데이트
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
                const newRegion = regionInfo.region_1depth_name || '';
                const newCity = regionInfo.region_2depth_name || '';

                if (!newRegion || !newCity) return;

                setSelectedRegion(newRegion);
                setSelectedCity(newCity);
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

    // 카테고리별로 키워드 추가
    const keyword = selectedCategory === 'CE7' ? '애견 카페' : '애견 숙박';

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          displayPlaces(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('주변에 시설이 존재하지 않아요.');
        } else {
          alert('검색 중 오류가 발생했습니다.');
        }
      },
      {
        location: new window.kakao.maps.LatLng(
          center.getLat(),
          center.getLng(),
        ),
        radius: 20000, // 검색 반경
      },
    );
  };

  // 검색 결과 마커 표시
  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();

    // 기존 마커 초기화
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    // 새로운 마커 생성
    const newMarkers = places.map((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({
        position,
      });

      marker.setMap(map);
      bounds.extend(position);

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(`
          <div style="padding:10px; font-size:14px;">
            <strong>${place.place_name}</strong><br/>
            ${place.road_address_name || place.address_name}<br/>
            ${place.phone ? `전화번호: ${place.phone}` : '전화번호 없음'}
          </div>
        `);
        infowindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
    map.setBounds(bounds);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Kakao Map</div>;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div
        style={{
          width: '300px',
          padding: '10px',
          overflowY: 'auto',
          borderRight: '1px solid #ddd',
          backgroundColor: '#f9f9f9',
        }}
      >
        <RegionSelector
          selectedRegion={selectedRegion}
          selectedCity={selectedCity}
          setSelectedRegion={setSelectedRegion}
          setSelectedCity={setSelectedCity}
          onRegionChange={handleRegionChange}
        />
        <div>
          <button
            onClick={() => setSelectedCategory('CE7')}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: selectedCategory === 'CE7' ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            카페
          </button>
          <button
            onClick={() => setSelectedCategory('AD5')}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: selectedCategory === 'AD5' ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            펜션
          </button>
          <button
            onClick={searchByCategory}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            현 위치로 검색
          </button>
        </div>

        {/* 검색 결과 리스트 */}
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
          {places.map((place, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
              }}
              onClick={() => {
                const marker = markers[index];
                if (marker) {
                  infowindow.setContent(`
            <div style="padding:10px; font-size:14px;">
              <strong>${place.place_name}</strong><br/>
              ${place.road_address_name || place.address_name}<br/>
              ${place.phone ? `전화번호: ${place.phone}` : '전화번호 없음'}
            </div>
          `);
                  infowindow.open(map, marker);
                  map.panTo(marker.getPosition());
                }
              }}
            >
              <strong style={{ fontSize: '16px' }}>{place.place_name}</strong>
              <br />
              <span style={{ color: '#555' }}>
                {place.road_address_name || place.address_name}
              </span>
              <br />
              <span style={{ color: place.phone ? '#007bff' : '#999' }}>
                {place.phone || '전화번호 없음'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ position: 'relative', flex: 1 }}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
        <MapControls location={location} />
      </div>
    </div>
  );
};

export default KakaoMap;

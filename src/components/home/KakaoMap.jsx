import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import MapControls from './MapControls'; // MapControls 컴포넌트
import useCurrentLocation from '../../hooks/useCurrentLocation'; // useCurrentLocation 훅
import useMapStore from '../../stores/useMapStore'; // 변경된 Zustand 스토어

const KakaoMap = () => {
  const location = useCurrentLocation(); // 현재 위치 가져오기
  const { map, setMap } = useMapStore(); // Zustand에서 map 상태 가져오기 및 설정
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_REACT_APP_KAKAOMAP_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [address, setAddress] = useState('');
  const [clickMarker, setClickMarker] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null); // 내 현재 위치 마커
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('');

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

      // 클릭 마커 설정
      const markerInstance = new window.kakao.maps.Marker({
        position: mapInstance.getCenter(),
      });
      markerInstance.setMap(mapInstance);
      setClickMarker(markerInstance);

      // 지도 클릭 이벤트 추가
      window.kakao.maps.event.addListener(
        mapInstance,
        'click',
        (mouseEvent) => {
          const latlng = mouseEvent.latLng;

          // 클릭한 위치 마커 이동
          markerInstance.setPosition(latlng);
          setClickPosition({ lat: latlng.getLat(), lng: latlng.getLng() });

          // 좌표 -> 주소 변환 요청
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(
            latlng.getLng(),
            latlng.getLat(),
            (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address =
                  result[0]?.road_address?.address_name ||
                  result[0]?.address?.address_name ||
                  '주소 정보 없음';
                setAddress(address);

                // 클릭 위치에 인포윈도우 표시
                infowindowInstance.setContent(`
                <div style="padding:10px; font-size:14px;">
                  <strong>클릭한 위치</strong><br/>
                  ${address}<br/>
                  위도: ${latlng.getLat()}<br/>
                  경도: ${latlng.getLng()}
                </div>
              `);
                infowindowInstance.open(mapInstance, markerInstance);
              } else {
                setAddress('주소 정보를 가져올 수 없습니다.');
              }
            },
          );
        },
      );
    }
  }, [loading, error, setMap]);

  useEffect(() => {
    if (location && map) {
      const { lat, lng } = location;
      const center = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(center);

      // 현재 위치 표시
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
    }
  }, [location, map, currentMarker]);

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    if (location) {
      const { lat, lng } = location;

      ps.keywordSearch(
        keyword,
        (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setPlaces(data);
            displayPlaces(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
          } else {
            alert('검색 중 오류가 발생했습니다.');
          }
        },
        {
          location: new window.kakao.maps.LatLng(lat, lng),
          radius: 20000,
        },
      );
    } else {
      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          displayPlaces(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
        } else {
          alert('검색 중 오류가 발생했습니다.');
        }
      });
    }
  };

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
        infowindow.setContent(`
          <div style="padding:10px; font-size:14px;">
            <strong>${place.place_name}</strong><br/>
            ${place.road_address_name || place.address_name}<br/>
            ${place.phone ? `전화번호: ${place.phone}` : ''}
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
      {/* 검색 결과 리스트 */}
      <div
        style={{
          width: '300px',
          padding: '10px',
          overflowY: 'auto',
          borderRight: '1px solid #ddd',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div>
          <input
            type="text"
            placeholder="검색 키워드"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={searchPlaces}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            검색
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
          {places.map((place, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
                backgroundColor: '#fff',
              }}
              onClick={() => {
                const marker = markers[index];
                infowindow.setContent(`
                  <div style="padding:10px; font-size:14px;">
                    <strong>${place.place_name}</strong><br/>
                    ${place.road_address_name || place.address_name}<br/>
                    ${place.phone ? `전화번호: ${place.phone}` : ''}
                  </div>
                `);
                infowindow.open(map, marker);
                map.panTo(marker.getPosition());
              }}
            >
              <strong>{place.place_name}</strong>
              <br />
              {place.road_address_name || place.address_name}
              <br />
              {place.phone}
            </li>
          ))}
        </ul>
      </div>

      {/* 지도 */}
      <div style={{ position: 'relative', flex: 1 }}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>

        {/* 지도 컨트롤러 */}
        <MapControls location={location} />

        {/* 클릭한 위치 정보 */}
        <div
          id="clickLatlng"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            zIndex: 100,
            backgroundColor: 'white',
            padding: '10px',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px',
          }}
        >
          {clickPosition ? (
            <p>
              <strong>주소</strong>: {address || '정보 없음'}
              <br />
              <strong>위도</strong>: {clickPosition.lat}, <strong>경도</strong>:{' '}
              {clickPosition.lng}
            </p>
          ) : (
            <p>지도를 클릭하여 위치를 선택하세요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;

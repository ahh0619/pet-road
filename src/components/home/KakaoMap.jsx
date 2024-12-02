import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_REACT_APP_KAKAOMAP_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });
  const location = useCurrentLocation(); //사용자 현재 위치 정보 받아옴

  const displayMarker = (locPosition, markerImagePath = null) => {
    if (!map) return;

    const markerImage = new window.kakao.maps.MarkerImage(
      markerImagePath,
      new window.kakao.maps.Size(24, 24),
    );

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
      image: markerImage,
    });
    marker.setMap(map);
  };

  useEffect(() => {
    if (!loading && map) {
      const locPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng,
      );

      displayMarker(locPosition, '/mylocation.svg');

      map.setCenter(locPosition);
    }
  }, [loading, map, location]);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [address, setAddress] = useState(''); // 클릭한 위치의 주소 저장
  const [clickMarker, setClickMarker] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null); // 내 현재 위치 마커
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current position:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

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
  }, [loading, error]);

  useEffect(() => {
    if (currentPosition && map) {
      const { lat, lng } = currentPosition;
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
  }, [currentPosition, map, currentMarker]);

  const searchPlaces = () => {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    if (currentPosition) {
      const { lat, lng } = currentPosition;

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* 검색 UI */}
        <div
          style={{
            width: '300px',
            padding: '10px',
            overflowY: 'scroll',
            height: '100%',
          }}
        >
          <input
            type="text"
            placeholder="검색 키워드"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: '100%', padding: '5px' }}
          />
          <button
            onClick={searchPlaces}
            style={{ width: '100%', marginTop: '10px', padding: '5px' }}
          >
            검색
          </button>

          <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
            {places.map((place, index) => (
              <li
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  cursor: 'pointer',
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
        <div id="map" style={{ flex: 1, height: '100%' }}></div>
      </div>

      {/* 클릭한 위치 정보 */}
      <div id="clickLatlng" style={{ padding: '10px', textAlign: 'center' }}>
        {clickPosition ? (
          <p>
            <strong>주소</strong>: {address || '정보 없음'}
            <br />
          </p>
        ) : (
          <p>지도를 클릭하여 위치를 선택하세요.</p>
        )}
      </div>
    </div>
  );
};

export default KakaoMap;

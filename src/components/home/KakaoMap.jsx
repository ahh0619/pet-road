import { useEffect } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import useMapStore from '../../stores/mapStore';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import MapControls from './MapControls';

const KakaoMap = () => {
  const { map, setMap } = useMapStore(); // Zustand의 상태 업데이트 함수 가져오기
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

  useEffect(() => {
    if (!loading && !error) {
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div
      const map = new window.kakao.maps.Map(mapContainer, {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        level: 3, // 확대 레벨
      });

      setMap(map); // Zustand 상태에 저장
    }
  }, [loading, error, setMap]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Kakao Map</div>;

  return (
    <div id="map" style={{ width: '100%', height: '100vh' }}>
      <MapControls location={location} />
    </div>
  );
};

export default KakaoMap;

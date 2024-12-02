import { useEffect } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import mapStore from '../../stores/mapStore';

const KakaoMap = () => {
  const { setMap } = mapStore(); // Zustand의 상태 업데이트 함수 가져오기
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_REACT_APP_KAKAOMAP_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });

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

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
};

export default KakaoMap;

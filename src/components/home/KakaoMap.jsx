import { useEffect, useState } from 'react';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useMapStore from '../../stores/useMapStore';

import MapControls from './MapControls';

const KakaoMap = () => {
  const location = useCurrentLocation();
  const { map, setMap, setInfowindow, setSelectedCity, setSelectedRegion } =
    useMapStore();
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_REACT_APP_KAKAOMAP_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const [currentMarker, setCurrentMarker] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('Error loading Kakao Map:', error);
    return <div>Error loading Kakao Map</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </div>
      <MapControls location={location} />
    </div>
  );
};

export default KakaoMap;

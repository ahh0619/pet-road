import useMapStore from '../../stores/mapStore';
import styled from 'styled-components';
// 전체 컨트롤러를 감싸는 StyledController
const StyledController = styled.div`
  position: absolute;
  right: 2%;
  bottom: 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
`;

// LocationButton 스타일
const LocationButton = styled.div`
  background: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.075) 0px 3px 6px, rgba(0, 0, 0, 0.123) 0px 3px 6px;
  cursor: pointer;
  z-index: 101;

  &:hover {
    background-color: #f0f0f0; // hover 시 배경색 변경
  }
`;

// Zoom controls 컨테이너 스타일
const ZoomControls = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.075) 0px 3px 6px, rgba(0, 0, 0, 0.123) 0px 3px 6px;
  overflow: hidden;
  border-radius: 18px;
`;

// ZoomButton 개별 스타일
const ZoomButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
const MapControls = ({ location }) => {
  const { map } = useMapStore(); // Zustand에서 map 가져오기

  const zoomIn = () => {
    if (map) map.setLevel(map.getLevel() - 1);
  };

  const zoomOut = () => {
    if (map) map.setLevel(map.getLevel() + 1);
  };

  const setCenterToMyPosition = (lat, lng) => {
    if (map) map.panTo(new window.kakao.maps.LatLng(lat, lng));
  };

  return (
    <StyledController>
      <LocationButton
        onClick={() => setCenterToMyPosition(location.lat, location.lng)}
      >
        현재 위치
      </LocationButton>
      <ZoomControls>
        <ZoomButton onClick={zoomIn}>+</ZoomButton>
        <ZoomButton onClick={zoomOut}>-</ZoomButton>
      </ZoomControls>
    </StyledController>
  );
};

export default MapControls;

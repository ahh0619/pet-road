import useMapStore from '../../stores/useMapStore';
import styled from 'styled-components';
// 전체 컨트롤러를 감싸는 StyledController
const StyledController = styled.div`
  position: absolute;
  right: 2%;
  bottom: 5%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 100;
`;

// LocationButton 스타일
const LocationButton = styled.div`
  background: #ff6732; /* 현재 위치 버튼 색상 */
  color: #fff; /* 텍스트 색상 */
  border: none;
  border-radius: 24px;
  padding: 12px 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    background-color: #e05e2c; /* hover 시 더 어두운 오렌지색 */
    transform: translateY(-2px);
  }

  &:active {
    background-color: #c65228; /* 클릭 시 더 진한 오렌지색 */
    transform: translateY(0);
  }
`;

// Zoom controls 컨테이너 스타일
const ZoomControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  padding: 10px;
`;

// ZoomButton 개별 스타일
const ZoomButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px; /* 크기를 고정 */
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: #ff6732; /* 줌 버튼 색상 */
  background-color: #fff; /* 배경색 */
  border: 2px solid #ff6732; /* 테두리 */
  border-radius: 50%; /* 원형 버튼 */
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff6732; /* hover 시 배경색 변경 */
    color: #fff; /* 텍스트 색상 변경 */
    transform: scale(1.1); /* 약간 확대 */
  }

  &:active {
    transform: scale(1); /* 클릭 시 원래 크기로 */
    background-color: #e05e2c; /* 더 어두운 오렌지 */
    border-color: #e05e2c;
  }

  &:not(:last-child) {
    margin-bottom: 8px; /* 버튼 간 간격 추가 */
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

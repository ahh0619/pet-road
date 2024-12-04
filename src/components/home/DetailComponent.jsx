import { useEffect, useState } from 'react';
import { DetailWrap, CloseBtn, ControlMenu } from '../../styles/KakaoMapStyle';
import LikeComponent from './LikeComponent';
import usePlaceStore from '../../stores/usePlaceStore';

const DetailComponent = ({ setShowDetail }) => {
  const [url, setUrl] = useState('');
  const { selectedPlace } = usePlaceStore();

  const handleCloseBtn = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    setUrl(`https://place.map.kakao.com/m/${selectedPlace.id || '1692043917'}`);
  }, [selectedPlace.id]);

  return (
    <DetailWrap>
      <iframe src={url} title="장소 상세정보" scrolling="no"></iframe>
      <CloseBtn>
        <span style={{ cursor: 'pointer' }} onClick={handleCloseBtn}>
          &times;
        </span>
      </CloseBtn>
      <ControlMenu>
        {/*좋아요 버튼*/}
        <LikeComponent />
      </ControlMenu>
    </DetailWrap>
  );
};

export default DetailComponent;

import { useEffect, useState } from 'react';
import { DetailWrap, CloseBtn, ControlMenu } from '../../styles/KakaoMapStyle';
import LikeComponent from './LikeComponent';

const DetailComponent = ({ selectedPlaceId = '1692043917', setShowDetail }) => {
  const [url, setUrl] = useState('');

  const handleCloseBtn = () => {
    setShowDetail(false);
  };

  useEffect(() => {
    setUrl(`https://place.map.kakao.com/m/${selectedPlaceId}`);
  }, [selectedPlaceId]);

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
        <LikeComponent selectedPlaceId={selectedPlaceId}/>
      </ControlMenu>
    </DetailWrap>
  );
};

export default DetailComponent;

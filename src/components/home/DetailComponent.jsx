import { useEffect, useState } from 'react';
import { DetailWrap, CloseBtn, ControlMenu } from '../../styles/KakaoMapStyle';

const DetailComponent = ({ place_id = '1692043917', setShowDetail }) => {
  const [url, setUrl] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const heartImage = isLiked ? 'heart-on.png' : 'heart-off.png';

  const handleCloseBtn = () => {
    setShowDetail(false);
  };

  const handleLikeBtn = () => {
    // 좋아요 버튼 눌렀을 때 로직 처리
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  };

  useEffect(() => {
    setUrl(`https://place.map.kakao.com/m/${place_id}`);
  }, [place_id]);

  return (
    <DetailWrap>
      <iframe src={url} title="장소 상세정보" scrolling="no"></iframe>
      <CloseBtn>
        <span style={{ cursor: 'pointer' }} onClick={handleCloseBtn}>
          &times;
        </span>
      </CloseBtn>
      <ControlMenu>
        <img src={heartImage} onClick={handleLikeBtn} />{' '}
      </ControlMenu>
    </DetailWrap>
  );
};

export default DetailComponent;

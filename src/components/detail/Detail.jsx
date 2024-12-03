import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const IframeWrapper = styled.div`
  position: relative;
  width: 380px;
  height: 800px;
  overflow: auto;
  border-radius: 20px;

  iframe {
    width: 100%;
    height: 6800px;
    border: none;
    overflow: hidden; 
  }

  /* 커스텀 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 트랙 배경색 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #FFAD32; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 둥글게 */
    border: 2px solid #fff; /* 스크롤바 테두리 */
    cursor: pointer; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #e68a00; /* 스크롤바에 마우스를 올릴 때 색상 */
  }

`;

const CloseBtn = styled.div`
    width: 70px;
    height: 40px;
    background-color: #ffffff;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 100;

    font-size: 30px;
    text-align: right;
    padding-right: 10px;
`

const ControlMenu = styled.div`
    width: 370px;
    height: 60px;
    background-color: #ffffff;
    position: absolute;
    top: 280px; 
    text-align: right;
    z-index: 100;

    img{
        width: 35px;
        margin-top: 15px;
        margin-right: 15px;

        &:hover{
            cursor: pointer;
        }
    }
`

function Detail({ place_id = '1692043917', setShowDetail }) {
    const [url, setUrl] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const heartImage = isLiked ? "heart-on.png" : "heart-off.png";

    const handleCloseBtn = () => {
        setShowDetail(false);
    };

    const handleLikeBtn = () => {
        // 좋아요 버튼 눌렀을 때 로직 처리
        if (isLiked) { setIsLiked(false); } else { setIsLiked(true); }
    }

    useEffect(() => {
        setUrl(`https://place.map.kakao.com/m/${place_id}`);
    }, [place_id]);

    return (
        <IframeWrapper>
            <iframe src={url} title="장소 상세정보" scrolling="no"></iframe>
            <CloseBtn><span style={{ cursor: "pointer" }} onClick={handleCloseBtn}>&times;</span></CloseBtn>
            <ControlMenu><img src={heartImage} onClick={handleLikeBtn} /> </ControlMenu>
        </IframeWrapper>
    );
}

export default Detail;

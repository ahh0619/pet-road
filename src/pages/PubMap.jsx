import React from 'react';
import { MapWrap } from '../styles/PubMapPageStyle';
import SideBarComponent from '../components/home/SideBarComponent';
import MainContentsComponent from '../components/home/MainContentsComponent';
import TooltipComponent from '../components/home/TooltipComponent';
import DetailComponent from '../components/home/DetailComponent';
import MyPageComponent from '../components/home/MyPageComponent';

const PubMap = () => {
  return (
    // =====================> MapWrap의 인라인스타일은 지도적용시 지원주세요, '지도영역'글씨도 지워주세요
    <MapWrap
      style={{
        textAlign: 'center',
        paddingLeft: '200px',
        boxSizing: 'border-box',
      }}
    >
      지도영역
      {/* 사이드바 영역 */}
      <SideBarComponent />
      {/* 메인컨텐츠 영역 */}
      <MainContentsComponent />
      {/* ===============> 지도 표시 말풍선내용 div를 제외한 부분을 뜯어가시면 될거 같아요*/}
      <div
        style={{
          position: 'absolute',
          top: '200px',
          right: '200px',
          backgroundColor: 'white',
        }}
      >
        <TooltipComponent />
      </div>
      <DetailComponent />
      <MyPageComponent />
    </MapWrap>
  );
};

export default PubMap;

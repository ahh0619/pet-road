import { useState } from 'react';
import {
  SideBar,
  SideBarLogoWrap,
  Tab,
  UserWrap,
  UserProfileWrap,
} from '../../styles/KakaoMapStyle';
import { Hr } from '../../styles/PubLoginStyle';
import MyPageComponent from './MyPageComponent';

const SideBarComponent = ({
  showMain,
  setShowMain,
  showBookmark,
  setShowBookmark,
}) => {
  const [isMyPageVisible, setIsMyPageVisible] = useState(false);
  const handleHomeIcon = () => {
    if (showMain) {
      setShowMain(false);
    } else {
      setShowMain(true);
    }
  };

  const handleBookmarkIcon = () => {
    if (showBookmark) {
      setShowBookmark(false);
    } else {
      setShowBookmark(true);
    }
  };

  return (
    <SideBar>
      <SideBarLogoWrap>
        <img src="/images/map-pet-logo.png" />
      </SideBarLogoWrap>
      <Hr $bottomGap="false" />

      <Tab $selectOn="true" onClick={handleHomeIcon}>
        <i className="fa-solid fa-location-dot"></i>
        <br />
        <p>지도 홈</p>
      </Tab>
      <Tab onClick={handleBookmarkIcon}>
        <i className="fa-solid fa-heart"></i>
        <br />
        <p>북마크</p>
      </Tab>

      <UserWrap onClick={() => setIsMyPageVisible(!isMyPageVisible)}>
        <i className="fa-solid fa-circle-user"></i>
        <UserProfileWrap onClick={(e) => e.stopPropagation()}>
          {isMyPageVisible && <MyPageComponent />}
        </UserProfileWrap>
      </UserWrap>
    </SideBar>
  );
};

export default SideBarComponent;

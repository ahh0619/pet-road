import { useState } from 'react';
import {
  SideBar,
  SideBarLogoWrap,
  Tab,
  UserWrap,
  UserProfileWrap,
  UserProfileDiv,
} from '../../styles/KakaoMapStyle';
import { Hr } from '../../styles/PubLoginStyle';
import MyPageComponent from './MyPageComponent';
import useAuthUserStore from '../../stores/useAuthUserStore';

const SideBarComponent = ({
  showMain,
  setShowMain,
  showBookmark,
  setShowBookmark,
  setShowDetail
}) => {
  const [isMyPageVisible, setIsMyPageVisible] = useState(false);
  const authUser = useAuthUserStore((state) => state.authUser);

  const handleHomeIcon = () => {
    if (showMain) {
      setShowDetail(false);
      setShowMain(false);
    } else {
      setShowMain(true);
      setShowBookmark(false);
      setShowDetail(false);
    }
  };

  const handleBookmarkIcon = () => {
    if (showBookmark) {
      setShowDetail(false);
      setShowBookmark(false);
    } else {
      setShowBookmark(true);
      setShowMain(false);
      setShowDetail(false);
    }
  };

  return (
    <SideBar>
      <SideBarLogoWrap>
        <img src="/images/map-pet-logo.png" />
      </SideBarLogoWrap>
      <Hr $bottomGap="false" />

      <Tab $selectOn={showMain} onClick={handleHomeIcon}>
        <i className="fa-solid fa-location-dot"></i>
        <br />
        <p>지도 홈</p>
      </Tab>
      <Tab $selectOn={showBookmark} onClick={handleBookmarkIcon}>
        <i className="fa-solid fa-heart"></i>
        <br />
        <p>북마크</p>
      </Tab>

      <UserWrap onClick={() => setIsMyPageVisible(!isMyPageVisible)}>
        {authUser ? (
          <UserProfileDiv
            $backgroundUrl={authUser.profileImage}
          ></UserProfileDiv>
        ) : (
          <i className="fa-solid fa-circle-user"></i>
        )}

        <UserProfileWrap onClick={(e) => e.stopPropagation()}>
          {isMyPageVisible && <MyPageComponent />}
        </UserProfileWrap>
      </UserWrap>
    </SideBar>
  );
};

export default SideBarComponent;

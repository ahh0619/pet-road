import React from 'react';
import {
  SideBar,
  SideBarLogoWrap,
  Tab,
  UserWrap,
} from '../../styles/PubMapPageStyle';
import { Hr } from '../../styles/PubLoginStyle';

const SideBarComponent = () => {
  return (
    <SideBar>
      <SideBarLogoWrap>
        <img src="/images/map-pet-logo.png" />
      </SideBarLogoWrap>
      <Hr bottomGap="false" />
      <Tab selectOn="true">
        <i class="fa-solid fa-location-dot"></i>
        <br />
        <p>지도 홈</p>
      </Tab>
      <Tab>
        <i class="fa-solid fa-heart"></i>
        <br />
        <p>북마크</p>
      </Tab>
      <UserWrap>
        <i class="fa-solid fa-circle-user"></i>
      </UserWrap>
    </SideBar>
  );
};

export default SideBarComponent;

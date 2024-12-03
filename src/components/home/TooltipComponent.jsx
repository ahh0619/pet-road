import React from 'react';
import {
  ListLine,
  PhoneP,
  TitleP,
  AddressP,
  MapCommentWrap,
} from '../../styles/PubMapPageStyle';

const TooltipComponent = () => {
  return (
    <MapCommentWrap>
      <ListLine>
        <i class="fa-solid fa-utensils"></i>
        <TitleP>칠랑고asdfasdfasdasdfasㅁㄴㅇㄹㄹㄴㅇㄹㅁㄴㅇdff</TitleP>
      </ListLine>
      <AddressP>서울 강남구 역삼로67길 19</AddressP>
      <ListLine>
        <PhoneP>0507-1379-4511</PhoneP>
      </ListLine>
    </MapCommentWrap>
  );
};

export default TooltipComponent;

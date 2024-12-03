import {
  HeartIcon,
  ListBookmark,
  ListItem,
  ListWrap,
  ListLine,
  MoreButton,
  PhoneP,
  SearchSelect,
  SearchTabLi,
  SearchTabUl,
  SelectWrap,
  SerchListWrap,
  SerchTabWrap,
  SubTitleP,
  TitleP,
  AddressP,
} from '../../styles/KakaoMapStyle';

const MainContentsComponent = () => {
  return (
    <SerchListWrap>
      {/* 셀렉트박스, 서치인풋, 탭 영역 */}
      <SerchTabWrap>
        {/* 셀렉트박스 영역 */}
        <SelectWrap>
          <SearchSelect>
            <option value="">시/도</option>
            <option value="서울">서울시</option>
            <option value="인천">인천시</option>
          </SearchSelect>
          <SearchSelect>
            <option value="">시/군/구</option>
            <option value="종로구">종로구</option>
            <option value="중구">중구</option>
          </SearchSelect>
        </SelectWrap>
        {/* 탭 영역 */}
        <SearchTabUl>
          <SearchTabLi $isActive="true">
            <i className="fa-solid fa-hotel"></i>
            <p>숙박</p>
          </SearchTabLi>
          <SearchTabLi $isActive="">
            <i className="fa-solid fa-mug-saucer"></i>
            <p>카페</p>
          </SearchTabLi>
        </SearchTabUl>
      </SerchTabWrap>
      {/* 리스트 영역 */}
      <ListWrap>
        {/* 첫번째 컨텐츠 반복 */}
        <ListItem>
          <ListLine>
            <TitleP isListTitle="true">
              칠랑고asdfasdfasdasdfasㅁㄴㅇㄹㄹㄴㅇㄹㅁㄴㅇdff
            </TitleP>
            <ListBookmark>
              <HeartIcon
                className="fa-solid fa-heart"
                $isActive="true"
              ></HeartIcon>
              <HeartIcon
                className="fa-regular fa-heart"
                $isActive=""
              ></HeartIcon>
            </ListBookmark>
          </ListLine>
          <SubTitleP>멕시코,남미음식</SubTitleP>
          <AddressP isListTitle="true">서울 강남구 역삼로67길 19</AddressP>
          <ListLine>
            <PhoneP isListTitle="true">0507-1379-4511</PhoneP>
            <MoreButton>상세보기</MoreButton>
          </ListLine>
        </ListItem>
        {/* 두번째 컨텐츠 반복 */}
        <ListItem>
          <ListLine>
            <TitleP isListTitle="true">
              칠랑고asdfasdfasdasdfasㅁㄴㅇㄹㄹㄴㅇㄹㅁㄴㅇdff
            </TitleP>
            <ListBookmark>
              <HeartIcon className="fa-solid fa-heart" $isActive=""></HeartIcon>
              <HeartIcon
                className="fa-regular fa-heart"
                $isActive="true"
              ></HeartIcon>
            </ListBookmark>
          </ListLine>
          <SubTitleP>멕시코,남미음식</SubTitleP>
          <AddressP isListTitle="true">서울 강남구 역삼로67길 19</AddressP>
          <ListLine>
            <PhoneP isListTitle="true">0507-1379-4511</PhoneP>
            <MoreButton>상세보기</MoreButton>
          </ListLine>
        </ListItem>
      </ListWrap>
    </SerchListWrap>
  );
};

export default MainContentsComponent;

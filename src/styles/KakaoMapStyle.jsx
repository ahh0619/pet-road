import styled from 'styled-components';

export const MypageDiv = styled.div`
  bottom: 20px;
  left: 10%;
  background: white; /* 배경색 추가로 다른 요소와의 겹침 문제 해결 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
export const UserProfileWrap = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
`;
export const MapWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #e1e1e1;
`;

export const SideBar = styled.div`
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  width: 65px;
  background-color: #fff;
  min-height: 100vh;
  border-right: 2px solid #ffad32;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

export const SideBarLogoWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;

  img {
    width: 60px;
  }
`;

export const Tab = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.$selectOn === 'true' ? '#fff' : '#595959')};
  background-color: ${(props) =>
    props.$selectOn === 'true' ? '#ff6732' : '#fff'};
  i {
    font-size: 25px;
  }

  p {
    padding-top: 5px;
  }
`;

export const UserWrap = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0px;
  text-align: center;
  color: #9b9b9b;
  padding-top: 15px;
  padding-bottom: 8px;
  border-top: 1px solid #a9a9a9;
  i {
    font-size: 34px;
  }
`;

export const SerchListWrap = styled.div`
  position: absolute;
  overflow-y: auto;
  z-index: 99;
  top: 0px;
  left: 67px;
  width: 350px;
  background-color: #fff;
  min-height: 100vh;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
`;

export const SerchTabWrap = styled.div`
  padding: 20px;
`;

export const SelectWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
  margin-bottom: 5px;
  box-sizing: border-box;
`;

export const SearchSelect = styled.select`
  padding: 10px;
  border: 0px;
  font-size: 16px;
  background-color: transparent;
  color: #333;
  width: 50%;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  &:first-of-type {
    border-right: 1px solid #a9a9a9;
  }
`;

export const SerchInputWrap = styled.div`
  position: relative;
  width: 100%;
`;

export const SerchInput = styled.input`
  border: 2px solid #ff6732;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  padding-right: 40px;
  margin-bottom: 20px;
  font-size: 16px;

  &::placeholder {
    color: #a8a8a8;
  }

  &:focus {
    outline: none;
    border-color: #ff6732;
  }
`;

export const Icon = styled.i`
  position: absolute;
  right: 10px;
  top: 8px;
  font-size: 26px;
  color: #ff6732;
  cursor: pointer;
`;

export const SearchTabUl = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: bold;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const SearchTabLi = styled.li`
  padding: 8px 15px; /* 버튼 크기 조정 */
  cursor: pointer;
  font-size: 16px;
  border-radius: 30px;
  border: 1px solid
    ${(props) => (props.$isActive === 'true' ? '#ff6732' : '#bababa')};
  background-color: ${(props) =>
    props.$isActive === 'true' ? '#fff5ee' : 'transparent'};
  color: ${(props) => (props.$isActive === 'true' ? '#ff6732' : '#999')};
  display: flex;
  align-items: center; /* 아이콘과 텍스트 정렬 */
  gap: 5px; /* 아이콘과 텍스트 간격 */

  i {
    color: inherit; /* 상위 색상(color)을 상속 */
    transition: color 0.2s ease; /* 부드러운 색상 전환 */
  }

  p {
    margin: 0;
    padding: 0;
  }

  &:hover {
    border-color: #ff6732;
    background-color: #fff5ee;
    color: #ff6732;

    i {
      color: #ff6732; /* 호버 시 아이콘 색상 */
    }
  }

  transition: all 0.3s ease; /* 부드러운 전환 효과 */
`;

export const ListWrap = styled.div`
  overflow-y: auto;
  text-align: left;
  line-height: 1.5;
  height: calc(100vh - 250px);
`;

export const ListItem = styled.div`
  border-top: 1px solid #d2d2d2;
  padding: 15px;
  box-sizing: border-box;
`;

export const ListLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleP = styled.p`
  color: ${(props) => (props.$isListTitle === 'true' ? '#4b74c6' : '#404040')};
  font-weight: bold;
  font-size: ${(props) => (props.$isListTitle === 'true' ? '18px' : '16px')};
  display: inline-block;
  max-width: ${(props) => (props.$isListTitle === 'true' ? '270px' : '200px')};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: ${(props) => (props.$isListTitle === 'true' ? '0px' : '5px')};
`;
export const SubTitleP = styled.p`
  color: #7e7e7e;
  font-size: 15px;
  display: inline-block;
  padding-left: 1px;
`;

export const ListBookmark = styled.div`
  padding: 3px;
  cursor: pointer;
  font-size: 18px;
  color: #ff3232;
`;

export const HeartIcon = styled.i`
  display: ${(props) => (props.$isActive === 'true' ? 'block' : 'none')};
`;

export const PhoneP = styled.p`
  color: #ff6732;
  display: inline-block;
  font-size: ${(props) => (props.$isListTitle === 'true' ? '16px' : '14px')};
`;

export const AddressP = styled.p`
  color: #404040;
  font-size: ${(props) => (props.$isListTitle === 'true' ? '16px' : '14px')};
`;

export const MoreButton = styled.button`
  padding: 3px 15px;
  cursor: pointer;
  color: #4b74c6;
  border: 1px solid #4b74c6;
  background-color: #fff;
  border-radius: 13px;
  font-weight: bold;
`;

export const MapCommentWrap = styled.div`
  text-align: left;
  i {
    color: #ff9011;
    display: inline-block;
  }
`;

export const DetailWrap = styled.div`
  position: absolute;
  z-index: 9999;
  top: 10px;
  left: 430px;
  width: 400px;
  background-color: #fff;
  height: calc(100% - 20px);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: auto;

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
    background-color: #ffad32; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모서리 둥글게 */
    border: 2px solid #fff; /* 스크롤바 테두리 */
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #e68a00; /* 스크롤바에 마우스를 올릴 때 색상 */
  }
`;

export const CloseBtn = styled.div`
  width: 90px;
  height: 40px;
  background-color: #ffffff;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 100;

  font-size: 30px;
  text-align: right;
  padding-right: 10px;
`;

export const ControlMenu = styled.div`
  width: 390px;
  height: 60px;
  background-color: #ffffff;
  position: absolute;
  top: 280px;
  text-align: right;
  z-index: 100;

  img {
    width: 35px;
    margin-top: 15px;
    margin-right: 15px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const MyPageTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const MyPageUser = styled.div`
  text-align: center;
  margin-right: 5px;
  color: #9b9b9b;
  border-top: 1px solid #a9a9a9;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  i {
    font-size: 34px;
  }
`;

export const MyPageWrap = styled.div`
  position: absolute;
  z-index: 99999;
  padding: 15px;
  bottom: 10px;
  left: 77px;
  width: 250px;
  background-color: #fff;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: left;
`;

export const FileUploadWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileLabel = styled.label`
  min-width: fit-content;
  background-color: #a9a9a9;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  display: block;
  margin-right: 5px;

  &:hover {
    background-color: #a9a9a9;
  }
`;

export const FileName = styled.div`
  color: #555;
  text-align: left;
  max-width: 160px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const SearchButton = styled.button`
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 30px;
  width: 80%;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #ff6732;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #e65d2d; /* Hover 시 색상 약간 어둡게 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Hover 시 그림자 강조 */
  }

  &:active {
    background-color: #cc4f26; /* Active 상태 */
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2); /* Active 시 내부 그림자 */
  }

  &:disabled {
    background-color: #a8a8a8; /* 비활성화 상태 */
    cursor: not-allowed;
    box-shadow: none;
  }
`;
export const UserProfileDiv = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.$backgroundUrl});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  overflow: hidden;
`;
export const LogoutBtn = styled.button`
  cursor: pointer;
  position: absolute;
  top: 21px;
  right: 10px;
  border: none;
  background-color: #fff;
  i {
    font-size: 18px;
    color: #777;
  }
`;

export const PaginationDiv = styled.div`
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ChevronButton = styled.div`
  cursor: pointer;
  font-size: 15px;
  padding: 0 15px;

  &:hover {
    color: #ff6732;
  }
`;

export const PageButton = styled.div`
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? '#FF900F' : '#fff')};
  padding: 3px 8px;
  margin: 0 3px;
  border-radius: 4px;

  &:hover {
    background-color: #ff6732;
    color: white;
  }
`;

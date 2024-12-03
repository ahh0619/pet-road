import styled from 'styled-components';

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
  cursor: pointer;
  color: ${(props) => (props.selectOn === 'true' ? '#fff' : '#595959')};
  background-color: ${(props) =>
    props.selectOn === 'true' ? '#ff6732' : '#fff'};
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
  z-index: 9999;
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
  width: 100%;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid #a9a9a9;
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
`;

export const SearchTabLi = styled.li`
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => (props.isActive === 'true' ? '#ff9011' : '#999')};
  border: ${(props) =>
    props.isActive === 'true' ? '1px solid #ffa641' : '1px solid #bababa'};
  border-radius: 30px;

  i {
    display: inline;
  }

  p {
    display: inline;
    padding-left: 5px;
  }
`;

export const ListWrap = styled.div`
  overflow-y: auto;
  text-align: left;
  line-height: 1.5;
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
  color: ${(props) => (props.isListTitle === 'true' ? '#4b74c6' : '#404040')};
  font-weight: bold;
  font-size: ${(props) => (props.isListTitle === 'true' ? '18px' : '16px')};
  display: inline-block;
  max-width: ${(props) => (props.isListTitle === 'true' ? '270px' : '200px')};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: ${(props) => (props.isListTitle === 'true' ? '0px' : '5px')};
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
  display: ${(props) => (props.isActive === 'true' ? 'block' : 'none')};
`;

export const PhoneP = styled.p`
  color: #ff6732;
  display: inline-block;
  font-size: ${(props) => (props.isListTitle === 'true' ? '16px' : '14px')};
`;

export const AddressP = styled.p`
  color: #404040;
  font-size: ${(props) => (props.isListTitle === 'true' ? '16px' : '14px')};
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
  min-height: calc(100% - 20px);
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
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

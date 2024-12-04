import {
  ListItem,
  ListWrap,
  SearchTabLi,
  SearchTabUl,
  SelectWrap,
  SerchListWrap,
  SerchTabWrap,
  SearchButton,
  ListLine,
  TitleP,
  ListBookmark,
  HeartIcon,
  AddressP,
  PhoneP,
} from '../../styles/KakaoMapStyle';
import RegionSelector from './RegionSelector';
import useMapStore from '../../stores/useMapStore';
import { createInfoWindowContent } from '../../utils/infoWindowUitl';
import { useEffect, useState } from 'react';
import usePlaceStore from '../../stores/usePlaceStore';
import { toast } from 'react-toastify';
const customMarkerImageSrc = '/maker.png'; //컴포넌트 밖으로 이동시켜서 렌더링 시 재정의 방지
const MainContent = ({ setShowDetail }) => {
  const {
    map,
    markers,
    setMarkers,
    infowindow,
    places,
    setPlaces,
    selectedCategory,
    setSelectedCategory,
    selectedRegion,
    setSelectedRegion,
    selectedCity,
    setSelectedCity,
  } = useMapStore();
  const { setSelectedPlace } = usePlaceStore();

  const handleRegionChange = ({ region, city }) => {
    if (map && region && city) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const address = `${region} ${city}`;

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.panTo(coords);
        }
      });
    }
  };

  const searchByCategory = () => {
    if (!selectedCategory) {
      toast.error('카테고리를 선택해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    const center = map.getCenter();
    const keyword = selectedCategory === 'CE7' ? '애견 카페' : '애견 숙박';

    // const allResults = [];

    let currentPage = 1;

    const fetchResults = () => {
      ps.keywordSearch(
        keyword,
        (data, status, pagination) => {
          if (status === window.kakao.maps.services.Status.OK) {
            // allResults.push(...data);
            console.log(data);

            displayPlaces(data);
            setPlaces(data);
            setPagination(pagination); //페이지네이션
            if (pagination) {
              setTotalPages(pagination.last);
            }
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            toast.error('주변에 해당 시설이 존재하지 않아요.');
          } else {
            toast.error('검색 중 오류가 발생했습니다.');
          }
        },
        {
          location: new window.kakao.maps.LatLng(
            center.getLat(),
            center.getLng(),
          ),
          radius: 20000, // 검색 반경 20km
          page: 1,
          size: 5,
        },
      );
    };

    // 첫 번째 페이지부터 검색 시작
    fetchResults(currentPage);
  };

  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const newMarkers = places.map((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);

      // 마커 이미지 설정
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커 크기
      const markerImage = new window.kakao.maps.MarkerImage(
        customMarkerImageSrc,
        imageSize,
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage, // 커스텀 마커 이미지 설정
      });

      marker.setMap(map);
      bounds.extend(position);

      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(createInfoWindowContent(place));
        infowindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);
    map.setBounds(bounds);
  };

  useEffect(() => {
    if (selectedCategory) {
      searchByCategory(); // 선택된 카테고리로 자동 검색 실행
    }
  }, [selectedCategory]);

  const [pagination, setPagination] = useState(null); // 페이지네이션 객체 저장
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 저장
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태 관리

  const handleGotoPage = (page) => {
    if (pagination && page > 0 && page <= pagination.last) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers(null);
      pagination.gotoPage(page); // 페이지네이션 객체의 .gotoPage 메서드 호출
      setCurrentPage(page);
    } else {
      toast.error('잘못된 페이지입니다.');
    }
  };
  return (
    <SerchListWrap>
      <SerchTabWrap>
        <SelectWrap>
          <RegionSelector
            selectedRegion={selectedRegion}
            selectedCity={selectedCity}
            setSelectedRegion={setSelectedRegion}
            setSelectedCity={setSelectedCity}
            onRegionChange={handleRegionChange}
          />
        </SelectWrap>
        <SearchTabUl>
          <SearchTabLi
            $isActive={selectedCategory === 'CE7' ? 'true' : 'false'}
            onClick={() => setSelectedCategory('CE7')}
          >
            <i className="fa-solid fa-mug-saucer"></i>
            <p>카페</p>
          </SearchTabLi>
          <SearchTabLi
            $isActive={selectedCategory === 'AD5' ? 'true' : 'false'}
            onClick={() => setSelectedCategory('AD5')}
          >
            <i className="fa-solid fa-hotel"></i>
            <p>펜션</p>
          </SearchTabLi>
        </SearchTabUl>
      </SerchTabWrap>

      <SearchButton onClick={searchByCategory}>현 위치로 검색</SearchButton>

      <ListWrap>
        {places.map((place, index) => (
          <ListItem
            key={index}
            onClick={() => {
              const marker = markers[index];
              if (marker) {
                infowindow.setContent(createInfoWindowContent(place));
                infowindow.open(map, marker);
                map.panTo(marker.getPosition());
              }
              setSelectedPlace(place);
              setShowDetail(true);
            }}
          >
            <ListLine>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i
                  className={`fa-solid ${
                    place.category_name?.includes('카페')
                      ? 'fa-mug-saucer'
                      : 'fa-hotel'
                  }`}
                  style={{ color: '#ff6732', marginRight: '8px' }}
                ></i>
                <TitleP $isListTitle="true">{place.place_name}</TitleP>
              </div>
              <ListBookmark>
                <HeartIcon className="fa-regular fa-heart" />
              </ListBookmark>
            </ListLine>
            <AddressP $isListTitle="true">
              {place.road_address_name || place.address_name}
            </AddressP>
            <PhoneP $isListTitle="true">{place.phone || '정보 없음'}</PhoneP>
          </ListItem>
        ))}

        {/* 페이지 버튼을 동적으로 생성 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <div>
            <i
              className="fa-solid fa-chevron-left"
              onClick={() => handleGotoPage(1)}
            ></i>
          </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index + 1}
              onClick={() => handleGotoPage(index + 1)}
              style={{
                backgroundColor: currentPage === index + 1 ? '#ff6732' : '#ddd',
              }}
            >
              {index + 1}
            </div>
          ))}
          <div>
            <i
              className="fa-solid fa-chevron-right"
              onClick={() => handleGotoPage(totalPages)}
            ></i>
          </div>
        </div>
      </ListWrap>
    </SerchListWrap>
  );
};

export default MainContent;

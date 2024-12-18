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
  PaginationDiv,
  ChevronButton,
  PageButton,
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
      setPlaces([]);
      setCurrentPage(1);
      setTotalPages(1);

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.panTo(coords);
        }
      });
    }
  };

  const searchByCategory = () => {
    setCurrentPage(1);
    if (!selectedCategory) {
      toast.error('카테고리를 선택해주세요!');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    const center = map.getCenter();
    const keyword = selectedCategory === 'CE7' ? '애견 카페' : '애견 숙박';

    let currentPage = 1;

    const fetchResults = () => {
      ps.keywordSearch(
        keyword,
        (data, status, pagination) => {
          if (status === window.kakao.maps.services.Status.OK) {
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
          size: 15,
        },
      );
    };

    // 첫 번째 페이지부터 검색 시작
    fetchResults(currentPage);
  };

  const displayPlaces = (places) => {
    const bounds = new window.kakao.maps.LatLngBounds();
    if (markers.length !== 0) {
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    }

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
        setSelectedPlace(place); // 선택된 장소 설정
        setShowDetail(true); // 디테일 페이지 열기
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
      if (markers.length !== 0) {
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]);
      }
      pagination.gotoPage(page); // 페이지네이션 객체의 .gotoPage 메서드 호출
      setCurrentPage(page);
    } else {
      toast.error('잘못된 페이지입니다.');
    }
  };
  const adjustMapPosition = (map, marker) => {
    const markerPosition = marker.getPosition();
    const mapLevel = map.getLevel();

    let lngOffset;
    switch (mapLevel) {
      case 1:
      case 2:
        lngOffset = -0.1;
        break;
      case 3:
      case 4:
        lngOffset = 0.03;
        break;
      case 5:
      case 6:
        lngOffset = 0.06;
        break;
      case 7:
      case 8:
        lngOffset = 0.08;
        break;
      default:
        lngOffset = 0.13;
        break;
    }

    return new window.kakao.maps.LatLng(
      markerPosition.getLat(),
      markerPosition.getLng() - lngOffset,
    );
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

                const adjustedPosition = adjustMapPosition(map, marker);
                map.panTo(adjustedPosition);
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
        {places.length !== 0 && (
          <PaginationDiv>
            <ChevronButton onClick={() => handleGotoPage(1)}>
              <i className="fa-solid fa-chevron-left"></i>
            </ChevronButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton
                key={index + 1}
                onClick={() => handleGotoPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PageButton>
            ))}
            <ChevronButton onClick={() => handleGotoPage(totalPages)}>
              <i className="fa-solid fa-chevron-right"></i>
            </ChevronButton>
          </PaginationDiv>
        )}
      </ListWrap>
    </SerchListWrap>
  );
};

export default MainContent;

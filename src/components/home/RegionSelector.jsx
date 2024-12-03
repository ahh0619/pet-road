import { useEffect, useState } from 'react';
import { SelectWrap, SearchSelect } from '../../styles/KakaoMapStyle';
import axios from 'axios';

const RegionSelector = ({
  onRegionChange,
  selectedRegion,
  selectedCity,
  setSelectedRegion,
  setSelectedCity,
}) => {
  const [data, setData] = useState({});
  const [combinedCities, setCombinedCities] = useState([]); // 조합된 시/군/구 목록

  // JSON 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data/korea.json'); // JSON 파일 경로
        setData(response.data);
      } catch (error) {
        console.error('행정구역 데이터 로드 실패:', error);
      }
    };

    fetchData();
  }, []);

  // 시/도 변경 핸들러
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCity('');

    // 시/군/구 조합 생성
    const regionData = data[region];
    if (regionData) {
      const citiesList = regionData.flatMap((item) => {
        if (typeof item === 'object') {
          return Object.entries(item).flatMap(([city, districts]) =>
            districts.map((district) => `${city} ${district}`),
          );
        }
        return item; // 단일 시/군만 있는 경우
      });
      setCombinedCities(citiesList);
    } else {
      setCombinedCities([]);
    }
  };

  // 시/군/구 변경 핸들러
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);

    // 부모 컴포넌트로 값 전달
    if (onRegionChange) {
      onRegionChange({ region: selectedRegion, city });
    }
  };

  // 시/도 변경 시, 시/군/구 목록 자동 업데이트
  useEffect(() => {
    if (selectedRegion) {
      const regionData = data[selectedRegion];
      if (regionData) {
        const citiesList = regionData.flatMap((item) => {
          if (typeof item === 'object') {
            return Object.entries(item).flatMap(([city, districts]) =>
              districts.map((district) => `${city} ${district}`),
            );
          }
          return item; // 단일 시/군만 있는 경우
        });
        setCombinedCities(citiesList);
      } else {
        setCombinedCities([]);
      }
    }
  }, [selectedRegion, data]);

  return (
    <SelectWrap>
      {/* 시/도 선택 드롭다운 */}
      <SearchSelect value={selectedRegion} onChange={handleRegionChange}>
        <option value="">시/도 선택</option>
        {Object.keys(data).map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </SearchSelect>

      {/* 시/군/구 선택 드롭다운 */}
      <SearchSelect value={selectedCity} onChange={handleCityChange}>
        <option value="">시/군/구 선택</option>
        {combinedCities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </SearchSelect>
    </SelectWrap>
  );
};

export default RegionSelector;

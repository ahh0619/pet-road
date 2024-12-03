import KakaoMap from '../components/home/KakaoMap';
import MainContent from '../components/home/MainContent';
import SideBarComponent from '../components/home/SideBarComponent';
import DetailComponent from '../components/home/DetailComponent';
import { useState } from 'react';

const Home = () => {
  const [showMain, setShowMain] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  return (
    <>
      {showMain && (
        <MainContent
          setShowDetail={setShowDetail}
          setSelectedPlaceId={setSelectedPlaceId}
        />
      )}
      {showBookmark && (
        <MainContent
          setShowDetail={setShowBookmark}
          setSelectedPlaceId={setSelectedPlaceId}
        />
      )}
      {(showMain || showBookmark) && showDetail && (
        <DetailComponent
          setShowDetail={setShowDetail}
          selectedPlaceId={selectedPlaceId}
        />
      )}
      <SideBarComponent
        showMain={showMain}
        setShowMain={setShowMain}
        showBookmark={showBookmark}
        setShowBookmark={setShowBookmark}
      />
      <KakaoMap />
    </>
  );
};

export default Home;

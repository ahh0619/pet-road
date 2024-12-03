import Detail from '../components/detail/Detail';
import DetailComponent from '../components/home/DetailComponent';
import KakaoMap from '../components/home/KakaoMap';
import MainContentsComponent from '../components/home/MainContentsComponent';
import SideBarComponent from '../components/home/SideBarComponent';

const Home = () => {
  return (
    <div>
      <KakaoMap />
      <SideBarComponent />
      <MainContentsComponent />
      <DetailComponent />
    </div>
  );
};

export default Home;

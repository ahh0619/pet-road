import { createGlobalStyle } from 'styled-components';
import 'reset-css'; // reset.css 가져오기

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  body {
    min-width: 1024px;
    font-family: 'Pretendard-Regular';
    line-height: 1.6;
    background-color: #FFAD32;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* 스크롤바 전체 영역 */
::-webkit-scrollbar {
  width: 10px; /* 가로 스크롤바 높이 */
  height: 10px; /* 세로 스크롤바 너비 */
}

/* 스크롤바 트랙 (배경) */
::-webkit-scrollbar-track {
  background: #f1f1f1; /* 트랙 배경색 */
  border-radius: 10px; /* 트랙 모서리 */
}

/* 스크롤바 핸들 (움직이는 부분) */
::-webkit-scrollbar-thumb {
  background: #FF8A66; /* 핸들 색상 */
  border-radius: 10px; /* 핸들 모서리 */
}

/* 스크롤바 핸들에 마우스 오버 시 */
::-webkit-scrollbar-thumb:hover {
  background: #ff6732; /* 핸들 호버 색상 */
}

/* 스크롤바 코너 (양쪽 스크롤이 만나는 부분) */
::-webkit-scrollbar-corner {
  background: #f1f1f1; /* 코너 색상 */
}
select, input, button {
  font-family: 'Pretendard-Regular';
}

`;
export default GlobalStyle;

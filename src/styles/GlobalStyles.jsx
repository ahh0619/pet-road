import { createGlobalStyle } from 'styled-components';
import 'reset-css'; // reset.css 가져오기

const GlobalStyle = createGlobalStyle`
  body {
    min-width: 1024px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #FFAD32;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
export default GlobalStyle;

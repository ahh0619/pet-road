import { createGlobalStyle } from 'styled-components';
import 'reset-css'; // reset.css 가져오기

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f5f5f5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
export default GlobalStyle;

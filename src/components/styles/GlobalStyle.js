import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    font-size: 10px;
    font-family: sans-serif;
    background-color: #353535
  }
`;

export default GlobalStyle;
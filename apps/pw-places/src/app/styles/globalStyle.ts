import { createGlobalStyle, css } from 'styled-components';
import { fZXiHeiFont } from './fonts';

export const defaultSelection = css`
  ::selection {
    background-color: rgba(102, 187, 106, 0.9);
    color: #ffffff;
  }
`;

export const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


  body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: black;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  ${fZXiHeiFont}
  ${defaultSelection}
`;

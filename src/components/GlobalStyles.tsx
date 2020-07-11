import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-color: #171719;
    --accent-color-1: #c37f1d;
    --accent-color-2: #007ad9;
    --accent-color-2-hover: #398ff2;
    --default-font-family: 'Hind', 'sans-serif';
    --default-font-color: #bbb;
    --default-font-color-darker: #777;
    --default-font-color-highlight: #fff;
    --default-font-size: 16px;
    --default-font-size-smaller: 14px;
    --navigation-bg-color: #202022;
    --navigation-bg-color-hover: #303032;
    --navigation-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
    --input-border-radius: 3px;
    --icon-color: #007ad9;
    --icon-size: 20px;
    --button-size: 40px;
  }

  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    background-color: var(--bg-color);
    font-size: var(--default-font-size);
    color: var(--default-font-color);
    font-family: var(--default-font-family);
  }
`;

export default GlobalStyles;
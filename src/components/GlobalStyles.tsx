import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg-color: #171719;
    --bg-color-active: #191920;
    --accent-color-1: #c37f1d;
    --accent-color-2: #007ad9;
    --accent-color-2-hover: #398ff2;
    --default-font-family: 'Hind', 'sans-serif';
    --default-font-color: #bbb;
    --default-font-color-darker: #777;
    --default-font-color-highlight: #fff;
    --default-font-size: 16px;
    --default-font-size-smaller: 14px;
    --navigation-bg-color: #232325;
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
    overflow-x: hidden;
  }

  .usermenu-enter {
    opacity: 0;
    transform: translateX(300px) scale(0.2);
  }
  .usermenu-enter-active {
    opacity: 1;
    transform: translateX(0) scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  .usermenu-exit {
    opacity: 1;
  }
  .usermenu-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }

  .loginpage-appear {
    opacity: 0;
    transform: scale(0.9);
  }

  .loginpage-appear-done {
    opacity: 1;
    transform: scale(1);
    transition: opacity 300ms, transform 300ms;
  }

  .loginpage-exit {
    opacity: 1;
  }
  .loginpage-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;

export default GlobalStyles;
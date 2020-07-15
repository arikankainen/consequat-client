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
    --default-font-color-slightly-darker: #999;
    --default-font-color-darker: #888;
    --default-font-color-highlight: #fff;
    --default-font-size-bigger: 18px;
    --default-font-size: 16px;
    --default-font-size-smaller: 14px;
    --navigation-bg-color: #232325;
    --navigation-bg-color: #303032;
    --navigation-bg-color: rgba(38, 38, 40, 0.9);
    --navigation-bg-color-hover: #303032;
    --footer-bg-color: rgba(0, 0, 0, 0.8);
    --navigation-bg-color-hover: rgba(255, 255, 255, 0.1);
    --navigation-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
    --input-border-radius: 3px;
    --icon-color: #007ad9;
    --icon-size: 20px;
    --button-size: 40px;
    --notification-message-bg-color: #232325;
    --notification-message-bg-color: rgba(48, 48, 50, 0.9);
    --color-success: #45904c;
    --color-success: #38a342;
    --color-error: #a13434;
    --color-error: #be2b2b;
    --input-bg-color: #c9c9cf;
    --input-color: #222;
    --image-color: #555558;
    --image-size: 140px;
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

  .notification-enter {
    opacity: 0;
    transform: translateY(-300px) scale(0.2);
  }
  .notification-enter-active {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition: opacity 300ms, transform 300ms;
  }
  .notification-exit {
    opacity: 1;
  }
  .notification-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;

export default GlobalStyles;
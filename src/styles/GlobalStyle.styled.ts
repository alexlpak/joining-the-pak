import { createGlobalStyle } from 'styled-components';
import FloralPatternPNG from '../assets/images/floral-pattern-10-percent.png';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: minion-pro, serif;
        width: 100%;
        background-image: url(${FloralPatternPNG});
        background-attachment: fixed;
        background-size: 50rem;
        z-index: -1;
    }

    #root {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export default GlobalStyle;
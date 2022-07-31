import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
    }

    * {
        user-select: none;
        box-sizing: border-box;
    }

    body {
        font-family: minion-pro, serif;
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
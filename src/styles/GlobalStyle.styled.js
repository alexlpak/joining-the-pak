import { createGlobalStyle } from 'styled-components';
import MinionProTTF from '../assets/fonts/Minion Pro/Minion Pro.ttf';
import MinionProBoldTTF from '../assets/fonts/Minion Pro Bold/Minion Pro Bold.ttf';
import QuincyCFBoldTTF from '../assets/fonts/Quincy CF Bold/Quincy CF Bold.ttf';
import QuincyCFBlackTTF from '../assets/fonts/Quincy CF Black/Quincy CF Black.ttf';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
    }

    * {
        box-sizing: border-box;
    }

    // Define Quincy CF Font
    @font-face {
        font-family: 'Quincy CF';
        src:
            url(${QuincyCFBoldTTF}) format('truetype'),
            url(${QuincyCFBlackTTF}) format('truetype');
        font-style: normal;
    }

    // Define Minion Pro Font
    @font-face {
        font-family: 'Minion Pro', serif;
        src:
            url(${MinionProTTF}) format('truetype'),
            url(${MinionProBoldTTF}) format('truetype');
        font-style: normal;
    }

    body {
        font-family: 'Minion Pro', serif;
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
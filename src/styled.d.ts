import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    sizing: {
        radius: {
            small: string;
            medium: string;
            large: string;
        }
    },
    colors: {
        main: string;
    },
    animation: {
        speed: number;
        curve: string;
    }
  };
};
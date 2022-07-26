import styled from 'styled-components';
import { theme } from '../styles/theme';

const Input = styled.input`
    font-family: 'Quincy CF';
    font-weight: bold;
    font-size: 1rem;
    border-radius: .5rem;
    padding: 1rem;
    background-color: white;
    border: 2px solid ${theme.colors.main};
    outline: 2px solid white;
    &:focus {
        outline: 4px solid white
    };
    transition: outline ${theme.animation.speed}ms ${theme.animation.curve};
`;

export default Input;
import styled, { css } from 'styled-components';
import { theme } from '../styles/theme';

const Button = styled.button`
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-family: 'Quincy CF';
    font-weight: bold;
    border: 2px solid ${({$secondary}) => $secondary ? theme.colors.main : 'white'};
    color: ${({$secondary}) => $secondary ? theme.colors.main : 'white'};
    background-color: ${({$secondary}) => $secondary ? 'white' : theme.colors.main};
    outline: 2px solid ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    border-radius: .5rem;
    padding: .5rem 1rem;
    align-self: center;
    white-space: nowrap;
    opacity: 1;
    &:hover {
        outline: 4px solid ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
        cursor: pointer;
    };
    &:active {
        outline: 0px solid ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    };
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    };
    transition: all ${theme.animation.speed}ms ${theme.animation.curve};
`;

export default Button;
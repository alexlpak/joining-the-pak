import styled, { css } from 'styled-components';
import { theme } from '../styles/theme';

const Button = styled.button`
    font-size: 1rem;
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
        cursor: pointer;
    };
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    };
    transition: all 250ms ease;
`;

export default Button;
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ButtonStyled = styled.button`
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-family: 'Quincy CF';
    font-weight: bold;
    border: 2px solid ${({ $secondary }) => $secondary ? theme.colors.main : 'white'};
    color: ${({$secondary }) => $secondary ? theme.colors.main : 'white'};
    background-color: ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    outline: 2px solid ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    border-radius: .5rem;
    padding: .75rem 1rem;
    align-self: center;
    white-space: nowrap;
    opacity: 1;
    & * {
        user-select: none;
    };
    &:focus {
        outline: 4px solid ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    };
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

const LoaderIcon = styled(FontAwesomeIcon).attrs({
    icon: faSpinner
})`
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    @keyframes spin {
        from { transform:rotate(0deg) }
        to { transform:rotate(360deg) }
    };
`;

const Button = ({ children, loading, icon, type = 'button', secondary, ...rest }) => {
    return (
        <ButtonStyled type={type} $secondary={secondary} {...rest}>
            {!loading && children}
            {loading && <LoaderIcon />}
            {icon && !loading && <FontAwesomeIcon icon={icon} />}
        </ButtonStyled>
    );
};

export default Button;
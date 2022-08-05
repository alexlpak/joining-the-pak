import styled from 'styled-components';
import { theme } from '../styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonStyledProps {
    $secondary?: boolean;
    $noBorder?: boolean;
};

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const ButtonStyled = styled.button<ButtonStyledProps>`
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-family: quincy-cf, serif;
    font-weight: 800;
    border: 2px solid ${({ $secondary }) => $secondary ? theme.colors.main : 'white'};
    color: ${({$secondary }) => $secondary ? theme.colors.main : 'white'};
    background-color: ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    box-shadow: 0px 0px 0px 2px ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    border-radius: .5rem;
    padding: .75rem 1rem;
    align-self: center;
    white-space: nowrap;
    opacity: 1;
    &:focus {
        box-shadow: 0px 0px 0px 4px ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
    };
    &:hover {
        box-shadow: 0px 0px 0px 4px ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
        cursor: pointer;
    };
    &:active {
        box-shadow: 0px 0px 0px 0px ${({ $secondary }) => $secondary ? 'white' : theme.colors.main};
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

interface ButtonProps {
    children: React.ReactNode;
    as?: React.ElementType;
    href?: string;
    target?: string;
    loading?: boolean;
    icon?: IconProp;
    iconVisible?: boolean;
    disabled?: boolean;
    noBorder?: boolean;
    onClick?: () => void;
    secondary?: boolean;
    type?: 'button' | 'submit';
};

const Button: React.FC<ButtonProps> = ({ children, disabled, loading, as, noBorder, icon, type = 'button', secondary, iconVisible = true, ...rest }) => {
    return (
        <ButtonStyled $noBorder={noBorder} disabled={disabled || loading} as={as} type={type} $secondary={secondary} {...rest}>
            {!loading && children}
            {loading && <LoaderIcon />}
            {icon && !loading && iconVisible && <FontAwesomeIcon icon={icon} />}
        </ButtonStyled>
    );
};

export default Button;
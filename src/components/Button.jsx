import styled, { css, useTheme } from 'styled-components';

const ButtonStyled = styled.button`
    font-size: 1rem;
    font-family: 'Quincy CF';
    font-weight: bold;
    ${({ $borderColor }) => {
        return css`
            border: 2px solid ${$borderColor || 'white'}; 
        `;
    }};
    border-radius: .5rem;
    padding: .5rem 1rem;
    align-self: center;
    color: ${({ $color }) => $color};
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    outline: ${({ $outlineColor }) => `2px solid ${$outlineColor}`};
    &:hover {
        cursor: pointer;
    };
`;

const Button = ({ children, secondary }) => {
    const theme = useTheme();
    return (
        <ButtonStyled
            $backgroundColor={secondary ? 'white': theme.colors.main}
            $color={secondary ? theme.colors.main : 'white'}
            $borderColor={secondary ? theme.colors.main : 'white'}
            $outlineColor={secondary ? 'white' : theme.colors.main}
        >
            {children}
        </ButtonStyled>
    );
};

export default Button;
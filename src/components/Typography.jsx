import styled, { css } from 'styled-components';

const TypographyStyled = styled.span`
    color: ${({ $color }) => $color};
    font-weight: ${({ $bold }) => $bold ? 'bold' : 'normal'};
    ${({ $type, $size }) => {
        if ($type === 'header') {
            return css`
                font-family: 'Quincy CF';
                font-size: ${$size || '2rem'};
                font-weight: bold;
                line-height: 1;
            `;
        }
        else return css`
            line-height: 1.5;
            font-size: ${$size || '1rem'};
        `;
    }}
`;

const Typography = ({ bold, type, children, color, size }) => {
    return (
        <TypographyStyled $size={size} $bold={bold} $type={type} $color={color}>
            {children}
        </TypographyStyled>
    )
};

export default Typography;
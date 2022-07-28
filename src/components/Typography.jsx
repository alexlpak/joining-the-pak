import styled, { css } from 'styled-components';

const TypographyStyled = styled.span`
    color: ${({ $color }) => $color};
    font-weight: ${({ $bold }) => $bold ? 'bold' : 'normal'};
    user-select: text;
    font-family: ${({ $fontFamily }) => $fontFamily};
    white-space: break-spaces;
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
    }};
    font-style: ${({ $italic }) => $italic && 'italic'};
`;

const Typography = ({ bold, fontFamily, type, children, color, size, italic }) => {
    return (
        <TypographyStyled $fontFamily={fontFamily} $size={size} $italic={italic} $bold={bold} $type={type} $color={color}>
            {children}
        </TypographyStyled>
    )
};

export default Typography;
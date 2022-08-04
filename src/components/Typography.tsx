import styled, { css } from 'styled-components';
import { RemUnit } from '../types/styling';

interface TypographyStyledProps {
    $color?: string;
    $bold?: boolean;
    $fontFamily?: string;
    $type?: 'header';
    $size?: RemUnit;
    $italic?: boolean;
    $textAlign?: 'center' | 'left' | 'right';
};

const TypographyStyled = styled.span<TypographyStyledProps>`
    color: ${({ $color }) => $color};
    font-weight: ${({ $bold }) => $bold ? 'bold' : 'normal'};
    font-family: ${({ $fontFamily }) => $fontFamily};
    white-space: break-spaces;
    ${({ $type, $size }) => {
        if ($type === 'header') {
            return css`
                font-family: quincy-cf, serif;
                font-size: ${$size || '2rem'};
                font-weight: 800;
                line-height: 1;
            `;
        }
        else return css`
            line-height: 1.5;
            font-size: ${$size || '1rem'};
        `;
    }};
    font-style: ${({ $italic }) => $italic && 'italic'};
    text-align: ${({ $textAlign }) => $textAlign};
`;

interface TypographyProps {
    color?: string;
    bold?: boolean;
    fontFamily?: string;
    children?: React.ReactNode[] | React.ReactNode;
    type?: 'header';
    size?: RemUnit;
    italic?: boolean;
    textAlign?: 'center' | 'left' | 'right';
};

const Typography: React.FC<TypographyProps> = ({ bold, fontFamily, type, children, color, size, italic, textAlign }) => {
    return (
        <TypographyStyled $textAlign={textAlign} $fontFamily={fontFamily} $size={size} $italic={italic} $bold={bold} $type={type} $color={color}>
            {children}
        </TypographyStyled>
    )
};

export default Typography;
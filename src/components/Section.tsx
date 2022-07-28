import React from 'react';
import styled, { css } from 'styled-components';
import { RemUnit } from '../types/styling';

interface SectionStyledProps {
    $color?: string;
    $backgroundImage?: string;
    cihldren?: React.ReactNode;
};

const SectionStyled = styled.section<SectionStyledProps>`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: ${({ $color }) => $color || 'unset'};
    ${({ $backgroundImage }) => {
        if ($backgroundImage) {
            return css`
                &::before {
                    content: '';
                    width: 100%;
                    height: 100%;
                    background-image: url(${$backgroundImage});
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    opacity: 0.10;
                };
            `;
        };
    }};
`;

interface SectionContentsProps {
    $padding?: RemUnit;
    $gap?: RemUnit;
    $centered?: boolean;
};

const SectionContents = styled.div<SectionContentsProps>`
    max-width: 50rem;
    width: 100%;
    padding: ${({ $padding }) => $padding || '2rem'};
    display: flex;
    flex-direction: column;
    gap: ${({ $gap }) => $gap || '2rem'};
    ${({ $centered }) => {
        if ($centered) return css`
            align-items: center;
        `;
    }}
`;

interface SectionProps {
    id?: string;
    padding?: RemUnit;
    backgroundImage?: string;
    gap?: RemUnit;
    centered?: boolean;
    as?: React.ElementType;
    color?: string;
    children?: React.ReactNode | React.ReactNode[];
};

const Section: React.FC<SectionProps> = ({ id, as, padding, backgroundImage, gap, centered, color, children, ...rest }) => {
    return (
        <SectionStyled as={as} id={id} {...rest} $color={color} $backgroundImage={backgroundImage}>
            <SectionContents $padding={padding} $gap={gap} $centered={centered}>
                {children}
            </SectionContents>
        </SectionStyled>
    )
};

export default Section;
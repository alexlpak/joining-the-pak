import React from 'react';
import styled, { css } from 'styled-components';

interface LineProps {
    length: string;
    color: string;
    orientation: string;
};

interface LineStyledProps {
    $length: string;
    $color: string;
    $orientation: string;
};

const LineStyled = styled.div<LineStyledProps>`
    ${({ $orientation, $color, $length }) => {
        if ($orientation === 'vertical') {
            return css`
                border-left: 2px solid ${$color || 'black'};
                height: ${$length || '1rem'};
            `;
        }
        else if ($orientation === 'horizontal') {
            return css`
                border-bottom: 2px solid ${$color || 'black'};
                max-width: ${$length || '1rem'};
                width: 100%;
            `;
        }
    }}
`;

const Line: React.FC<LineProps> = ({ length, color, orientation }) => {
    return (
        <LineStyled
            $length={length}
            $color={color}
            $orientation={orientation}
        />
    );
};

export default Line;
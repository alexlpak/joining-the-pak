import styled, { css } from 'styled-components';

const LineStyled = styled.div`
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

const Line = ({ length, color, orientation }) => {
    return (
        <LineStyled
            $length={length}
            $color={color}
            $orientation={orientation}
        />
    );
};

export default Line;
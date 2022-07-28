import styled, { css } from 'styled-components';

const Image = styled.img`
    height: ${({ $height }) => $height };
    width: ${({ $width }) => $width };
`;

export const ImagePlaceholder = styled.div`
    ${({ $backgroundImage }) => {
        if ($backgroundImage) return css`
            background-image: url(${$backgroundImage});
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        `;
    }}
    height: 20rem;
    width: 100%;
    max-width: 20rem;
    border: none;
    border-radius: .5rem;
    background-color: lightgray;
`;

export default Image;
import styled, { css } from 'styled-components';

interface ImageHeight {
    $height: string;
    $width?: string;
};

interface ImageWidth {
    $width: string;
    $height?: string;
};

const Image = styled.img<ImageHeight | ImageWidth>`
    height: ${({ $height }) => $height };
    width: ${({ $width }) => $width };
`;

interface ImagePlaceholderProps {
    $backgroundImage: string;
};

export const ImagePlaceholder = styled.div<ImagePlaceholderProps>`
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
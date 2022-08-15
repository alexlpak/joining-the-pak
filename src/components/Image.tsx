import styled from 'styled-components';

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

export default Image;
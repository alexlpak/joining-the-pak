import styled from 'styled-components';

const Image = styled.img`
    height: ${({ $height }) => $height };
    width: ${({ $width }) => $width };
`;

export default Image;
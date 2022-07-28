import styled from 'styled-components';

const Link = styled.a`
    text-decoration: none;
    color: ${({ $color }) => $color};
    &:hover {
        cursor: pointer;
    };
`;

export default Link;
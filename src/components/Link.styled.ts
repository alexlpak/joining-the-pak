import styled from 'styled-components';

interface LinkProps {
    $color?: string;
};

const Link = styled.a<LinkProps>`
    text-decoration: none;
    color: ${({ $color }) => $color};
    &:hover {
        cursor: pointer;
    };
`;

export default Link;
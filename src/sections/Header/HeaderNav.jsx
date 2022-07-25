import styled from 'styled-components';
import Line from '../../components/Line';
import { useTheme } from 'styled-components';

const HeaderNavItems = styled.ul`
    display: flex;
    gap: 1rem;
`;

const HeaderNavItem = styled.li`
    font-family: 'Quincy CF', serif;
    font-weight: bold;
    text-transform: uppercase;
`;

const HeaderNav = () => {
    const theme = useTheme();
    return (
        <HeaderNavItems>
            <HeaderNavItem>Our Story</HeaderNavItem>
            <Line orientation='vertical' length='1rem' color={theme.colors.main} />
            <HeaderNavItem>Details</HeaderNavItem>
            <Line orientation='vertical' length='1rem' color={theme.colors.main} />
            <HeaderNavItem>Registry</HeaderNavItem>
            <Line orientation='vertical' length='1rem' color={theme.colors.main} />
            <HeaderNavItem>RSVP</HeaderNavItem>
        </HeaderNavItems>
    );
};

export default HeaderNav;
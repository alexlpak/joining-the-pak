import styled from 'styled-components';
import Line from '../../components/Line';
import { useTheme } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { smoothScrollToElement } from '../../helper/smoothScrollToElement';

const HeaderNavItems = styled.ul`
    display: flex;
    gap: 2rem;
    @media (max-width: 555px) {
        flex-direction: column;
        text-align: center;
        align-items: center;
    }
`;

const HeaderNavItem = styled.li`
    font-family: quincy-cf, serif;
    font-weight: bold;
    text-transform: uppercase;
    white-space: nowrap;
`;

const HeaderLink = styled.a`
    padding: 1rem;
    &:hover {
        cursor: pointer;
    };
`;

const HeaderNav = () => {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 555px)',
    });

    return (
        <HeaderNavItems>
            <HeaderNavItem>
                <HeaderLink onClick={() => smoothScrollToElement('#our-story')}>Our Story</HeaderLink>
            </HeaderNavItem>
            {!isMobileDevice && <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='1rem' color={theme.colors.main} />}
            <HeaderNavItem>
                <HeaderLink onClick={() => smoothScrollToElement('#details')}>Details</HeaderLink>
            </HeaderNavItem>
            {!isMobileDevice && <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='1rem' color={theme.colors.main} />}
            <HeaderNavItem>
                <HeaderLink onClick={() => smoothScrollToElement('#registry')}>Registry</HeaderLink>
            </HeaderNavItem>
            {!isMobileDevice && <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='1rem' color={theme.colors.main} />}
            <HeaderNavItem>
                <HeaderLink onClick={() => smoothScrollToElement('#rsvp')}>RSVP</HeaderLink>
            </HeaderNavItem>
        </HeaderNavItems>
    );
};

export default HeaderNav;
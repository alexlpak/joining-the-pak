import Section from '../components/Section';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Link from '../components/Link.styled';

const HashTagWrapper = styled.div`
    display: flex;
`;

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Footer = () => {
    const theme = useTheme();
    return (
        <Section
            centered
            backgroundImage={FloralPatternPNG}
            padding='4rem'
        >
            <FooterWrapper>
                <HashTagWrapper>
                    <Typography bold color={theme.colors.main} size='1.5rem'>#</Typography>
                    <Typography bold color='black' size='1.5rem'>JoiningThePak</Typography>
                </HashTagWrapper>
                <Typography italic color='black'>Website designed and developed by <Link href='mailto: alex@apak.design' $color={theme.colors.main}>Alex Pak</Link></Typography>
            </FooterWrapper>
        </Section>
    );
};

export default Footer;
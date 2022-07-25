import Section from '../components/Section';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';

const FooterWrapper = styled.div`
    display: flex;
`;

const Footer = () => {
    const theme = useTheme();
    return (
        <Section
            as='footer'
            centered
            backgroundImage={FloralPatternPNG}

        >
            <FooterWrapper>
                <Typography bold color={theme.colors.main} size='1.5rem'>#</Typography>
                <Typography bold color='black' size='1.5rem'>JoiningThePak</Typography>
            </FooterWrapper>
        </Section>
    );
};

export default Footer;
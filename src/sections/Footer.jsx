import Section from '../components/Section';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';

const Footer = () => {
    const theme = useTheme();
    return (
        <Section
            as='footer'
            centered
            backgroundImage={FloralPatternPNG}
        >
            <Typography bold color={theme.colors.main} size='1.5rem'>#JoiningThePak</Typography>
        </Section>
    );
};

export default Footer;
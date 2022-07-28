import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import { ImagePlaceholder } from '../components/Image';
import Button from '../components/Button';
import RegistryImage from '../assets/images/registry.jpg';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import Link from '../components/Link.styled';

const RegistryContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    max-width: 20rem;
    line-height: 1.5;
`;

const SectionContentsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    @media (max-width: 780px) {
        flex-direction: column;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;

const data = {
    verbiage: `Thank you for being part of our special day. Your presence at our wedding is the greatest gift we could ask for!\n\nIn this next stage in our life, we have been working hard to save up to purchase our first home together.\n\nWhile we do not require a gift, if you'd like to contribute towards that goal, we have linked our PayPal and Venmo links below.`
};

const RegistrySection = () => {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 780px)',
    });
    return (
        <Section id='registry' backgroundImage={FloralPatternPNG}>
            <SectionContentsWrapper>                
                <ImagePlaceholder $backgroundImage={RegistryImage} />
                <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='20rem' color={theme.colors.main} />
                <RegistryContentsStyled>
                    <Typography type='header' color={theme.colors.main}>Registry</Typography>
                    <Typography>{data.verbiage}</Typography>
                    <ButtonWrapper>
                        <Button as={Link} icon={faExternalLink}>Venmo</Button>
                        <Button as={Link} icon={faExternalLink}>PayPal</Button>
                    </ButtonWrapper>
                </RegistryContentsStyled>
            </SectionContentsWrapper>
        </Section>
    );
};

export default RegistrySection;
import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import Button from '../components/Button';
import RegistryImage1 from '../assets/images/registry.jpg';
import RegistryImage2 from '../assets/images/registry-02.jpg';
import RegistryImage3 from '../assets/images/registry-03.jpg';
import { useMediaQuery } from 'react-responsive';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import Link from '../components/Link.styled';
import { ButtonWrapper } from '../components/Button';
import Carousel, { CarouselImage } from '../components/Carousel';

const RegistryContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
                <Carousel roundedEdges autoplay width='20rem' height='20rem' slides={[
                    <CarouselImage $fullWidth src={RegistryImage1} />,
                    <CarouselImage $fullWidth src={RegistryImage2} />,
                    <CarouselImage $fullWidth src={RegistryImage3} />,
                ]} />
                <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='20rem' color={theme.colors.main} />
                <RegistryContentsStyled>
                    <Typography type='header' color={theme.colors.main}>Registry</Typography>
                    <Typography>{data.verbiage}</Typography>
                    <ButtonWrapper>
                        <Button target='_blank' href={`https://venmo.com/?txn=pay&audience=public&recipients=Amber-McClanahan&note=Amber%20and%20Alex%20Wedding%20House%20Fund`} as={Link} icon={faExternalLink}>Venmo</Button>
                        <Button target='_blank' href={`https://www.paypal.com/paypalme/AmberMcClanahan?country.x=US&locale.x=en_US`} as={Link} icon={faExternalLink}>PayPal</Button>
                    </ButtonWrapper>
                </RegistryContentsStyled>
            </SectionContentsWrapper>
        </Section>
    );
};

export default RegistrySection;
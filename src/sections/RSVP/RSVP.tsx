import Section from '../../components/Section';
import Typography from '../../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../../components/Line';
import RSVPImage from '../../assets/images/rsvp.jpg';
import OurStoryImage2 from '../../assets/images/our-story-02.jpg';
import OurStoryImage3 from '../../assets/images/our-story-03.jpg';
import Carousel, { CarouselImage } from '../../components/Carousel';
import { useMediaQuery } from 'react-responsive';
import RSVPForm from './RSVPForm';
import { RSVPFormContextProvider } from '../../contexts/RSVPFormContext';

const SectionContentsWrapper = styled.div`
    display: flex;
    gap: 1.5rem;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media (max-width: 780px) {
        flex-direction: column;
    };
`;

const RSVPContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: ${({ theme }) => theme.sizing.section.main};
    width: 100%;
`;

const RSVPSection = () => {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 780px)',
    });

    return (
        <Section id='rsvp' color={theme.colors.main}>
                <SectionContentsWrapper>
                    <RSVPContentsWrapper>
                        <Typography type='header' color='white'>RSVP</Typography>
                        <RSVPFormContextProvider>
                            <RSVPForm />
                        </RSVPFormContextProvider>
                    </RSVPContentsWrapper>
                    <Line
                        orientation={isMobileDevice ? 'horizontal' : 'vertical'}
                        length={theme.sizing.section.main}
                        color='white'
                    />
                    <Carousel roundedEdges autoplay width={theme.sizing.section.main} height={theme.sizing.section.main} slides={[
                        <CarouselImage $fullWidth src={RSVPImage} />,
                        <CarouselImage $fullWidth src={OurStoryImage3} />,
                        <CarouselImage $fullWidth src={OurStoryImage2} />,
                    ]} />
                </SectionContentsWrapper>
            </Section>
    );
};

export default RSVPSection;
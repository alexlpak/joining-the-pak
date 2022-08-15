import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import OurStoryImage1 from '../assets/images/our-story.jpg';
import OurStoryImage2 from '../assets/images/our-story-02.jpg';
import OurStoryImage3 from '../assets/images/our-story-03.jpg';
import { useMediaQuery } from 'react-responsive';
import { getDifferenceSinceDate } from '../helper/dates';
import Carousel from '../components/Carousel';
import { CarouselImage } from '../components/Carousel';

const OurStoryContentsStyled = styled.div`
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

const dateDifference = getDifferenceSinceDate('2013-11-18', new Date().toLocaleString());

const data = {
    verbiage: `Our story began ${dateDifference.years.toLocaleString()} years ago in 2013. As soon as we saw each other on move-in day our freshman year in college, we knew pretty quickly that we'd be together at some point. A few months later of spending time together, we began exclusively dating on November 18, 2013.\n\nSince then, we've done pretty much everything together from moving to Florida to work at Disney World, graduating college, and moving in together. It's been ${dateDifference.days.toLocaleString()} days of loving each together and a lifetime to go.`
};

const OurStorySection = () => {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 780px)',
    });
    return (
        <Section id='our-story' backgroundImage={FloralPatternPNG}>
            <SectionContentsWrapper>
                <Carousel roundedEdges autoplay width='20rem' height='20rem' slides={[
                    <CarouselImage $fullWidth src={OurStoryImage1} />,
                    <CarouselImage $fullWidth src={OurStoryImage2} />,
                    <CarouselImage $fullWidth src={OurStoryImage3} />,
                ]} />
                <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='20rem' color={theme.colors.main} />
                <OurStoryContentsStyled>
                    <Typography type='header' color={theme.colors.main}>Our Story</Typography>
                    <Typography>{data.verbiage}</Typography>
                </OurStoryContentsStyled>
            </SectionContentsWrapper>
        </Section>
    );
};

export default OurStorySection;
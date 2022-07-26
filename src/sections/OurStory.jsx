import Section from '../components/Section';
import Typography from '../components/Typography';
import { css, useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import OurStoryImage from '../assets/images/our-story.jpg';
import { useMediaQuery } from 'react-responsive';

const OurStoryContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    max-width: 20rem;
    line-height: 1.5;
`;

export const ImagePlaceholder = styled.div`
    ${({ $backgroundImage }) => {
        if ($backgroundImage) return css`
            background-image: url(${$backgroundImage});
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        `;
    }}
    height: 20rem;
    width: 100%;
    max-width: 20rem;
    border: none;
    border-radius: .5rem;
    background-color: lightgray;
`;

const SectionContentsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    @media (max-width: 780px) {
        flex-direction: column;
    }
`;

const OurStorySection = () => {
    const theme = useTheme();
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 780px)',
    });
    return (
        <Section id='our-story' backgroundImage={FloralPatternPNG}>
            <SectionContentsWrapper>                
                <ImagePlaceholder $backgroundImage={OurStoryImage} />
                <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='20rem' color={theme.colors.main} />
                <OurStoryContentsStyled>
                    <Typography type='header' color={theme.colors.main}>Our Story</Typography>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Typography>
                </OurStoryContentsStyled>
            </SectionContentsWrapper>
        </Section>
    );
};

export default OurStorySection;
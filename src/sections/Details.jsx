import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import { ImagePlaceholder } from './OurStory';
import Button from '../components/Button';

const DetailsContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20rem;
`;

const SectionContentsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    text-align: center;

`;

const EventDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const GoogleMapStyled = styled.iframe`
    width: 20rem;
    height: 20rem;
    background-color: lightgray;
    border-radius: .5rem;
    overflow: hidden;
`;

const DetailsSection = () => {
    const theme = useTheme();
    const size = 16 * 20;
    return (
        <Section color={theme.colors.main}>
            <SectionContentsWrapper>                
                <DetailsContentsStyled>
                    <Typography type='header' color='white'>Ceremony & Reception</Typography>
                    <EventDetailsWrapper>
                        <Typography color='white' bold>Sunday, November 6th, 2022</Typography>
                        <Typography color='white'>Starting at 4PM</Typography>
                    </EventDetailsWrapper>
                    <EventDetailsWrapper>
                        <Typography color='white' bold>Cole's Garden</Typography>
                        <Typography color='white'>1415 NE 63rd St</Typography>
                        <Typography color='white'>Oklahoma City, OK 73111</Typography>
                    </EventDetailsWrapper>
                    <Button secondary>Get Directions</Button>
                </DetailsContentsStyled>
                <Line orientation='vertical' length='20rem' color='white' />
                <GoogleMapStyled id="gmap_canvas" src="https://maps.google.com/maps?q=1415 NE 63rd St, Oklahoma City, OK 73111%2073110&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                </GoogleMapStyled>
            </SectionContentsWrapper>
        </Section>
    );
};

export default DetailsSection;
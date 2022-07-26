import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import Button from '../components/Button';
import { useMediaQuery } from 'react-responsive';
import Link from '../components/Link.styled';
import { theme } from '../styles/theme';

const DetailsContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 20rem;
`;

const SectionContentsWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
    @media (max-width: 780px) {
        flex-direction: column;
    }
`;

const EventDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    & * {
        &::selection {
            color: ${theme.colors.main};
            background: white;
        }
        user-select: text;
    };
`;

const GoogleMapStyled = styled.iframe`
    width: 100%;
    max-width: 20rem;
    height: 20rem;
    background-color: lightgray;
    border-radius: .5rem;
    overflow: hidden;
`;

const DetailsSection = () => {
    const isMobileDevice = useMediaQuery({
        query: '(max-width: 780px)',
    });
    const theme = useTheme();
    return (
        <Section id='details' color={theme.colors.main}>
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
                    <Button as={Link} $secondary href='https://goo.gl/maps/1KNMhHy3owQwzxTc7' target='_blank'>Get Directions</Button>
                </DetailsContentsStyled>
                <Line orientation={isMobileDevice ? 'horizontal' : 'vertical'} length='20rem' color='white' />
                <GoogleMapStyled id="gmap_canvas" src="https://maps.google.com/maps?q=1415 NE 63rd St, Oklahoma City, OK 73111%2073110&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                </GoogleMapStyled>
            </SectionContentsWrapper>
        </Section>
    );
};

export default DetailsSection;
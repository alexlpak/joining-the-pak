import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Line from '../components/Line';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import { ImagePlaceholder } from './OurStory';
import Button from '../components/Button';
import RegistryImage from '../assets/images/registry.jpg';

const RegistryContentsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 20rem;
    line-height: 1.5;
`;

const SectionContentsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;

const RegistrySection = () => {
    const theme = useTheme();
    return (
        <Section backgroundImage={FloralPatternPNG}>
            <SectionContentsWrapper>                
                <ImagePlaceholder $backgroundImage={RegistryImage} />
                <Line orientation='vertical' length='20rem' color={theme.colors.main} />
                <RegistryContentsStyled>
                    <Typography type='header' color={theme.colors.main}>Registry</Typography>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Typography>
                    <ButtonWrapper>
                        <Button>Venmo</Button>
                        <Button>Cash App</Button>
                    </ButtonWrapper>
                </RegistryContentsStyled>
            </SectionContentsWrapper>
        </Section>
    );
};

export default RegistrySection;
import React from 'react';
import Section from '../components/Section';
import Typography from '../components/Typography';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import Link from '../components/Link.styled';
import { renderConfetti } from '../utilities/confetti';

const HashTagWrapper = styled.div`
    display: flex;
    user-select: none;
    &:hover {
        cursor: pointer;
    };
`;

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Footer: React.FC = () => {
    const theme = useTheme();
    
    const handleClick = () => {
        renderConfetti();
    };

    return (
        <Section
            centered
            padding='4rem 2rem'
        >
            <FooterWrapper>
                <HashTagWrapper onClick={handleClick}>
                    <Typography bold color={theme.colors.main} size='1.5rem'>#</Typography>
                    <Typography bold color='black' size='1.5rem'>JoiningThePak</Typography>
                </HashTagWrapper>
                <Typography textAlign='center' italic color='black'>Website designed and developed by <Link href='mailto: alex@apak.design' $color={theme.colors.main}>Alex Pak</Link></Typography>
            </FooterWrapper>
        </Section>
    );
};

export default Footer;
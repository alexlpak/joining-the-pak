import React, { useState } from 'react';
import Section from '../components/Section';
import FloralPatternPNG from '../assets/images/floral-pattern.png';
import Typography from '../components/Typography';
import { css, useTheme } from 'styled-components';
import styled from 'styled-components';
import Link from '../components/Link.styled';
import { renderConfetti } from '../utilities/confetti';

interface HashtagWrapperProps {
    $clickable?: boolean;
};

const HashTagWrapper = styled.div<HashtagWrapperProps>`
    display: flex;
    user-select: none;
    ${({ $clickable }) => {
        if ($clickable) return css`
            &:hover {
                cursor: pointer;
            };
        `;
    }};
`;

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Footer: React.FC = () => {
    const [hashtagClickable, setHashtagClickable] = useState(true);

    const theme = useTheme();
    
    const handleClick = async () => {
        if (hashtagClickable) {
            setHashtagClickable(false)
            await renderConfetti();
            setHashtagClickable(true);
        };
    };

    return (
        <Section
            centered
            backgroundImage={FloralPatternPNG}
            padding='4rem 2rem'
        >
            <FooterWrapper>
                <HashTagWrapper onClick={handleClick} $clickable={hashtagClickable}>
                    <Typography bold color={theme.colors.main} size='1.5rem'>#</Typography>
                    <Typography bold color='black' size='1.5rem'>JoiningThePak</Typography>
                </HashTagWrapper>
                <Typography textAlign='center' italic color='black'>Website designed and developed by <Link href='mailto: alex@apak.design' $color={theme.colors.main}>Alex Pak</Link></Typography>
            </FooterWrapper>
        </Section>
    );
};

export default Footer;
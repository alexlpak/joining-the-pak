import React from 'react';
import styled from 'styled-components';
import Typography from './Typography';

interface PercentProps {
    $percent: number;
};

const ProgressBarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    width: 100%;
`;

const ProgressBarStyled = styled.div`
    display: flex;
    width: 100%;
    height: 2.5rem;
    border-radius: 0.5rem;
    border: 2px solid white;
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.colors.main};
    overflow: hidden;
`;

const Filled = styled.div<PercentProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: ${({ theme }) => theme.colors.main};
    width: ${({ $percent }) => `${$percent.toFixed(2)}%`};
    transition: width 750ms ease;
`;

interface ProgressBarProps {
    percent: number;
    append?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percent, append }) => {
    return (
        <ProgressBarWrapper>
            <ProgressBarStyled>
                <Filled $percent={percent} />
            </ProgressBarStyled>
            <Typography italic>{percent}%{append && ` ${append}`}</Typography>
        </ProgressBarWrapper>
    );
};

export default ProgressBar;
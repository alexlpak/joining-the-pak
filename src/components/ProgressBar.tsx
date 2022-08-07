import React from 'react';
import styled from 'styled-components';

interface PercentProps {
    $percent: number;
};

const ProgressText = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
`;

const ProgressBarStyled = styled.div`
    position: relative;
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
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
    return (
        <ProgressBarStyled>
            <Filled $percent={percent} />
            <ProgressText>{percent}% Responded</ProgressText>
        </ProgressBarStyled>
    );
};

export default ProgressBar;
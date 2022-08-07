import React from 'react';
import Section from '../../../components/Section';
import { useTheme } from 'styled-components';
import { Heading } from '../../../components/Typography';
import styled from 'styled-components';
import Overview from './metrics/Overview';
import ProgressBar from '../../../components/ProgressBar';
import Table from '../../../components/Table/Table';

const MetricCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: .5rem;
    border: 2px solid ${({ theme }) => theme.colors.main};
    box-shadow: 0px 0px 0px 2px white;
    padding: 1rem;
    align-items: center;
    background-color: white;
    color: black;
`;

type Metrics = {
    invited: number;
    guests: number;
    yesResponse: number;
    noResponse: number;
    pendingResponse: number;
    totalResponse: number;
};

const ManageRSVP: React.FC = () => {
    const theme = useTheme();

    return (
        <Section color={theme.colors.main} centered>
            <Heading>RSVP Management</Heading>
            <MetricCard>
                <Heading color={theme.colors.main}>Overview</Heading>
                <Overview />
            </MetricCard>
            <Table />
        </Section>
    );
};

export default ManageRSVP;
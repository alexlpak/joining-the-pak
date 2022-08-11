import React from 'react';
import styled from 'styled-components';
import Typography from '../../../../components/Typography';
import { useAdminContext } from '../../../../contexts/AdminContext';
import ProgressBar from '../../../../components/ProgressBar';

const OverviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const OverviewItemsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const OverviewItemStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface OverviewItemProps {
    title: string;
    data: React.ReactNode;
};

const OverviewItem: React.FC<OverviewItemProps> = ({ title, data }) => {
    return (
        <OverviewItemStyled>
            <Typography bold>{title}</Typography>
            <Typography size='1.25rem' bold>{data}</Typography>
        </OverviewItemStyled>
    );
};

const Overview: React.FC = () => {
    const { records } = useAdminContext();

    const invited = records.filter(record => record.fields.type === 'Invited').length;
    const allowedGuests = records.reduce((acc, record) => (record.fields.allowedGuests || 0) + acc, 0);
    const attendingGuests = records.filter(record => record.fields.type === 'Guest').length;
    const responded = records.filter(record => record.fields.response).length;
    const respondedYes = records.filter(record => record.fields.response === 'Yes').length;
    const pending = invited - responded;
    const percentComplete = Math.floor((responded/invited) * 100);
    const totalPotentialGuests = invited + allowedGuests;
    const totalAttending = responded + attendingGuests;

    return (
        <OverviewWrapper>
            <OverviewItemsWrapper>
                <OverviewItem title='RSVPs Attending' data={`${respondedYes} / ${invited}`} />
                <OverviewItem title='+1s Attending' data={`${attendingGuests} / ${allowedGuests}`} />
            </OverviewItemsWrapper>
            <OverviewItemsWrapper>
                <OverviewItem title='Pending RSVPs' data={pending} />
                <OverviewItem title='Total Guests' data={totalAttending} />
                <OverviewItem title='Possible Total' data={totalPotentialGuests} />
            </OverviewItemsWrapper>
            <ProgressBar percent={percentComplete || 0} append={`Responded (${responded} / ${invited})`} />
        </OverviewWrapper>
    );
};

export default Overview;
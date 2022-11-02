import React from 'react';
import styled from 'styled-components';
import Typography from '../../../../components/Typography';
import { useAdminContext } from '../../../../contexts/AdminContext';
import ProgressBar from '../../../../components/ProgressBar';

const OverviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    const responded = records.filter(record => record.fields.response).length;
    const respondedYes = records.filter(record => record.fields.response === 'Yes' && record.fields.type !== 'Guest').length;
    const respondedNo = records.filter(record => record.fields.response === 'No').length;
    const attendingGuests = records.filter(record => record.fields.type === 'Guest' && record.fields.response === 'Yes').length;
    const pending = invited - responded;
    const percentComplete = Math.floor((responded/invited) * 100);

    return (
        <OverviewWrapper>
            <OverviewItemsWrapper>
                <OverviewItem title='Invited' data={invited} />
                <OverviewItem title='Yes' data={respondedYes} />
                <OverviewItem title='No' data={respondedNo} />
                <OverviewItem title='Pending' data={pending} />
            </OverviewItemsWrapper>
            <OverviewItemsWrapper>
                <OverviewItem title='Guests (+1s)' data={attendingGuests} />
                <OverviewItem title='Total' data={respondedYes + attendingGuests} />
            </OverviewItemsWrapper>
            <ProgressBar percent={percentComplete || 0} append={`Responded (${responded} / ${invited})`} />
        </OverviewWrapper>
    );
};

export default Overview;
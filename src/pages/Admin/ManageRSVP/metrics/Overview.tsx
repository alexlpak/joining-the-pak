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
    gap: 1rem;
`;

const OverviewItemStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface OverviewItemProps {
    title: string;
    data: number;
};

const OverviewItem: React.FC<OverviewItemProps> = ({ title, data }) => {
    return (
        <OverviewItemStyled>
            <Typography bold>{title}</Typography>
            <Typography>{data}</Typography>
        </OverviewItemStyled>
    );
};

const Overview: React.FC = () => {
    const { records } = useAdminContext();
    const invited = records.length;
    const responded = records.filter(record => record.fields.response).length;
    const pending = invited - responded;
    const percentComplete = Math.floor((responded/invited) * 100);

    return (
        <OverviewWrapper>
            <OverviewItemsWrapper>
                <OverviewItem title='Invited' data={invited} />
                <OverviewItem title='Responded' data={responded} />
                <OverviewItem title='Pending' data={pending} />
            </OverviewItemsWrapper>
            <ProgressBar percent={percentComplete || 0} />
        </OverviewWrapper>
    );
};

export default Overview;
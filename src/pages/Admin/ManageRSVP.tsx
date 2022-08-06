import React from 'react';
import Section from '../../components/Section';
import { useTheme } from 'styled-components';

const ManageRSVP: React.FC = () => {
    const theme = useTheme();

    return (
        <Section color={theme.colors.main}>
            Hello
        </Section>
    );
};

export default ManageRSVP;
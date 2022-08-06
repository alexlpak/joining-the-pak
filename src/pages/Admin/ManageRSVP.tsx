import React from 'react';
import Section from '../../components/Section';
import { useTheme } from 'styled-components';
import Input from '../../components/Input';
import Form from '../../components/Form';
import Button from '../../components/Button';

const ManageRSVP: React.FC = () => {
    const theme = useTheme();

    return (
        <Section color={theme.colors.main}>
            Hello
        </Section>
    );
};

export default ManageRSVP;
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20rem;
`;

const ErrorMessage = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    width: 100%;
    border: 2px solid white;
    padding: 1rem;
    border-radius: .5rem;
    line-height: 1.5;
`;

const ErrorIcon = styled(FontAwesomeIcon).attrs({
    icon: faCircleExclamation,
    size: '2x'
})`
    padding: 1rem;
`;

interface FormProps {
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode | React.ReactNode[];
    error?: string;
};

const Form: React.FC<FormProps> = ({ onSubmit, children, error, ...rest }) => {
    return (
        <FormStyled onSubmit={onSubmit} {...rest}>
            {error && (
                <ErrorMessage>
                    <ErrorIcon />
                    {error}
                </ErrorMessage>
            )}
            {children}
        </FormStyled>
    );
};

export default Form;
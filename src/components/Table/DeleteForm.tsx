import React from 'react';
import Typography from '../Typography';
import Button, { ButtonWrapper } from '../Button';
import Form from '../Form';
import { useAdminContext } from '../../contexts/AdminContext';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface DeleteFormProps {
    recordIds: string[] | [];
};

const RecordWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DeleteForm: React.FC<DeleteFormProps> = ({ recordIds }) => {
    const { records, getRecords, setModalContents, setModalOpen } = useAdminContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setModalContents({
            title: '',
            instructions: '',
            children: null
        });
        setModalOpen(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Typography italic>Deleting the following records ({recordIds.length}):</Typography>
            <RecordWrapper>
                {recordIds.map(id => {
                    const foundRecord = records.find(record => record.id === id);
                    if (foundRecord) {
                        const { firstName, lastName } = foundRecord.fields;
                        return <Typography key={foundRecord.id}>{firstName} {lastName}</Typography>
                    };
                    return false;
                })}
            </RecordWrapper>
            <ButtonWrapper>
                <Button secondary onClick={() => closeModal()}>Cancel</Button>
                <Button type='submit' icon={faXmark}>Delete</Button>
            </ButtonWrapper>
        </Form>
    );
};

export default DeleteForm;
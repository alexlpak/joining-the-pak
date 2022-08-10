import React, { useState } from 'react';
import Typography from '../Typography';
import Button, { ButtonWrapper } from '../Button';
import Form from '../Form';
import { useAdminContext } from '../../contexts/AdminContext';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteGuests } from '../../api/guests';

interface DeleteFormProps {
    recordIds: string[] | [];
};

const RecordWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const DeleteForm: React.FC<DeleteFormProps> = ({ recordIds }) => {
    const { records, setModalContents, setModalOpen, getRecords } = useAdminContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await deleteGuests(recordIds);
            setLoading(false);
            setModalOpen(false);
            await getRecords();
        }
        catch {
            setError('Failed to delete record. Please try again later.');
            setLoading(false);
        };
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
        <Form onSubmit={handleSubmit} error={error}>
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
                <Button secondary onClick={() => closeModal()} disabled={loading}>Cancel</Button>
                <Button type='submit' icon={faXmark} loading={loading}>Delete</Button>
            </ButtonWrapper>
        </Form>
    );
};

export default DeleteForm;
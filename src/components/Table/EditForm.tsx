import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import Form from '../Form';
import Input from '../Input';
import Button, { ButtonWrapper } from '../Button';
import { useAdminContext } from '../../contexts/AdminContext';
import { FormFieldValue } from '../../types/forms';
import Typography from '../Typography';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { updateGuests } from '../../api/guests';
import styled from 'styled-components';

interface EditFormProps {
    recordIds: string[] | [];
};

const EditRecordsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const EditForm: React.FC<EditFormProps> = ({ recordIds }) => {
    const [value, setValue] = useState([]);

    const { setModalOpen, setModalContents, records } = useAdminContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChange = (value: FormFieldValue) => {
        setValue((prev) => ({ ...prev, ...value }));
    };

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <Form onSubmit={handleSubmit}>
            {!!recordIds.length && <Typography italic>Editing the following records ({recordIds.length}):</Typography>}
            {!!recordIds.length && (
                <EditRecordsWrapper>
                    {recordIds.map(id => {
                        const foundRecord = records.find(record => record.id === id);
                        if (foundRecord) {
                            const { firstName, lastName } = foundRecord.fields;
                            const guestName = `${firstName} ${lastName}`;
                            return (
                                <Typography key={foundRecord.id}>{guestName}</Typography>
                            );
                        }
                        else return false;
                    })}
                </EditRecordsWrapper>
            )}
            {recordIds.length === 1 && <>
                <Input
                    initValue={recordIds.length > 1 ? '' : records.find(record => record.id === recordIds[0])?.fields.firstName}
                    name='firstName'
                    placeholder='First Name'
                    type='text'
                    onChange={handleChange}
                />
                <Input
                    initValue={recordIds.length > 1 ? '' : records.find(record => record.id === recordIds[0])?.fields.lastName}
                    name='lastName'
                    placeholder='Last Name'
                    type='text'
                    onChange={handleChange}
                />
            </>}
            <Input
                initValue={records.find(record => record.id === recordIds[0])?.fields.partyId}
                name='partyId'
                placeholder='Party ID'
                type='text'
                onChange={handleChange}
            />
            <Input
                initValue={records.find(record => record.id === recordIds[0])?.fields.response}
                name='response'
                placeholder='Response'
                type='text'
                onChange={handleChange}
            />
            <ButtonWrapper>
                <Button secondary onClick={() => setModalOpen(false)}>
                    <Typography bold>Cancel</Typography>
                </Button>
                <Button icon={faPaperPlane}>
                    <Typography bold>Submit</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default EditForm;
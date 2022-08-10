import React, { useState } from 'react';
import Form from '../Form';
import Input from '../Input';
import Select from '../Select';
import Button, { ButtonWrapper } from '../Button';
import { useAdminContext } from '../../contexts/AdminContext';
import { FormFieldValue } from '../../types/forms';
import Typography from '../Typography';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { updateGuests, GuestEntry } from '../../api/guests';

interface EditFormProps {
    recordIds: string[] | [];
};

const EditRecordsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const EditForm: React.FC<EditFormProps> = ({ recordIds }) => {
    const [value, setValue] = useState({} as GuestEntry);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { setModalOpen, records, getRecords } = useAdminContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const foundRecords = recordIds.map(id => {
            return records.find(record => record.id === id);
        });
        if (foundRecords.length) {
            const updateRecords = foundRecords.map(record => {
                const updateFields = {
                    ...value,
                    changedBy: 'System'
                };
                return {
                    id: record?.id,
                    fields: updateFields
                };
            });
            if (updateRecords.length) {
                try {
                    setLoading(true);
                    const response = await updateGuests(updateRecords);
                    console.log(response);
                    setLoading(false);
                    if (response.status === 200) {
                        setError('');
                        setModalOpen(false);
                        getRecords();
                    };
                }
                catch {
                    setLoading(false);
                    setError('Something went wrong. Please try again later.');
                };
            };
        };
    };

    const handleChange = (changeObject: FormFieldValue) => {
        const stringValue: string[] = Object.values(changeObject);
        if (!!stringValue[0]) {
            setValue((prev) => ({ ...prev, ...changeObject }));
        };
    };

    return (
        <Form onSubmit={handleSubmit} error={error} secondary>
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
                    name='firstName'
                    placeholder='First Name'
                    capitalize
                    type='text'
                    onChange={handleChange}
                />
                <Input
                    name='lastName'
                    placeholder='Last Name'
                    capitalize
                    type='text'
                    onChange={handleChange}
                />
            </>}
            <Input
                name='partyId'
                placeholder='Party ID'
                type='text'
                onChange={handleChange}
            />
            <Select
                options={['Yes', 'No']}
                onChange={handleChange}
                name='response'
                placeholder='Response'
            />
            <ButtonWrapper>
                <Button secondary onClick={() => setModalOpen(false)} disabled={loading}>
                    <Typography bold>Cancel</Typography>
                </Button>
                <Button type='submit' icon={faPaperPlane} loading={loading} disabled={value.response ? !['Yes', 'No'].includes(value.response) : false}>
                    <Typography bold>Submit</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default EditForm;
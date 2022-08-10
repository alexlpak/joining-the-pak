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
        const stringValue: string[] | number[] = Object.values(changeObject);
        const update = stringValue[0];
        if (update !== '' && recordIds.length > 1) {
            setValue((prev) => ({ ...prev, ...changeObject }));
        }
        else {
            setValue((prev) => ({ ...prev, ...changeObject }));
        };
    };

    const getFieldValueByRecordId = (id: string, fieldName: keyof GuestEntry) => {
        return records.find(record => record.id === id)?.fields[fieldName];
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
                    initValue={recordIds.length > 1 ? '' : getFieldValueByRecordId(recordIds[0], 'firstName')}
                    focus
                    name='firstName'
                    placeholder='First Name'
                    capitalize
                    type='text'
                    onChange={handleChange}
                />
                <Input
                    initValue={recordIds.length > 1 ? '' : getFieldValueByRecordId(recordIds[0], 'lastName')}
                    name='lastName'
                    placeholder='Last Name'
                    capitalize
                    type='text'
                    onChange={handleChange}
                />
            </>}
            <Input
                initValue={recordIds.length > 1 ? '' : !!value?.partyId ? '' : getFieldValueByRecordId(recordIds[0], 'allowedGuests')}
                name='allowedGuests'
                placeholder='Allowed Guests'
                disabled={!!value?.partyId}
                type='number'
                onChange={handleChange}
            />
            <Input
                initValue={recordIds.length > 1 ? '' : value?.allowedGuests && value?.allowedGuests > 0 ? '' : getFieldValueByRecordId(recordIds[0], 'partyId')}
                name='partyId'
                placeholder='Party ID'
                disabled={(value?.allowedGuests && value?.allowedGuests > 0) || false}
                type='text'
                onChange={handleChange}
            />
            <Select
                initValue={recordIds.length > 1 ? '' : getFieldValueByRecordId(recordIds[0], 'response')}
                options={['Yes', 'No']}
                onChange={handleChange}
                name='response'
                placeholder='Response'
            />
            <ButtonWrapper>
                <Button secondary onClick={() => setModalOpen(false)} disabled={loading}>
                    <Typography bold>Cancel</Typography>
                </Button>
                <Button type='submit' icon={faPaperPlane} loading={loading} disabled={!(value.firstName && value.lastName) || loading}>
                    <Typography bold>Submit</Typography>
                </Button>
            </ButtonWrapper>
        </Form>
    );
};

export default EditForm;
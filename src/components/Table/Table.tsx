import { faCheck, faGear, faWrench, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAdminContext } from '../../contexts/AdminContext';
import { FormFieldValue } from '../../types/forms';
import Button, { ButtonWrapper } from '../Button';
import Checkbox from '../Checkbox';
import Typography from '../Typography';
import Form from '../Form';
import Input from '../Input';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: .8rem;
    border: 2px solid ${({ theme }) => theme.colors.main};
    box-shadow: 0px 0px 0px 2px white;
    background-color: white;
    color: black;
    overflow: hidden;
`;

interface RowProps {
    $selected?: boolean;
};

const Row = styled.div<RowProps>`
    display: flex;
    background-color: ${({ $selected }) => $selected ? 'rgb(120 152 149 / 25%)' : 'white'};
    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.main};
    };
    transition: background-color 250ms ease;
`;

const Header = styled(Row)`
    font-family: quincy-cf, serif;
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    &:not(:last-child) {
        border-bottom: 1px solid white;
    };
`;

interface CellProps {
    $centered?: boolean;
    $width?: string;
};

const Cell = styled.div<CellProps>`
    padding: 1rem;
    display: flex;
    align-items: center;
    width: ${({ $width }) => $width};
    ${({ $centered }) => {
        if ($centered) return css`
            justify-content: center;
            text-align: center;
        `;
    }};
    &:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.25);
    };
`;

const HeaderCell = styled(Cell)`
    justify-content: center;
    user-select: none;
    text-align: center;
`;

const TableActionsWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-around;
    align-items: center;
`;

const Table: React.FC = () => {
    const [tableRecords, setTableRecords] = useState([]);

    const { records, getRecords } = useAdminContext();
    const [selected, setSelected] = useState([] as string[]);

    const { setModalOpen, setModalContents } = useAdminContext();

    useEffect(() => {
        getRecords();
    }, []);

    const handleCheck = (value: FormFieldValue) => {
        const id = Object.keys(value)[0];
        const checked: boolean = Object.values(value)[0];
        setSelected((prev) => {
            if (checked && !prev.includes(id)) return [...prev, id];
            else if (!checked) return prev.filter(entry => entry !== id);
            else return prev;
        });
    };

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const selectAll = (value: FormFieldValue) => {
        const checked: boolean = Object.values(value)[0];
        if (records.length) {
            const allRecordIds = records.map(record => record.id);
            checked ? setSelected(allRecordIds) : setSelected([]);
        };
    };

    const openBatchEditModal = () => {
        setModalContents({
            title: selected.length > 1 ? 'Batch Edit RSVPs' : 'Edit RSVP',
            instructions: 'Please enter any information that you would like to update. Any fields left blank will not be updated.',
            children: <EditForm recordIds={selected} />
        });
        setModalOpen(true);
    };

    const openBatchDeleteModal = () => {
        setModalContents({
            title: selected.length > 1 ? 'Batch Delete RSVPs' : 'Delete RSVP',
            instructions: 'Are you sure you would like to delete the following records?',
            children: <DeleteForm recordIds={selected} />
        });
        setModalOpen(true);
    };

    const openSingleEditModal = (recordId: string) => {
        setModalContents({
            title: 'Edit RSVP',
            instructions: 'Please enter any information that you would like to update. Any fields left blank will not be updated.',
            children: <EditForm recordIds={[recordId]} />
        });
        setModalOpen(true);
    };

    const openSingleDeleteModal = (recordId: string) => {
        setModalContents({
            title: 'Delete RSVP',
            instructions: 'Are you sure you would like to delete the following record?',
            children: <DeleteForm recordIds={[recordId]} />
        });
        setModalOpen(true);
    };

    return (
        <>
            <TableActionsWrapper>
                <Input type='text' name='search' placeholder='Search' />
                <Button disabled={!selected.length} icon={faGear} onClick={() => openBatchEditModal()}>Batch Edit</Button>
                <Button disabled={!selected.length} icon={faXmark} onClick={() => openBatchDeleteModal()}>Batch Delete</Button>
            </TableActionsWrapper>
            <TableWrapper>
                <Header>
                    <HeaderCell $width='5rem'>
                        <Checkbox secondary initValue={false} name='selectAll' onChange={selectAll} />
                    </HeaderCell>
                    <HeaderCell $width='8rem'>First Name</HeaderCell>
                    <HeaderCell $width='8rem'>Last Name</HeaderCell>
                    <HeaderCell $width='6rem'>Response</HeaderCell>
                    <HeaderCell $width='8rem'>Party ID</HeaderCell>
                    <HeaderCell $width='6rem'>Allowed Guests</HeaderCell>
                    <HeaderCell $width='8rem'>Type</HeaderCell>
                    <HeaderCell $width='8rem'>Last Modified</HeaderCell>
                    <HeaderCell $width='8rem'>Changed By</HeaderCell>
                    <HeaderCell $width='8rem'>Edit</HeaderCell>
                    <HeaderCell $width='8rem'>Delete</HeaderCell>
                </Header>
                {!!records.length && records.sort((a, b) => {
                    const current = a.fields.partyId || '';
                    const next = b.fields.partyId || '';
                    return next.localeCompare(current);
                }).map(record => {
                    const { firstName, lastName, response, partyId, allowedGuests, type, dateModified, changedBy } = record.fields;
                    const changedByRecord = records.find(record => record.id === changedBy);
                    const changedByName = `${changedByRecord?.fields.firstName} ${changedByRecord?.fields.lastName}`;
                    return (
                        <Row key={record.id} $selected={selected.includes(record.id)}>
                            <Cell $centered $width='5rem'><Checkbox initValue={selected.includes(record.id)} name={record.id || ''} onChange={handleCheck} /></Cell>
                            <Cell $width='8rem'>{firstName}</Cell>
                            <Cell $width='8rem'>{lastName}</Cell>
                            <Cell $centered $width='6rem'>
                                {response === 'Yes' && <FontAwesomeIcon icon={faCheck} />}
                                {response === 'No' && <FontAwesomeIcon icon={faXmark} />}
                            </Cell>
                            <Cell $centered $width='8rem'>{partyId}</Cell>
                            <Cell $centered $width='6rem'>{allowedGuests}</Cell>
                            <Cell $centered $width='8rem'>{type}</Cell>
                            <Cell $centered $width='8rem'>{dateModified && `${new Date(dateModified).toDateString()} ${new Date(dateModified).toLocaleTimeString()}`}</Cell>
                            <Cell $centered $width='8rem'>
                                {changedByRecord ? changedByName : ''}
                            </Cell>
                            <Cell $centered $width='8rem'>
                                <Button onClick={() => openSingleEditModal(record.id)}>
                                    <Typography bold>Edit</Typography>
                                </Button>
                            </Cell>
                            <Cell $centered $width='8rem'>
                                <Button onClick={() => openSingleDeleteModal(record.id)}>
                                    <Typography bold>Delete</Typography>
                                </Button>
                            </Cell>
                        </Row>
                    );
                })}
            </TableWrapper>
        </>
    );
};

export default Table;
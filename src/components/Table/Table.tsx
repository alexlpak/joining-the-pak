import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAdminContext } from '../../contexts/AdminContext';
import { FormFieldValue } from '../../types/forms';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Input from '../Input';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import { GuestEntry } from '../../api/guests';
import { RemUnit } from '../../types/styling';
import { getFirstAndLastNameByRecordId } from '../../helper/guests';

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

interface TableColumn {
    header?: {
        content: React.ReactNode | React.ReactNode[];
    };
    body?: {
        content: React.ReactNode | React.ReactNode[];
    };
    width: RemUnit;
    fieldName?: keyof GuestEntry;
    utilityName?: 'select' | 'edit' | 'delete';
    centered?: boolean;
};

interface TableData {
    columns: TableColumn[];
};

const tableData: TableData = {
    columns: [
        { utilityName: 'select', width: '5rem', centered: true },
        { header: { content: 'First Name' }, fieldName: 'firstName', width: '8rem' },
        { header: { content: 'Last Name' }, fieldName: 'lastName', width: '8rem' },
        { header: { content: 'Response' }, fieldName: 'response', width: '6rem', centered: true },
        { header: { content: 'Party ID' }, fieldName: 'partyId', width: '8rem', centered: true },
        { header: { content: 'Allowed Guests' }, fieldName: 'allowedGuests', width: '6rem', centered: true },
        { header: { content: 'Type' }, fieldName: 'type', width: '8rem', centered: true },
        { header: { content: 'Date Modified' }, fieldName: 'dateModified', width: '8rem', centered: true },
        { header: { content: 'Changed By' }, fieldName: 'changedBy', width: '8rem', centered: true },
        { utilityName: 'edit', header: { content: 'Edit' }, width: '8rem', centered: true },
        { utilityName: 'delete', header: { content: 'Delete' }, width: '8rem', centered: true }
    ]
};

const Table: React.FC = () => {
    const { records, getRecords, setModalOpen, setModalContents } = useAdminContext();
    const [selected, setSelected] = useState([] as string[]);

    useEffect(() => {
        getRecords();
        // eslint-disable-next-line
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
                    {tableData.columns.map(column => {
                        return (
                            <HeaderCell key={`header-${column.fieldName || column.utilityName}`} $centered={column.centered} $width={column.width}>
                                {column.header && column.header.content}
                                {column.utilityName === 'select' && <Checkbox secondary name='selectAll' initValue={false} onChange={selectAll} />}
                            </HeaderCell>
                        );
                    })}
                </Header>
                {records.length > 0 && records.map(record => {
                    const { changedBy, dateModified } = record.fields;
                    const changedByName = changedBy && getFirstAndLastNameByRecordId(records, changedBy);
                    const dateString = dateModified && `${new Date(dateModified).toDateString()} ${new Date(dateModified).toLocaleTimeString()}`;
                    const componentMap: { [key in GuestEntry | any]: any } = {
                        'changedBy': changedByName,
                        'dateModified': dateString,
                    };
                    return (
                        <Row key={record.id} $selected={selected.includes(record.id)}>
                            {tableData.columns.map(column => {
                                const recordData = column.fieldName && record.fields[column.fieldName];
                                const { fieldName } = column;
                                return (
                                    <Cell $centered={column.centered} $width={column.width} key={`cell-${column.fieldName || column.utilityName}`}>
                                        {fieldName && fieldName in componentMap ? componentMap[fieldName] : recordData}
                                        {column.utilityName === 'select' && <Checkbox initValue={selected.includes(record.id)} name={record.id || ''} onChange={handleCheck} />}
                                        {column.utilityName === 'edit' && <Button onClick={() => openSingleEditModal(record.id)}>Edit</Button>}
                                        {column.utilityName === 'delete' && <Button onClick={() => openSingleDeleteModal(record.id)}>Delete</Button>}
                                    </Cell>
                                );
                            })}
                        </Row>
                    );
                })}
            </TableWrapper>
        </>
    );
};

export default Table;
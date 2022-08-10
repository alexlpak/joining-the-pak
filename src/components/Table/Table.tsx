import { faCaretDown, faCaretUp, faGear, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
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
import CreateForm from './CreateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableContentsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
`;

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: .5rem;
    border: 2px solid ${({ theme }) => theme.colors.main};
    box-shadow: 0px 0px 0px 2px white;
    background-color: white;
    color: black;
    overflow: hidden;
    justify-content: center;
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

interface HeaderCellProps {
    $sortable: boolean;
};

const HeaderCell = styled(Cell)<HeaderCellProps>`
    display: flex;
    gap: .5rem;
    justify-content: center;
    user-select: none;
    text-align: center;
    ${({ $sortable }) => {
        if ($sortable) return css`
            &:hover {
                cursor: pointer;
            };
        `;
    }}
`;

const TableActionsWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-around;
    align-items: center;
`;

const EmptyRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
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
    breakpoint?: number;
};

type TableData = TableColumn[];

const tableData: TableData = [
    { utilityName: 'select', width: '5rem', centered: true },
    { header: { content: 'First Name' }, fieldName: 'firstName', width: '8rem' },
    { header: { content: 'Last Name' }, fieldName: 'lastName', width: '8rem' },
    { header: { content: 'Response' }, fieldName: 'response', width: '6rem', centered: true, breakpoint: 485 },
    { header: { content: 'Party ID' }, fieldName: 'partyId', width: '8rem', centered: true, breakpoint: 1365 },
    { header: { content: 'Allowed Guests' }, fieldName: 'allowedGuests', width: '6rem', centered: true, breakpoint: 865 },
    { header: { content: 'Type' }, fieldName: 'type', width: '8rem', centered: true, breakpoint: 985 },
    { header: { content: 'Date Modified' }, fieldName: 'dateModified', width: '8rem', centered: true, breakpoint: 1265 },
    { header: { content: 'Changed By' }, fieldName: 'changedBy', width: '8rem', centered: true, breakpoint: 1115 },
    { utilityName: 'edit', header: { content: 'Edit' }, width: '8rem', centered: true, breakpoint: 640 },
    { utilityName: 'delete', header: { content: 'Delete' }, width: '8rem', centered: true, breakpoint: 765 }
];

type Search = {
    field: keyof GuestEntry | '',
    order: 'asc' | 'desc' | ''
};

const Table: React.FC = () => {
    const { records, getRecords, setModalOpen, setModalContents } = useAdminContext();
    const [selected, setSelected] = useState([] as string[]);
    const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const [search, setSearch] = useState('');
    const [columnSort, setColumnSort] = useState({ field: 'dateModified', order: 'desc' } as Search);

    useEffect(() => {
        getRecords();
        console.log(records);
        const handleResize = () => {
            setPageWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
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

    const handleColumnClick = (fieldName: keyof GuestEntry) => {
        if (columnSort.field === fieldName) {
            setColumnSort((prev) => {
                if (prev.order === '') return { field: fieldName, order: 'desc' };
                else if (prev.order === 'desc') return { field: fieldName, order: 'asc' };
                else if (prev.order === 'asc') return { field: '', order: '' };
                else return prev;
            });
        }
        else {
            setColumnSort({ field: fieldName, order: 'desc' });
        };
    };

    const handleSearch = (value: FormFieldValue) => {
        const query = Object.values(value);
        setSearch(query[0]);
    };

    const openCreateNewModal = () => {
        setModalContents({
            title: 'Create RSVP',
            instructions: 'Please enter the information below to create a new record. Any fields left blank will not be updated.',
            children: <CreateForm />
        });
        setModalOpen(true);
    }

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
            instructions: 'Please enter any information that you would like to update. Any fields left blank will clear out previously written data.',
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

    const tableContent = records.length > 0 && records.filter(record => {
        const { firstName, lastName } = record.fields;
        if (search) {
            return firstName.toLowerCase().includes(search.toLowerCase())
            || lastName.toLowerCase().includes(search.toLowerCase());
        }
        else return true;
    }).sort((a, b) => {
        if (columnSort.field && columnSort.order) {
            const current = a.fields[columnSort.field] || 0;
            const next = b.fields[columnSort.field] || 0;
            if (columnSort.order === 'asc') {
                return current > next ? 1 : -1;
            }
            else if (columnSort.order === 'desc') {
                return current < next ? 1 : -1;
            }
            else return 0;
        };
        return 0;
    }).map(record => {
        const { changedBy, dateModified } = record.fields;
        const changedByName = changedBy && getFirstAndLastNameByRecordId(records, changedBy);
        const dateString = dateModified && `${new Date(dateModified).toDateString()} ${new Date(dateModified).toLocaleTimeString()}`;
        const componentMap: { [key in GuestEntry | any]: any } = {
            'changedBy': changedByName,
            'dateModified': dateString,
        };
        return (
            <Row key={record.id} $selected={selected.includes(record.id)}>
                {tableData.filter(column => column.breakpoint ? pageWidth > column.breakpoint : true).map(column => {
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
    });

    return (
        <TableContentsWrapper>
            <Button icon={faPen} onClick={() => openCreateNewModal()}>Create New</Button>
            <TableActionsWrapper>
                <Button disabled={!selected.length} icon={faGear} onClick={() => openBatchEditModal()}>Batch Edit</Button>
                <Button disabled={!selected.length} icon={faXmark} onClick={() => openBatchDeleteModal()}>Batch Delete</Button>
            </TableActionsWrapper>
            <Input onChange={handleSearch} type='text' name='search' placeholder='Search by Name' width={pageWidth < 550 ? '100%' : '20rem'} />
            <TableWrapper>
                <Header>
                    {tableData.filter(column => column.breakpoint ? pageWidth > column.breakpoint : true).map(column => {
                        return (
                            <HeaderCell $sortable={!!column.fieldName} onClick={() => column.fieldName && handleColumnClick(column.fieldName)} key={`header-${column.fieldName || column.utilityName}`} $centered={column.centered} $width={column.width}>
                                {column.header && column.header.content}
                                {column.utilityName === 'select' && <Checkbox secondary name='selectAll' initValue={false} onChange={selectAll} />}
                                {columnSort.field === column.fieldName && !!columnSort.order && (
                                    <FontAwesomeIcon icon={columnSort.order === 'asc' ? faCaretUp : faCaretDown} />
                                )}
                            </HeaderCell>
                        );
                    })}
                </Header>
                {(tableContent && tableContent.length) ? tableContent : <EmptyRow>{records.length ? 'No records found.' : 'Loading records...'}</EmptyRow>}
            </TableWrapper>
        </TableContentsWrapper>
    );
};

export default Table;
import React, { useContext, useState, createContext } from 'react';
import { getDataFromTable, FetchedRecord } from '../api/guests';
import Modal from '../components/Modal';
import Typography from '../components/Typography';

interface AdminContextType {
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    records: FetchedRecord[];
    setRecords: React.Dispatch<React.SetStateAction<FetchedRecord[]>>;
    getRecords: () => Promise<void>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContents: React.Dispatch<React.SetStateAction<ModalContents>>;
};

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const useAdminContext = () => {
    return useContext(AdminContext);
};

interface AdminContextProviderProps {
    children: React.ReactNode | React.ReactNode[];
};

type ModalContents = {
    children: React.ReactNode | React.ReactNode[] | null;
    instructions: string;
    title: string;
};

export const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
    const [validated, setValidated] = useState(false);
    const [records, setRecords] = useState([] as FetchedRecord[]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContents, setModalContents] = useState({
        children: null,
        instructions: '',
        title: ''
    } as ModalContents);

    const getRecords = async () => {
        const response = await getDataFromTable();
        if (response.records && response.records.length) setRecords(response.records);
    };

    const value = {
        validated, setValidated,
        records, setRecords, getRecords,
        modalOpen, setModalOpen, setModalContents
    };
    
    return (
        <AdminContext.Provider value={value}>
            {modalOpen && <Modal title={modalContents.title}>
                <Typography>{modalContents.instructions}</Typography>
                {modalContents.children}
            </Modal>}
            {children}
        </AdminContext.Provider>
    );
};
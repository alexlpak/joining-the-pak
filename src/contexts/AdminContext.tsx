import React, { useContext, useState, createContext, useEffect } from 'react';
import { validatePasscode } from '../api/admin';
import { getDataFromTable, FetchedRecord } from '../api/guests';
import Modal from '../components/Modal';
import Typography from '../components/Typography';
import { useSessionStorage } from '../hooks/useSessionStorage';

interface AdminContextType {
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
    records: FetchedRecord[];
    setRecords: React.Dispatch<React.SetStateAction<FetchedRecord[]>>;
    getRecords: () => Promise<void>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setModalContents: React.Dispatch<React.SetStateAction<ModalContents>>;
    lastAttemptedPassword: string;
    setLastAttemptedPassword: React.Dispatch<React.SetStateAction<string>>;
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
    const [lastAttemptedPassword, setLastAttemptedPassword] = useSessionStorage('ADMIN_PASS', '');
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
        if (response.records) setRecords(response.records);
    };

    const validateUser = async (key: string) => {
        const validated = await validatePasscode(key);
        setValidated(() => validated);
    };

    useEffect(() => {
        validateUser(lastAttemptedPassword);
    }, [lastAttemptedPassword])

    const value = {
        validated, setValidated,
        records, setRecords, getRecords,
        lastAttemptedPassword, setLastAttemptedPassword,
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
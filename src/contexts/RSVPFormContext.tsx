import React, { useContext, useState, createContext } from 'react';
import { Record, GuestEntry } from '../db/airtable';
import RSVPModal from '../sections/RSVP/forms/RSVPModal';

interface RSVPFormContextType {
    record: Record;
    setRecord: React.Dispatch<React.SetStateAction<Record>>;
    response: string;
    setResponse: React.Dispatch<React.SetStateAction<string>>;
    party: Record[];
    setParty: React.Dispatch<React.SetStateAction<Record[]>>;
    guests: GuestEntry[];
    setGuests: React.Dispatch<React.SetStateAction<GuestEntry[]>>;
    step: keyof Steps;
    setStep: React.Dispatch<React.SetStateAction<keyof Steps>>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RSVPFormContext = createContext<RSVPFormContextType>({} as RSVPFormContextType);

export const useRSVPFormContext = () => {
    return useContext(RSVPFormContext);
};

interface FormContextProviderProps {
    children: React.ReactNode | React.ReactNode[];
};

export type Steps = {
    Search?: React.ReactNode;
    Response?: React.ReactNode;
    Party?: React.ReactNode;
    Guests?: React.ReactNode;
    ThankYou?: React.ReactNode;
};

export const RSVPFormContextProvider: React.FC<FormContextProviderProps> = ({ children }) => {
    const [record, setRecord] = useState({} as Record);
    const [response, setResponse] = useState('');
    const [party, setParty] = useState([] as Record[]);
    const [guests, setGuests] = useState([] as GuestEntry[]);
    const [step, setStep] = useState('Search' as keyof Steps);
    const [modalOpen, setModalOpen] = useState(false);

    const value = {
        record, setRecord,
        response, setResponse,
        party, setParty,
        guests, setGuests,
        step, setStep,
        modalOpen, setModalOpen
    };
    
    return (
        <RSVPFormContext.Provider value={value}>
            {modalOpen && <RSVPModal />}
            {children}
        </RSVPFormContext.Provider>
    );
};
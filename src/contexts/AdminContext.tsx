import React, { useContext, useState, createContext } from 'react';

interface AdminContextType {
    validated: boolean;
    setValidated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export const useAdminContext = () => {
    return useContext(AdminContext);
};

interface AdminContextProviderProps {
    children: React.ReactNode | React.ReactNode[];
};

export const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
    const [validated, setValidated] = useState(false);

    const value = {
        validated, setValidated
    };
    
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
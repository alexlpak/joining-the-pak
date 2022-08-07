import React from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import ManageRSVP from './ManageRSVP/ManageRSVP';
import Passcode from './Passcode';

const Admin: React.FC = () => {
    // const { validated } = useAdminContext();
    const validated = true;

    return (
        <>
            {!validated && <Passcode />}
            {validated && <ManageRSVP />}
        </>
    );
};

export default Admin;
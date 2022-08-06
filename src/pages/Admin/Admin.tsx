import React from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import ManageRSVP from './ManageRSVP';
import Passcode from './Passcode';

const Admin: React.FC = () => {
    const { validated } = useAdminContext();

    return (
        <>
            {!validated && <Passcode />}
            {validated && <ManageRSVP />}
        </>
    );
};

export default Admin;
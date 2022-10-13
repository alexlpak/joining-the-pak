import React from 'react';
import { useAdminContext } from '../../contexts/AdminContext';
import ManageRSVP from './ManageRSVP/ManageRSVP';
import Passcode from './Passcode';

const Admin: React.FC = () => {
    const { validated } = useAdminContext();
    // const auth = process.env.NODE_ENV === 'development' ? true : validated;
    const auth = validated;

    return (
        <>
            {!auth && <Passcode />}
            {auth && <ManageRSVP />}
        </>
    );
};

export default Admin;
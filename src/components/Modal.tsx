import React, { useEffect } from 'react';
import Typography from './Typography';
import styled, { useTheme } from 'styled-components';

const ModalWrapperStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    overflow: hidden;
`;

const ModalBackgroundStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
`;

const ModalStyled = styled.div`
    position: fixed;
    padding: 2rem;
    background-color: white;
    color: black;
    border-radius: .5rem;
    max-width: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    text-align: left;
    margin: 1rem;
`;

interface ModalProps {
    title: string;
    children: React.ReactNode[] | React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, title }) => {
    const theme = useTheme();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <ModalWrapperStyled>
            <ModalBackgroundStyled />
            <ModalStyled>
                <Typography color={theme.colors.main} type='header'>{title}</Typography>
                {children}
            </ModalStyled>
        </ModalWrapperStyled>
    );
};

export default Modal;
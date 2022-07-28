import styled, { useTheme } from 'styled-components';
import { theme } from '../styles/theme';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { capitalizeString } from '../helper/text';
import { FormFieldValue } from '../types/forms';

const InputStyled = styled.input`
    font-family: 'Quincy CF';
    font-weight: bold;
    font-size: 1rem;
    border-radius: .5rem;
    padding: 1rem;
    background-color: white;
    border: 2px solid ${theme.colors.main};
    outline: 2px solid white;
    width: 100%;
    &:focus {
        outline: 4px solid white
    };
    transition: outline ${theme.animation.speed}ms ${theme.animation.curve};
`;

const InputWrapperStyled = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ClearButtonStyled = styled.button.attrs({
    type: 'button'
})`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem;
    position: absolute;
    right: 0;
    background-color: transparent;
    height: 100%;
    width: 3rem;
    border: none;
    &:hover {
        cursor: pointer;
    };
`;

interface InputProps {
    initValue?: string;
    onChange?: ({}: FormFieldValue) => void;
    type: string;
    name: string;
    placeholder: string;
};

const Input: React.FC<InputProps> = ({ initValue, onChange, name, placeholder, ...rest }) => {
    const theme = useTheme();

    const [value, setValue] = useState(initValue || '');
    
    useEffect(() => {
        setValue(initValue || '');
    }, [initValue]);

    useEffect(() => {
        if (onChange) onChange({ [name]: value });
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const capitalizedValue = capitalizeString(value);
        const regex = /^[A-Za-z]*$/g;
        const validInput = regex.test(value)
        if (validInput) setValue(() => capitalizedValue)
    };

    const handleClearButtonClick = () => {
        setValue('');
    };

    return (
        <InputWrapperStyled>
            <InputStyled
                value={value}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                {...rest}
            />
            {value && <ClearButtonStyled onClick={handleClearButtonClick} tabIndex={-1}>
                <FontAwesomeIcon icon={faXmark} color={theme.colors.main} />
            </ClearButtonStyled>}
        </InputWrapperStyled>
    );
};

export default Input;
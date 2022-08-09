import styled, { useTheme } from 'styled-components';
import { theme } from '../styles/theme';
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormFieldValue } from '../types/forms';
import { capitalizeString } from '../helper/text';

const InputStyled = styled.input`
    font-family: quincy-cf;
    font-weight: 800;
    font-size: 1rem;
    border-radius: .5rem;
    padding: 1rem;
    background-color: white;
    border: 2px solid ${theme.colors.main};
    box-shadow: 0px 0px 0px 2px white;
    width: 100%;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px white;
    };
    transition: box-shadow ${theme.animation.speed}ms ${theme.animation.curve};
`;

interface InputWrapperStyledProps {
    $width?: string;
}

const InputWrapperStyled = styled.div<InputWrapperStyledProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ $width }) => $width};
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
    onChange?: (value: FormFieldValue) => void;
    type: string;
    name: string;
    placeholder: string;
    required?: boolean;
    capitalize?: boolean;
    width?: string;
};

const Input: React.FC<InputProps> = ({ initValue, onChange, width, name, capitalize, placeholder, required, ...rest }) => {
    const theme = useTheme();

    const [value, setValue] = useState(initValue || '');
    
    useEffect(() => {
        setValue(initValue || '');
    }, [initValue]);

    useEffect(() => {
        const update = capitalize ? capitalizeString(value) : value;
        if (onChange) onChange({ [name]: update });
        // eslint-disable-next-line
    }, [value]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const regex = /^[A-Za-z0-9]{0,15}$/g;
        const validInput = regex.test(value);
        if (validInput) setValue(() => value);
    }, []);

    const handleClearButtonClick = () => {
        setValue('');
    };

    return (
        <InputWrapperStyled $width={width}>
            <InputStyled
                value={value}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                required={required}
                {...rest}
            />
            {value && <ClearButtonStyled onClick={handleClearButtonClick} tabIndex={-1}>
                <FontAwesomeIcon icon={faXmark} color={theme.colors.main} />
            </ClearButtonStyled>}
        </InputWrapperStyled>
    );
};

export default Input;
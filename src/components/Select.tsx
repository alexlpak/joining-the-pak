import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { FormFieldValue } from '../types/forms';

const SelectWrapper = styled.div`
    display: flex;
    position: relative;
`;

const SelectStyled = styled.select`
    font-family: quincy-cf;
    font-weight: 800;
    font-size: 1rem;
    border-radius: .5rem;
    padding: 1rem;
    background-color: white;
    border: 2px solid ${({ theme }) => theme.colors.main};
    box-shadow: 0px 0px 0px 2px white;
    width: 100%;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 4px white;
    };
    transition: box-shadow ${({ theme }) => `${theme.animation.speed}ms ${theme.animation.curve}`};
    -webkit-appearance: none;
    -moz-appearance: none;
`;

const DropdownArrayStyled = styled.button.attrs({
    type: 'button'
})`
    pointer-events: none;
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

const SelectPlaceholder = styled.span`
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-family: quincy-cf, serif;
    font-weight: 800;
    opacity: 50%;
`;

interface SelectProps {
    initValue?: string | number;
    options: string[];
    name: string;
    onChange: (value: FormFieldValue) => void;
    placeholder: string;
};

const Select: React.FC<SelectProps> = ({ options, name, onChange, placeholder, initValue }) => {
    const [value, setValue] = useState(initValue || (typeof initValue === 'number' ? 0 : ''));

    const theme = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setValue(value);
    };

    useEffect(() => {
        setValue(initValue || (typeof initValue === 'number' ? 0 : ''));
    }, [initValue]);

    useEffect(() => {
        if (onChange) onChange({ [name]: value });
        // eslint-disable-next-line
    }, [value]);

    return (
        <SelectWrapper>
            <SelectStyled onChange={handleChange} value={value}>
                <option></option>
                {options.map(option => {
                    return <option key={`${name}-${option}`}>{option}</option>
                })}
            </SelectStyled>
            {value === '' && <SelectPlaceholder>{placeholder}</SelectPlaceholder>}
            <DropdownArrayStyled>
                <FontAwesomeIcon icon={faCaretDown} color={theme.colors.main} />
            </DropdownArrayStyled>
        </SelectWrapper>
    );
};

export default Select;
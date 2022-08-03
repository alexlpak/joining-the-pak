import React, { useEffect, useState } from 'react';
import Button from './Button';
import { faCheck, faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ButtonSelectWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

interface SelectButtonProps {
    icon?: IconProp;
    onClick?: () => void;
};

const SelectButton = styled(Button)<SelectButtonProps>`
    width: 100%;
`;

interface ButtonSelectProps {
    onChange: (value: any) => void;
    name: string;
    options: string[];
    multi?: boolean;
    initValue?: string;
};

type ButtonSelectState = string[] | string;

const ButtonSelect: React.FC<ButtonSelectProps> = ({ onChange, name, options, multi, initValue }) => {
    const [value, setValue] = useState<ButtonSelectState>(initValue || (multi ? [] : ''));

    useEffect(() => {
        if (onChange) onChange({ [name]: value });
    }, [onChange, value, name]);

    const handleClick = (option: string) => {
        setValue((prev: ButtonSelectState) => {
            if (Array.isArray(prev)) {
                if (prev.includes(option)) {
                    return prev.filter(item => item !== option);
                }
                else {
                    return [...prev, option];
                };
            }
            else return option;
        });
    };

    const allOptionsSelected = Array.isArray(value) && value.length && value.every(item => options.includes(item));

    const handleSelectAllClick = () => {
        if (Array.isArray(value)) {
            if (allOptionsSelected) {
                setValue([]);
            }
            else {
                setValue(options);
            };
        };
    };

    return (
        <ButtonSelectWrapper>
            {multi && options.length > 1 && <Button onClick={handleSelectAllClick} icon={faArrowPointer}>{allOptionsSelected ? 'Deselect All' : 'Select All'}</Button>}
            {options && options.map(option => {
                return (
                    <SelectButton
                        onClick={() => handleClick(option)}
                        key={option}
                        secondary
                        iconVisible={multi ? value.includes(option) : option === value}
                        icon={faCheck}
                    >
                        {option}
                    </SelectButton>
                );
            })}
        </ButtonSelectWrapper>
    );
};

export default ButtonSelect;
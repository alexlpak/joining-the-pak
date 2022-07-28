import React, { useEffect, useState } from 'react';
import Button from './Button';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FormFieldValue } from '../types/forms';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
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
    onChange: ({}: FormFieldValue) => void;
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
    }, [value]);

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

    return (
        <ButtonSelectWrapper>
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
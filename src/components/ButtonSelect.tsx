import React, { useState } from 'react';
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

    const handleClick = (option: string) => {
        if (Array.isArray(value)) {
            if (value.includes(option)) {
                const update = value.filter(item => item !== option);
                setValue(() => update);
                onChange({ [name]: update });
            }
            else {
                const update = [...value, option];
                setValue(() => update);
                onChange({ [name]: update });
            };
        }
        else {
            setValue(() => option);
            onChange({ [name]: option });
        };
    };

    const allOptionsSelected = Array.isArray(value) && value.length && value.every(item => options.includes(item));

    const handleSelectAllClick = () => {
        if (Array.isArray(value)) {
            if (allOptionsSelected) {
                setValue(() => []);
                onChange({ [name]: [] });
            }
            else {
                setValue(() => options);
                onChange({ [name]: options });
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
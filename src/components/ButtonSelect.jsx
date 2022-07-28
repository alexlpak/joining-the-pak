import { useEffect, useState } from 'react';
import Button from './Button';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const ButtonSelectWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SelectButton = styled(Button)`
    width: 100%;
`;

const ButtonSelect = ({ onChange, name, options, multi, initValue }) => {
    const [value, setValue] = useState(initValue || (multi ? [] : ''));

    useEffect(() => {
        if (onChange) onChange({ [name]: value });
    }, [value]);

    const handleClick = (option) => {
        setValue(prev => {
            if (multi) {
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
                        icon={multi ? value.includes(option) && faCheck : option === value && faCheck}
                    >
                        {option}
                    </SelectButton>
                );
            })}
        </ButtonSelectWrapper>
    );
};

export default ButtonSelect;
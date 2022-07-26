import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormFieldValue } from '../types/forms';

const CheckboxWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

interface CheckboxStyledProps {
    $secondary?: boolean;
};

const CheckboxStyled = styled.div<CheckboxStyledProps>`
    height: 1.5rem;
    width: 1.5rem;
    border-radius: .25rem;
    box-sizing: content-box;
    background-color: ${({ theme, $secondary }) => $secondary ? 'white' : theme.colors.main};
    border: 2px solid ${({ theme, $secondary }) => $secondary ? theme.colors.main : 'white'};
    box-shadow: 0px 0px 0px 2px ${({ theme, $secondary }) => $secondary ? 'white' : theme.colors.main};
    position: relative;
    &:hover {
        cursor: pointer;
    };
`;

const Check = styled(FontAwesomeIcon)`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
`;

const Label = styled.span`
    user-select: none;
    &:hover {
        cursor: pointer;
    };
`;

interface CheckboxProps {
    initValue: boolean;
    label?: string;
    name?: string;
    onChange?: (value: FormFieldValue) => void;
    onClick?: () => void;
    secondary?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ name, initValue, label, onChange, onClick, secondary }) => {
    const [checked, setChecked] = useState(initValue || false);

    const theme = useTheme();

    useEffect(() => {
        if (onChange && name) onChange({ [name]: checked });
        // eslint-disable-next-line
    }, [checked]);

    useEffect(() => {
        setChecked(initValue);
    }, [initValue])

    const handleClick = () => {
        setChecked((prev) => !prev);
        if (onClick) onClick();
    };

    return (
        <CheckboxWrapper>
            <CheckboxStyled $secondary={secondary} onClick={handleClick}>
                {checked && <Check icon={faCheck} color={secondary ? theme.colors.main : 'white'} />}
            </CheckboxStyled>
            {label && <Label onClick={handleClick}>{label}</Label>}
        </CheckboxWrapper>
    );
};

export default Checkbox;
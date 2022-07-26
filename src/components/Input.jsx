import styled, { useTheme } from 'styled-components';

const InputStyled = styled.input`
    font-family: 'Quincy CF';
    font-weight: bold;
    font-size: 1rem;
    border-radius: .5rem;
    padding: 1rem;
    background-color: white;
    border: 2px solid ${({ $color }) => $color};
    outline: 2px solid white;
`;

const Input = ({ onFocus, required, placeholder, onChange, value }) => {
    const theme = useTheme();
    return (
        <InputStyled onFocus={onFocus} required={required} value={value} onChange={onChange} placeholder={placeholder} $color={theme.colors.main} type='text' />
    );
};

export default Input;
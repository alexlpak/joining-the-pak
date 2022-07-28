import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import ButtonSelect from '../../components/ButtonSelect';
import Input from '../../components/Input';
import Typography from '../../components/Typography';
import { addConfetti } from '../../utilities/confetti';

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
    align-items: center;
`;

const FormContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 20rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1rem;
`;

const RSVPForm = () => {
    const [value, setValue] = useState({});
    const [step, setStep] = useState(1);
    const [complete, setComplete] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addConfetti();
    };

    const handleChange = (value) => {
        setValue(prev => ({ ...prev, ...value }));
    };

    const formComplete = () => {
        const complete = Object.keys(value).every(item => {
            if (Array.isArray(value[item])) {
                return value[item].length;
            };
            return value[item];
        });
        return complete;
    };

    useEffect(() => {
        setComplete(formComplete());
    }, [value]);


    return (
        <FormWrapper onSubmit={handleSubmit}>
            {step === 1 && <Typography>Please enter your first and last name.</Typography>}
            {step === 2 && <Typography>RSVP found! Will you be attending?</Typography>}
            {step === 3 && <Typography>Your RSVP is linked to others in your household. You can RSVP for them by selecting them below.</Typography>}
            <FormContentWrapper>
                {step === 1 && <>
                    <Input initValue={value?.firstName} onChange={handleChange} type='text' placeholder='First Name' name='firstName' />
                    <Input initValue={value?.lastName} onChange={handleChange} type='text' placeholder='Last Name' name='lastName' />
                </>}
                {step === 2 && <ButtonSelect initValue={value?.response} onChange={handleChange} name='response' options={['Yes', 'No']} />}
                {step === 3 && <ButtonSelect initValue={value?.guests} onChange={handleChange} name='guests' multi options={['Billy Bob', 'John Doe', 'Ronald McDonald']} />}
            </FormContentWrapper>
            <ButtonWrapper>
                {step > 1 && <Button onClick={() => setStep(step => step - 1)}>Back</Button>}
                {step !== 3 && <Button onClick={() => setStep(step => step + 1)} secondary>Next</Button>}
                {step === 3 && <Button type='submit' secondary disabled={!complete}>Submit</Button>}
            </ButtonWrapper>
        </FormWrapper>
    );
};

export default RSVPForm;
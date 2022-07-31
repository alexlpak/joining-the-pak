import JSConfetti from 'js-confetti';
import { theme } from '../styles/theme';

const jsConfetti = new JSConfetti();

export const addConfetti = () => jsConfetti.addConfetti({
    confettiColors: [
        theme.colors.main, theme.colors.main, '#ffffff', '#fa9fc3'
    ],
    confettiNumber: 500
});
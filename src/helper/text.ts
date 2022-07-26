export const capitalizeString = (string: string) => {
    if (string) {
        const words = string.split(' ');
        const wordsCapitalized = words.map(word => {
            const firstLetter = word.charAt(0);
            if (firstLetter === firstLetter.toUpperCase()) {
                return word;
            }
            else {
                return `${firstLetter.toUpperCase()}${word.slice(1)}`;
            };
        });
        return wordsCapitalized.join(' ');
    }
    else return '';
};

export const generateRandomString = () => {
    return Math.random().toString(16).slice(2);
};
export const getDifferenceSinceDate = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    const differenceTime = today.getTime() - date.getTime();
    // subtracted by 1 day to account for today being an active day
    const days = Math.floor(differenceTime / (1000 * 3600 * 24)) - 1;
    const months = Math.floor(differenceTime / (1000 * 3600));
    const years = Math.floor(differenceTime / (1000 * 3600 * 24 * 365));
    return { days, months, years };
};
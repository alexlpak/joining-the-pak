export const getDifferenceSinceDate = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const differenceTime = today.getTime() - date.getTime();
    const days = Math.ceil(differenceTime / (1000 * 3600 * 24));
    const months = Math.ceil(differenceTime / (1000 * 3600));
    const years = Math.floor(differenceTime / (1000 * 3600 * 24 * 365));
    return { days, months, years };
};
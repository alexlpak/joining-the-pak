export const getDifferenceSinceDate = (beforeDate: string, afterDate: string) => {
    const before = new Date(beforeDate);
    const after = new Date(afterDate);
    const differenceTime = after.getTime() - before.getTime();
    const days = Math.floor(differenceTime / (1000 * 3600 * 24));
    const months = Math.floor(differenceTime / ((1000 * 3600 * 24 * 365)/12));
    const years = Math.floor(differenceTime / (1000 * 3600 * 24 * 365));
    return { days, months, years };
};
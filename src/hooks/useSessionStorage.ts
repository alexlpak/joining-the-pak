import { useState, useEffect } from 'react';

export const useSessionStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        const fetchedItem = sessionStorage.getItem(key);
        if (fetchedItem) {
            return JSON.parse(fetchedItem);
        }
        else return defaultValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};
import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, defaultValue: any) => {
    const [value, setValue] = useState(() => {
        const fetchedItem = localStorage.getItem(key);
        if (fetchedItem) {
            return JSON.parse(fetchedItem);
        }
        else return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};
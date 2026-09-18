import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored !== null ? JSON.parse(stored) : initialValue;
    });

    function updateValue(newValue) {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [value, updateValue];
}  
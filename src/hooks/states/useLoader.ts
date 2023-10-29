import { useState } from 'react';

export function useLoader() {
    const [stateLoader, setStateLoader] = useState<boolean>(false);

    const handleToggleLoader = (value: boolean) => {
        setStateLoader(value);
    };

    return {
        stateLoader,
        handleToggleLoader,
    };
}

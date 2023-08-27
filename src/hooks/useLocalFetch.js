import { useEffect, useState } from 'react';

const useLocalFetch = (key) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, JSON.stringify([]));
            setData([]);
        } else {
            const res = JSON.parse(localStorage.getItem(key));
            setData(res);
        }
        setFetchError(null);
        setIsLoading(false);
    }, [key]);

    return { data, fetchError, isLoading };
};

export default useLocalFetch;

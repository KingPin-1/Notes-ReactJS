import { useEffect, useState } from 'react';

const useLocalFetch = (key) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(
                key,
                JSON.stringify([
                    {
                        id: 2,
                        title: '2 Posty 2 Furious 4 me',
                        datetime: 'August 20,2023 6:35:24 PM',
                        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
                    },
                ])
            );
            setData([]);
        } else {
            const res = JSON.parse(localStorage.getItem(key));
            setData(res);
        }
    }, [key]);

    return { data, fetchError, isLoading };
};

export default useLocalFetch;

import { useState, useEffect } from 'react';

export const useApi = (url) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const dataFromDb = await response.json();
                setData(dataFromDb);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [url]);
    return { data }
}
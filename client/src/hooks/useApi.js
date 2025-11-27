import { useState, useEffect } from 'react';

// способ вызова:
// const { data } = useApi('/api/[сслылка на роут в сервере]')
// делает fetch запросы для взятия данных из БД в клиент

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
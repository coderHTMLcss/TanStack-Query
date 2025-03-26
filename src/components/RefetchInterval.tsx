import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchData = async (id: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return response.data;
}
const RefetchInterval = () => {
    const [currentId, setCurrentId] = useState(1);

    const { data, error, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: () => fetchData(currentId),
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentId((prevId) => prevId < 200 ? prevId + 1 : 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default RefetchInterval;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return response.data;
}

const StaleTime = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['todo'],
        queryFn: fetchData,
        staleTime: 5000
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            StaleTime
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default StaleTime;

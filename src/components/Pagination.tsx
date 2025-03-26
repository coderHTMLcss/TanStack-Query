import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const fetchTodo = async (page: number, limit: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);
    return response.data;
}
const Pagination = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPage = 10;

    const { data, error, isLoading } = useQuery({
        queryKey: ['todos', currentPage],
        queryFn: () => fetchTodo(currentPage, totalPage)
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    const handlePrev = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const handleNext = () => setCurrentPage(prevPage => prevPage + 1);

    return (
        <div>
            <h1>Todos</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <div>
                <button
                    className="px-4 py-2 mt-4 rounded bg-purple-400 text-white mr-2"
                    onClick={handlePrev} disabled={currentPage === 1}
                >
                    Privious Page
                </button>
                <button
                    className="px-4 py-2 mt-4 rounded bg-purple-400 text-white"
                    onClick={handleNext}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default Pagination;

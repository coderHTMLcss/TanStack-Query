import React, { useEffect, useState } from "react";

const WithOutTanStackQuery = <T,>() => {
    const [id, setId] = useState<number>(1);
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { signal });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.statusText}`);
                }

                const data = await response.json();

                if (!signal.aborted) {
                    setData(data);
                    setLoading(false);
                }
            } catch (error) {
                if (!signal.aborted && error instanceof Error) {
                    console.log(`Error fetching data: ${error}`);
                    setError(error.message);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [id]);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && <h1>{JSON.stringify(data)}</h1>}
            <button
                className="px-4 py-2 mt-4 rounded bg-purple-400 text-white"
                onClick={() => setId((prevId) => prevId + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default WithOutTanStackQuery;

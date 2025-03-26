import React from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (type: string, id: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/${type}/${id}`);
    return response.data;
};


const FetchFromMultipleEndpoints = () => {
    const [currentTodoId, setCurrentTodoId] = React.useState(1);
    const [currentUserId, setCurrentUserId] = React.useState(1);
    const [currentPostId, setCurrentPostId] = React.useState(1);

    const [todoQuery, userQuery, postQuery] = useQueries({
        queries: [
            { queryKey: ["todo", currentTodoId], queryFn: () => fetchData('todos', currentTodoId) },
            { queryKey: ["user", currentUserId], queryFn: () => fetchData('users', currentUserId) },
            { queryKey: ["post", currentPostId], queryFn: () => fetchData('posts', currentPostId) },
        ],
    });

    return (
        <div>
            <h1>Fetch From Multiple Endpoints</h1>

            <div>
                <h2>Todo</h2>
                {todoQuery.isLoading && <p>Loading...</p>}
                {todoQuery.error && <p>Error: {todoQuery.error.message}</p>}
                {todoQuery.data && <pre>{JSON.stringify(todoQuery.data, null, 2)}</pre>}
                <button
                    className="px-4 py-2 mt-4 rounded bg-purple-400 text-white"
                    onClick={() => setCurrentTodoId((prev) => prev + 1)}
                >
                    Next Todo
                </button>
            </div>

            <div>
                <h2>User</h2>
                {userQuery.isLoading && <p>Loading...</p>}
                {userQuery.error && <p>Error: {userQuery.error.message}</p>}
                {userQuery.data && <pre>{JSON.stringify(userQuery.data, null, 2)}</pre>}
                <button
                    className="px-4 py-2 mt-4 rounded bg-purple-400 text-white"
                    onClick={() => setCurrentUserId((prev) => prev + 1)}
                >
                    Next User
                </button>
            </div>

            <div>
                <h2>Post</h2>
                {postQuery.isLoading && <p>Loading...</p>}
                {postQuery.error && <p>Error: {postQuery.error.message}</p>}
                {postQuery.data && <pre>{JSON.stringify(postQuery.data, null, 2)}</pre>}
                <button
                    className="px-4 py-2 mt-4 rounded bg-purple-400 text-white"
                    onClick={() => setCurrentPostId((prev) => prev + 1)}
                >
                    Next Post
                </button>
            </div>
        </div>
    );
};

export default FetchFromMultipleEndpoints;

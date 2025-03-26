import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { FormEvent } from "react";

interface Todo {
    id?: number;
    title: string;
    completed: boolean;
}

const postTodo = async (newTodo: Todo): Promise<Todo> => {
    const response = await axios.post<Todo>(
        "https://jsonplaceholder.typicode.com/todos",
        newTodo
    );
    return response.data;
};

const MutatingData = () => {
    const queryClient = useQueryClient();
    const [title, setTitle] = React.useState("");

    const { mutate, data, error, isPending, isError, isSuccess } = useMutation({
        mutationFn: postTodo,
        onSuccess: (newTodo) => {
            queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) => [
                ...oldTodos,
                newTodo,
            ]);
            setTitle("");
        },
    });

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title.trim() === "") return;

        mutate({ title, completed: false });
    };

    return (
        <div>
            <h1>Create new Todo</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Title:
                    <input
                        className="border-2 border-gray-600 p-1 rounded mr-2"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter todo's title"
                    />
                </label>
                <button
                    className="px-4 py-2 mt-4 rounded bg-purple-400 text-white"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Adding..." : "Add Todo"}
                </button>
            </form>

            {isError && (
                <p className="text-red-500">Error: {error?.message}</p>
            )}
            {isSuccess && (
                <p className="text-green-500">Todo "{data?.title}" added!</p>
            )}
        </div>
    );
};

export default MutatingData;

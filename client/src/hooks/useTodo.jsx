import { useEffect, useState } from 'react'
import axios from 'axios';

function useTodo() {

    const [ todos, setTodos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const API_BASE_URL = '/api/till';
    
    const fetcTodos = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get(API_BASE_URL);
            console.log("Fetched todos:", response.data);
            setTodos(response.data);

        } catch (error) {
            console.error("Failed to fetch todos:", err);
            setError(`Failed to fetch todos: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetcTodos();
    }, [])

    const addTodo = async (task) => {
        if (!task.trim()) return;

        try {
            const response = await axios.post(API_BASE_URL, {task: task});

            const newTodo = response.data;

            setTodos([...todos, newTodo]);
            setError(null);
            console.log("Added task:", newTodo );
        } catch (err) {
            console.err("Failed to add todo:",err);
            setError(`Failed to add todo: ${err.message}`)
        }
    }

    const removeTodo = async (id) => {

        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);

            setTodos(todos.filter(todo => todo.id !== id));
            setError(null);

        } catch (error) {
            console.error(`Failed to remove todo ${id}:`, err);
            setError(`Failed to remove todo: ${err.message}`);
        }
    }


    const updateTodo = async (id) => {

        const todo = todos.find(todo=> todo.id === id);
        const currentStatus = todo.completed;

        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, {
                completed: !currentStatus
            });
            const updatedTodo = response.data;
            setTodos(todos.map(todo =>
                todo.id === updatedTodo.id ? updatedTodo : todo 
           ));
            setError(null);

            console.log(`Toggled todo with ID: ${id}`, updatedTodo);
        } catch (error) {
            console.error(`Failed to toggle todo ${id}:`, err);
            setError(`Failed to toggle todo: ${err.message}`);

        }

    }

    const editTodo = async (id, editedTask) => {

        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`,{
                task: editedTask
            })

            const updatedTodo = response.data;

            setTodos(todos.map(todo => 
                todo.id === updatedTodo.id ? updatedTodo : todo
            ))

            console.log(`Toggled todo with ID: ${id}`, updatedTodo);

        } catch (error) {
            console.error(`Failed to toggle todo ${id}:`, err);
            setError(`Failed to toggle todo: ${err.message}`);
        }
    }


  return {todos, addTodo, removeTodo, updateTodo, editTodo, isLoading, error}
}

export default useTodo
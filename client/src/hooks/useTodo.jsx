import React, { useEffect, useState } from 'react'
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


    const removeTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        
    }

    

    const toggleTodo = (id) => {
        const newTodos = todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        setTodos(newTodos);

    }

  return {todos, addTodo, removeTodo, toggleTodo, isLoading, error}
}

export default useTodo
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function useTodo() {

    const [ todos, setTodos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    // const fetchTodos = async () => {
    //     try{

    //         setIsLoading(true);
            
    //         const response = await fetch('http://localhost:5000/api/till/' ,{
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type':'application/json'
    //             }
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json().catch(()=>({}));
    //             throw new Error(`HTTP error! status: ${response.status},message: ${errorData.error || 'Unknown error'}`);
    //         }

    //         const data = await response.json();
    //         setTodos(data);
    //         setError(null);

    //     } catch (err) {
    //         console.error("Failed to fetch todos", err);
    //         setError("Failed to load todos.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }


    
    useEffect(() => {
        const getData = async () => {
            try{
                const res = await axios.get('http://localhost:5000/api/till')
                console.log(res);
                
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    }, [])

    const addTodo = (task) => {
        setTodos([... todos, 
            {id: Date.now(), 
             task: task, 
             completed: false}]);
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
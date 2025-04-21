import React from 'react'
import RemoveButton from './removeButton'
import UpdateButton from './UpdateButton'
import Task from './Task'
import EditButton from './EditButton'

function List( { todos, handleRemoveTodo, handleUpdateTodo } ) {

  return (
    <div className='flex flex-col'>
        {
            todos.map( todo => (
            <div key={todo.id} 
                 className='hover:scale-110 ease-in-out duration-500 flex flex-row items-center p-3 m-2 font-pixel10 text-2xl rounded-2xl bg-retro-brown text-retro-bg' >
                <Task task={todo.task} />
                
                <EditButton />
                
                <UpdateButton id={todo.id} isCompleted={todo.completed} handleUpdateTodo={handleUpdateTodo} />
                

                <RemoveButton handleRemoveTodo={handleRemoveTodo} id={todo.id} />
            </div>
        ))
        }
    </div>
      
)
}

export default List
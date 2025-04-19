import React from 'react'

function List( { todos, handleRemoveTodo, handleToggleTodo } ) {

  return (
    <div className='flex flex-col'>
        {
            todos.map( todo => (
            <div key={todo.id} 
                 className='hover:scale-110 ease-in-out duration-500 flex flex-row items-center p-3 m-2 font-pixel10 text-2xl rounded-2xl bg-retro-brown text-retro-bg' >
                <div className='h-15 w-50 text-center flex justify-center items-center'>
                    <p> {todo.task} </p>
                </div>
                

                { todo.completed ? 
                
                <button
                    className='h-15 w-20 rounded-2xl p-3 m-1 bg-retro-blue flex justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-500'
                    onClick={()=>handleToggleTodo(todo.id)}
                >
                    <span className='text-sm'> reset </span>
                </button>
                
                :
                
                <button
                    className='h-15 w-20 rounded-2xl p-3 m-1 bg-retro-red flex justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-500'
                    onClick={()=>handleToggleTodo(todo.id)}
                >
                    <span className='text-sm'> completed? </span>
                </button> }
                

                <button 
                    className='h-15 w-20 rounded-2xl p-3 m-1 bg-retro-red flex justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-500'
                    onClick={()=>handleRemoveTodo(todo.id)}
                > 
                    <span className='text-sm'> remove </span>
                </button>
            </div>
        ))
        }
    </div>
      
)
}

export default List
import React from 'react'

function UpdateButton({ id, isCompleted, handleUpdateTodo}) {
  return (
    <>
        { isCompleted ? 
            <button
                    className='h-15 w-20 rounded-2xl p-3 m-1 bg-retro-blue flex justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-500'
                    onClick={()=>handleUpdateTodo(id)}
                >
                    <span className='text-sm'> reset </span>
                </button> 
            :

            <button
                    className='h-15 w-20 rounded-2xl p-3 m-1 bg-retro-red flex justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-500'
                    onClick={()=>handleUpdateTodo(id)}
                >
                    <span className='text-sm'> completed? </span>
                </button>


        }
    </>
  )
}

export default UpdateButton
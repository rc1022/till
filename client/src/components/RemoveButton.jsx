import React from 'react'

function RemoveButton( {handleRemoveTodo, id} ) {
  return (
    <button 
                    className='h-15 w-20 rounded-2xl p-3 m-1 bg-retro-red flex justify-center items-center cursor-pointer hover:scale-110 ease-in-out duration-500'
                    onClick={()=>handleRemoveTodo(id)}
                > 
                    <span className='text-sm'> remove </span>
                </button>
  )
}

export default RemoveButton
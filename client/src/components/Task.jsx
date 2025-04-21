import React from 'react'

function Task({ task }) {
  return (
    <div className='h-15 w-50 text-center flex justify-center items-center'>
        <p> {task} </p>
    </div>
  )
}

export default Task
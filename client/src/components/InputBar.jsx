import React from 'react'

function InputBar({ task, setTask, handleAddTask }) {
  return (
    <div className='flex flex-row m-5 items-center font-pixel25 text-retro-bg'>
        <input
            value={task}
            placeholder='input you task'
            className='bg-retro-mustard w-70 h-10 placeholder:text-center p-3 rounded-xl text-center'
            onChange={(e) => setTask(e.target.value) }
        />
        <button
            className='bg-retro-mustard w-20 h-10 m-5 rounded-xl'
            onClick={()=> {
              handleAddTask(task);
              setTask("");
            }}
        >add</button>
    </div>
  )
}

export default InputBar
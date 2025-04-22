import { useState } from "react"

function EditModal({ handleEditing, handleEditTodo, editingTodo }) {

    const [ newTask, setNewTask ] = useState('')

  return (
    <div className='fixed w-full h-full  bg-black/25 flex justify-center items-center font-pixel25 text-retro-bg' >
        <div className='w-70 h-70 bg-retro-brown rounded-2xl'>

            <div className='flex flex-row justify-center p-1 m-1'>
                <h3 className='w-60 text-center text-2xl g'>editing ...</h3>
                <button className='bg-retro-red rounded-xl h-4 w-4 cursor-pointer'
                        onClick={()=>handleEditing()}></button>
            </div>

            <div className='h-2/5 flex flex-col justify-center items-center'>
                <div className='w-4/5 h-25 text-lg text-center border-2 border-dashed border-retro-bg flex justify-center items-center'> 
                   {editingTodo.task}
                </div>
            </div>

            <div className='flex flex-col h-2/5 justify-center items-center mt-2'>
                    <input className='bg-retro-mustard rounded-2xl text-center p-4 mb-1'
                            type='text' placeholder='What you gonna change?'
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />


                <button className='bg-retro-mustard rounded-2xl w-20 p-0.5 m-2 cursor-pointer hover:scale-110 ease-in-out duration-500'
                        onClick={() => {
                                    handleEditTodo(editingTodo.id, newTask)
                                    setNewTask('')
                                    handleEditing()
                                }}
                >submit</button>
            </div>
        </div>
    </div>
  )
}

export default EditModal
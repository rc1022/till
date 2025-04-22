import { useState } from "react";
import InputBar from "./components/InputBar"
import List from "./components/List"
import Title from "./components/Title"
import useTodo from "./hooks/useTodo";
import NoTaskDisplay from "./components/NoTaskDisplay";
import EditModal from "./components/EditModal";


function App() {

  const { todos, addTodo, removeTodo, updateTodo, editTodo } = useTodo();

  const [ task, setTask ] = useState("");

  const [ isEditing, setIsEditing ] = useState(false);
  
  const [ editingTodo, setEditingTodo ] = useState({});

  const incompletedTasks = todos.filter(todo => !todo.completed);
  const completedTasks = todos.filter(todo => todo.completed);


  const handleEditing = ( todo ) => {
     if (todo) {
      setEditingTodo(todo);
      setIsEditing(!isEditing);
     } else {
      setIsEditing(false);
      setEditingTodo(null);
     }
  }

  return (
    <div className='flex flex-col justify-center items-center bg-retro-bg w-screen h-screen '>
      <Title />
      <InputBar task={task} setTask={setTask} handleAddTask={addTodo}/>


      <div className="flex flex-row flex-wrap">

        <div>
          <h1 className="border-3 border-dashed text-center font-pixel15 text-3xl text-retro-red p-1 m-2">to-dos</h1>
          {
            incompletedTasks.length > 0 ?
          <List 
            todos={incompletedTasks} 
            handleRemoveTodo={removeTodo} 
            handleUpdateTodo={updateTodo}
            handleEditing={handleEditing}  
            /> :
          <NoTaskDisplay />
          }
        </div>

        <div>
          <h1 className="border-3 border-dashed text-center font-pixel15 text-3xl text-retro-blue p-1 m-2">completed</h1>
        {
          completedTasks.length > 0 ?
        <List 
          todos={completedTasks} 
          handleRemoveTodo={removeTodo} 
          handleUpdateTodo={updateTodo}
          handleEditing={handleEditing} 
          /> :
        <NoTaskDisplay />
        }
        </div>
      </div>

      {isEditing && 
      <EditModal 
        handleEditing={handleEditing}
        handleEditTodo={editTodo}
        editingTodo={editingTodo}
        />}
    
    </div>
     
  )
}

export default App

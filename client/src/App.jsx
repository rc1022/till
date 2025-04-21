import { useState } from "react";
import InputBar from "./components/InputBar"
import List from "./components/List"
import Title from "./components/Title"
import useTodo from "./hooks/useTodo";
import NoTaskDisplay from "./components/NoTaskDisplay";


function App() {

  const { todos, addTodo, removeTodo, updateTodo } = useTodo();

  const [ task, setTask ] = useState("");

  const incompletedTasks = todos.filter(todo => !todo.completed);
  const completedTasks = todos.filter(todo => todo.completed);


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
            todos={incompletedTasks} handleRemoveTodo={removeTodo} handleUpdateTodo={updateTodo}/> :
          <NoTaskDisplay />
          }
        </div>

        <div>
          <h1 className="border-3 border-dashed text-center font-pixel15 text-3xl text-retro-blue p-1 m-2">completed</h1>
        {
          completedTasks.length > 0 ?
        <List 
          todos={completedTasks} handleRemoveTodo={removeTodo} handleUpdateTodo={updateTodo}/> :
        <NoTaskDisplay />
        }
        </div>
      </div>
    
    </div>
     
  )
}

export default App

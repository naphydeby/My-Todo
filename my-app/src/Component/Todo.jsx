import { useState } from "react";

function Todo(){
    const [tasks, setTasks]= useState([]);
    const[task, setTask]= useState("");
    
    const addTasks=()=>{
        if(task !== ""){
            setTasks([...tasks,task])
        setTask("")
        console.log(tasks)
        }
    }
    const deleteTask=(index)=>{
        const updateList =[...tasks];
        console.log("Automatic")

updateList.splice(index, 1)
   setTasks(updateList)
    }
    return(
        <div className={`flex flex-col items-center md:full  lg:w-full`}>
        
            <h1 className={`text-4xl m-10 font-bold text-blue-300`}>My Todo App</h1>
        
        <div className={`p-6 `}>
            <input className={`bg-white shadow-lg w-[150px] md:w-[450px] lg:w-[450px] rounded-md m-3 p-3 focus:outline-none`} type="text"
            value={task}
            onChange={(e)=>{
                setTask(e.target.value);
            }}
            placeholder="Create a new todo"  />
            <button onClick={addTasks} className={`bg-blue-300 text-white m-3 p-3 rounded-md font-bold hover:bg-blue-400`}>Add Task</button>
        </div>
        <div>
           {tasks?.length > 0 ? (
            <ul>
                {
                    tasks.map((task, index)=>(
                        <div className={`flex bg-white shadow-lg md:w-[450px] lg:w-[450px] m-4 py-4 pl-12 rounded-md pr-4` } key={index}>
                            <li className={`self-center font-semibold pr-10 mr-6 grow`}>{task}</li>
                            <button onClick={ ()=>deleteTask(index)} className={`bg-blue-300 text-white p-2 m-1 rounded-md font-bold hover:bg-blue-400`}>Delete</button>
                        </div>
                    ))
                }
            </ul>
           ):(
            <div>
            <p>No task found</p>
            </div>
           ) } 
        </div>
        </div>
    )
    
}
export default Todo;
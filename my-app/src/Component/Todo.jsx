import React, { useState, useEffect } from "react";
import { fetchTasks, addTasks, updateTasks, deleteTasks } from "../api";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        // console.log('Fetched tasks:', data); 
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getTasks();
  }, []);

  const handleAddTasks = async () => {
    if (newTask.trim()) {
      const task = { title: newTask, completed: false, };
      try {
        const response = await addTasks(task);
        console.log('Added task:', response); 
        setTasks([...tasks, response]);
        setNewTask("");
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleUpdateTasks = async (id, updatedTask) => {
    try {
      const response = await updateTasks(id, updatedTask);
      console.log('Updated task:', response); 
      setTasks(tasks.map((task) => (task.id === id ? response : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTasks = async (id) => {
    try {
      await deleteTasks(id);
      console.log(`Deleted task with ID ${id}`); 
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  const handleEditChange = (e) => {
    setEditingTaskTitle(e.target.value);
  };

  const saveEditingTask = async (id) => {
    const updatedTask = { ...tasks.find((task) => task.id === id), title: editingTaskTitle };
    await handleUpdateTasks(id, updatedTask);
    setEditingTaskId(null);
    setEditingTaskTitle("");
  };

  return (
    <div className="flex flex-col items-center md:full lg:w-full">
      <h1 className="text-4xl m-10 font-bold text-blue-300">My Todo App</h1>
      <div className="p-6">
        <input
          className="bg-white shadow-lg w-[150px] md:w-[450px] lg:w-[450px] rounded-md m-3 p-3 focus:outline-none"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Create a new todo"
        />
        <button
          onClick={handleAddTasks}
          className="bg-blue-300 text-white m-3 p-3 rounded-md font-bold hover:bg-blue-400"
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <div
                className="flex bg-white shadow-lg md:w-[450px] lg:w-[450px] m-4 py-4 pl-12 rounded-md pr-4"
                key={task.id}
              >
                {editingTaskId === task.id ? (
                  <>
                    <input
                      className="self-center focus:outline-none font-semibold pr-10 mr-6 grow"
                      type="text"
                      value={editingTaskTitle}
                      onChange={handleEditChange}
                    />
                    <button
                      onClick={() => saveEditingTask(task.id)}
                      className="bg-green-300 text-white p-2 m-1 rounded-md font-bold hover:bg-green-400"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <li className="self-center font-semibold pr-10 mr-6 grow">
                      {task.title}
                    </li>
                    {/* <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleUpdateTasks(task.id, { ...task, completed: !task.completed })}
                    /> */}
                    <button
                      onClick={() => startEditing(task)}
                      className="bg-pink-300 text-white p-2 m-1 rounded-md font-bold hover:bg-pink-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTasks(task.id)}
                      className="bg-blue-300 text-white p-2 m-1 rounded-md font-bold hover:bg-blue-400"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </ul>
        ) : (
          <div>
            <p>No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;

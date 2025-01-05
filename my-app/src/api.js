
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/todos';


export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${URL}?_limit=10`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};


export const addTasks = async (task) => {
  try {
    const response = await axios.post(URL, task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};


export const updateTasks = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};


export const deleteTasks = async (id) => {
  try {
    await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};







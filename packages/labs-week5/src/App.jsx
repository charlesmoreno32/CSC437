import { useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import TodoItem from "./components/TodoItem.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Modal from "./components/Modal.jsx";
import { GroceryPanel } from "./components/GroceryPanel.jsx";

function App({ tasks }) {
  const INITIAL_TASK_LIST = tasks;
  const [taskList, setTaskList] = useState(INITIAL_TASK_LIST);
  const [taskID, setTaskID] = useState(3);
  const [isNewTaskFormModalOpen, setNewTaskFormModalOpen] = useState(false);

  function addTask(task_name) {
    const newTask = { id: "todo-" + taskID, name: task_name, completed: false };
    setTaskList([...taskList, newTask]);
    setTaskID(taskID + 1);
    setNewTaskFormModalOpen(false);
  }

  function handleTaskCompletedToggle(id) {
    const updatedTasks = taskList.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  }

  function handleTaskDeletion(id) {
    const newTasks = taskList.filter((task) => task.id !== id);
    setTaskList(newTasks);
  }

  function handleNewTaskFormCloseRequested() {
    setNewTaskFormModalOpen(false);
  }

  function handleNewTask() {
    setNewTaskFormModalOpen(true);
  }

  return (
    <main className="m-4">
      {/* Tailwind: margin level 4 on all sides */}
      <button
        aria-label="Add New Task"
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-transform cursor-pointer border rounded-md text-white px-1.5 py-1.5 mt-auto mb-auto"
        onClick={handleNewTask}
      >
        New Task
      </button>
      <Modal
        headerLabel="New Task"
        isOpen={isNewTaskFormModalOpen}
        onCloseRequested={handleNewTaskFormCloseRequested}
      >
        <AddTaskForm onNewTask={addTask} />
      </Modal>
      <section>
        <h1 className="text-xl font-bold">To do</h1>
        <ul>
          {taskList?.map((task) => (
            <TodoItem
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              onCompletionToggle={handleTaskCompletedToggle}
              onTaskDeletion={handleTaskDeletion}
            />
          ))}
        </ul>
      </section>
      <div className="mb-5"></div>
      <GroceryPanel onNewTask={addTask} />
    </main>
  );
}

export default App;

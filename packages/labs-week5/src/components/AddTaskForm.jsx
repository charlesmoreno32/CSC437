import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function AddTaskForm({ onNewTask }) {
  const [taskName, setTaskName] = useState("");

  function handleInputChange(event) {
    setTaskName(event.target.value);
  }

  function handleClick() {
    onNewTask(taskName);
    setTaskName("");
  }

  return (
    <div className="flex items-center justify-center">
      <input
        placeholder="New task name"
        className="border rounded-md px-2 py-2"
        value={taskName}
        onChange={handleInputChange}
      />
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-transform cursor-pointer border rounded-md text-white px-1.5 py-1.5 ml-2 mt-auto mb-auto"
      >
        Add task
      </button>
    </div>
  );
}

export default AddTaskForm;

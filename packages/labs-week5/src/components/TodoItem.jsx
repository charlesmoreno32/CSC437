import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoItem({ id, completed, name, onCompletionToggle, onTaskDeletion }) {
  return (
    <li>
      <label>
        <input
          id={id}
          type="checkbox"
          defaultChecked={completed}
          onChange={() => onCompletionToggle(id)}
        />
        <span className="ml-1">{name}</span>
      </label>
      <button onClick={() => onTaskDeletion(id)}>
        <FontAwesomeIcon
          title="Delete Task"
          className="text-gray-500 ml-5 transition-transform cursor-pointer"
          icon={faTrash}
        />
      </button>
    </li>
  );
}

export default TodoItem;

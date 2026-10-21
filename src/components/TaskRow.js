import React from "react";
import { Link } from "react-router-dom";

const TaskRow = ({ task, updateTaskStatus, deleteTask }) => {
  return (
    <tr>
      <td>
        <Link to={`/tasks/${task.id}`} className={task.done ? "done-text" : ""}>
          {task.title}
        </Link>
      </td>
      <td>{task.assignee}</td>
      <td>{task.priority}</td>
      <td>{task.hours}</td>
      <td>{task.done ? "Đã xong" : "Đang làm"}</td>
      <td>
        <button
          onClick={() => updateTaskStatus(task.id)}
          style={{ marginRight: "10px" }}
        >
          {task.done ? "Làm lại" : "Hoàn thành"}
        </button>
        <button onClick={() => deleteTask(task.id)}>Xóa</button>
      </td>
    </tr>
  );
};

export default TaskRow;

import React from "react";
import TaskRow from "./TaskRow";

const TaskTable = ({ filteredTasks, updateTaskStatus, deleteTask }) => {
  if (filteredTasks.length === 0) {
    return <p>Không có dữ liệu</p>;
  }

  return (
    <>
      <p>Tìm thấy {filteredTasks.length} công việc</p>
      <table>
        <thead>
          <tr>
            <th>Công việc</th>
            <th>Người làm</th>
            <th>Ưu tiên</th>
            <th>Số giờ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TaskTable;

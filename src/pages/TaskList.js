import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import TaskTable from "../components/TaskTable";

const TaskList = ({ tasks, loading, error, updateTaskStatus, deleteTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("Tất cả");

  if (loading) {
    return <div className="empty-state">Đang tải công việc...</div>;
  }

  if (error) {
    return <div className="empty-state">Không tải được dữ liệu.</div>;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesName = (task.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "Tất cả" || task.priority === priorityFilter;

    return matchesName && matchesPriority;
  });

  return (
    <div>
      <div className="page-heading">
        <div>
          <div className="eyebrow">QUẢN LÝ DỰ ÁN</div>
          <h1>Danh sách công việc</h1>
          <p className="subtitle">
            Theo dõi và cập nhật tiến độ của từng nhiệm vụ.
          </p>
        </div>

        <Link to="/tasks/new">
          <button>+ Thêm công việc</button>
        </Link>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <TaskTable
        filteredTasks={filteredTasks}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskList;

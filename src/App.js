import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Lifecycle Mounting: Tải dữ liệu từ LocalStorage hoặc API
  useEffect(() => {
    const controller = new AbortController();
    const localData = localStorage.getItem("gk_tasks");

    if (localData) {
      setTasks(JSON.parse(localData));
      setLoading(false);
    } else {
      axios
        .get("/data/tasks.json", { signal: controller.signal })
        .then((res) => {
          setTasks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            setError(err);
            setLoading(false);
          }
        });
    }
    return () => controller.abort();
  }, []);

  // Lifecycle Updating: Lưu dữ liệu vào LocalStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("gk_tasks", JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (newTask) => {
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const taskWithId = { ...newTask, id: newId, done: false };
    setTasks([...tasks, taskWithId]);
    navigate("/tasks", { replace: true });
  };

  const updateTaskStatus = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<Home tasks={tasks} loading={loading} error={error} />}
        />
        <Route
          path="tasks"
          element={
            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          }
        />
        <Route path="tasks/new" element={<AddTask addTask={addTask} />} />
        <Route
          path="tasks/:id"
          element={<TaskDetail tasks={tasks} loading={loading} error={error} />}
        />
      </Route>
    </Routes>
  );
};

export default App;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRIORITIES } from "../data";

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("Trung bình");
  const [hours, setHours] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !assignee.trim() || !hours) {
      setErrorMsg("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const numHours = Number(hours);

    if (!Number.isInteger(numHours) || numHours < 1 || numHours > 40) {
      setErrorMsg("Số giờ phải là số nguyên từ 1 đến 40.");
      return;
    }

    setErrorMsg("");

    addTask({
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      hours: numHours,
    });
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <div className="eyebrow">NHIỆM VỤ MỚI</div>
          <h1>Thêm công việc</h1>
          <p className="subtitle">Nhập thông tin để tạo nhiệm vụ cho nhóm.</p>
        </div>
      </div>

      <section className="content-card form-card">
        <div className="card-heading">
          <h3>Thông tin công việc</h3>
        </div>

        {errorMsg && (
          <div className="form-error" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title">Tên công việc *</label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Thiết kế giao diện"
              />
            </div>

            <div className="form-group">
              <label htmlFor="assignee">Người phụ trách *</label>
              <input
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Tên thành viên"
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Mức độ ưu tiên</label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="hours">Thời gian dự kiến (1–40 giờ) *</label>
              <input
                id="hours"
                type="number"
                min="1"
                max="40"
                step="1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Ví dụ: 4"
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/tasks">
              <button type="button" className="btn-secondary">
                Hủy
              </button>
            </Link>

            <button type="submit">Tạo công việc →</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTask;

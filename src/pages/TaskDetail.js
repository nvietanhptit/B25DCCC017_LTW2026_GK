import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import WorkTimer from "../components/WorkTimer";

const TaskDetail = ({ tasks, loading, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (loading) {
    return <div className="empty-state">Đang tải công việc...</div>;
  }

  if (error) {
    return <div className="empty-state">Không tải được dữ liệu.</div>;
  }

  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="content-card empty-state">
        <h2>Không tìm thấy công việc</h2>
        <Link to="/tasks">Quay lại danh sách</Link>
      </div>
    );
  }

  const priorityClass =
    task.priority === "Cao" ? "high" : task.priority === "Thấp" ? "low" : "";

  return (
    <div>
      <div className="page-heading">
        <div>
          <div className="eyebrow">CHI TIẾT NHIỆM VỤ</div>
          <h1>{task.title}</h1>
          <p className="subtitle">
            Thông tin và trạng thái công việc hiện tại.
          </p>
        </div>

        <button className="btn-secondary" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>
      </div>

      <section className="content-card">
        <div className="card-heading">
          <h3>Thông tin công việc</h3>

          <span className={`status-pill ${task.done ? "" : "pending"}`}>
            {task.done ? "Đã hoàn thành" : "Đang thực hiện"}
          </span>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <div className="detail-label">Tên công việc</div>
            <div className="detail-value">{task.title}</div>
          </div>

          <div className="detail-item">
            <div className="detail-label">Người phụ trách</div>
            <div className="detail-value">
              {task.assignee || "Chưa phân công"}
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-label">Mức độ ưu tiên</div>
            <div className="detail-value">
              <span className={`priority-pill ${priorityClass}`}>
                {task.priority}
              </span>
            </div>
          </div>

          <div className="detail-item">
            <div className="detail-label">Thời gian dự kiến</div>
            <div className="detail-value">{task.hours} giờ</div>
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 11,
            background: "#f3f7ff",
          }}
        >
          <strong style={{ color: "#174ea6" }}>Bộ đếm thời gian</strong>
          <WorkTimer />
        </div>
      </section>
    </div>
  );
};

export default TaskDetail;

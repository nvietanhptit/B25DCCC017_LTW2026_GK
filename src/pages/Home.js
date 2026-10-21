import React from "react";
import { Link } from "react-router-dom";

export default function Home({ tasks, loading, error }) {
  if (loading) {
    return <div className="empty-state">Đang tải công việc...</div>;
  }

  if (error) {
    return <div className="empty-state">Không thể tải dữ liệu.</div>;
  }

  const total = tasks.length;
  const completed = tasks.filter((task) => task.done).length;
  const pending = total - completed;

  const remainingHours = tasks.reduce(
    (sum, task) => sum + (!task.done ? Number(task.hours || 0) : 0),
    0,
  );

  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <section className="hero-panel">
        <div className="eyebrow">Không gian làm việc của bạn</div>

        <h1>
          Làm việc thông minh hơn,
          <br />
          hoàn thành nhiều hơn.
        </h1>

        <p>
          Theo dõi tiến độ, phân chia nhiệm vụ và phối hợp cùng nhóm hiệu quả.
        </p>

        <div className="hero-meta">
          <span>✦ {total} công việc</span>
          <span>◷ Còn {remainingHours} giờ</span>
        </div>
      </section>

      <div className="page-heading">
        <div>
          <div className="eyebrow">Tổng quan</div>
          <h1>Bảng điều khiển</h1>
          <p className="subtitle">Theo dõi tình hình công việc của nhóm.</p>
        </div>

        <Link to="/tasks/new">
          <button>+ Tạo công việc</button>
        </Link>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Tổng công việc</span>
            <span className="stat-icon">▤</span>
          </div>
          <div className="stat-value">{total}</div>
          <div className="stat-foot">Tất cả nhiệm vụ</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Đã hoàn thành</span>
            <span className="stat-icon">✓</span>
          </div>
          <div className="stat-value">{completed}</div>
          <div className="stat-foot">{progress}% tiến độ tổng thể</div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Chưa hoàn thành</span>
            <span className="stat-icon">◷</span>
          </div>
          <div className="stat-value">{pending}</div>
          <div className="stat-foot">{remainingHours} giờ còn lại</div>
        </div>
      </section>

      <section className="content-card">
        <div className="card-heading">
          <h3>Công việc gần đây</h3>
          <Link to="/tasks">Xem tất cả →</Link>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">Chưa có công việc nào.</div>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div className="task-summary-row" key={task.id}>
              <div>
                <Link
                  className={`task-summary-title ${
                    task.done ? "done-text" : ""
                  }`}
                  to={`/tasks/${task.id}`}
                >
                  {task.title}
                </Link>

                <div className="task-summary-meta">
                  {task.assignee || "Chưa phân công"}
                  {" · "}
                  {task.hours} giờ
                </div>
              </div>

              <span className={`status-pill ${task.done ? "" : "pending"}`}>
                {task.done ? "Đã hoàn thành" : "Đang làm"}
              </span>
            </div>
          ))
        )}
      </section>
    </>
  );
}

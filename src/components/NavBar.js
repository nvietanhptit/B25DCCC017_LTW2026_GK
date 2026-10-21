import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="topbar">
      <NavLink to="/" end className="brand">
        <span className="brand-mark">✓</span>
        <span>TaskFlow</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" end>
          Trang chủ
        </NavLink>

        <NavLink to="/tasks">Công việc</NavLink>

        <NavLink
          to="/tasks/new"
          className={({ isActive }) =>
            isActive ? "active nav-add" : "nav-add"
          }
        >
          + Thêm công việc
        </NavLink>
      </nav>
    </header>
  );
}

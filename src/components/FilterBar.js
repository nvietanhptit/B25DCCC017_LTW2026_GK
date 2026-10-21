import React from "react";
import { PRIORITIES } from "../data";

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div style={{ marginBottom: "15px", display: "flex", gap: "20px" }}>
      <div>
        <label htmlFor="search">Tìm kiếm: </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tên công việc..."
        />
      </div>
      <div>
        <label htmlFor="priorityFilter">Mức ưu tiên: </label>
        <select
          id="priorityFilter"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

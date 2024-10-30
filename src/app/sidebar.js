// Sidebar.js
import React from 'react';
import { FaHome, FaUsers, FaBriefcase, FaCog } from 'react-icons/fa';

function Sidebar({ onTabChange }) {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li onClick={() => onTabChange("All Applicants")}>
          <FaUsers className="icon" /> Applicants
        </li>
        <li onClick={() => onTabChange("Engineering")}>
          <FaBriefcase className="icon" /> Engineering
        </li>
        <li onClick={() => onTabChange("Settings")}>
          <FaCog className="icon" /> Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

"use client";

import React, { useState } from 'react';
import './styles.css';

function DetailsModal({ applicant, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Applicant Details</h2>
        <p><strong>Name:</strong> {applicant.name}</p>
        <p><strong>Role:</strong> {applicant.role}</p>
        <p><strong>Stage:</strong> {applicant.stage}</p>
        <p><strong>Skills:</strong> {applicant.skills}</p>
        <p><strong>Employment:</strong> {applicant.employment}</p>
        <p><strong>Source:</strong> {applicant.source}</p>
        <p><strong>Location:</strong> {applicant.location}</p>
        <p><strong>Email:</strong> {applicant.email}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function EditModal({ applicant, onClose, onSave }) {
  const [editedApplicant, setEditedApplicant] = useState(applicant);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedApplicant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedApplicant);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Applicant</h2>
        <label>
          Name:
          <input name="name" value={editedApplicant.name} onChange={handleChange} />
        </label>
        <label>
          Role:
          <input name="role" value={editedApplicant.role} onChange={handleChange} />
        </label>
        <label>
          Stage:
          <input name="stage" value={editedApplicant.stage} onChange={handleChange} />
        </label>
        <label>
          Skills:
          <input name="skills" value={editedApplicant.skills} onChange={handleChange} />
        </label>
        <label>
          Employment:
          <input name="employment" value={editedApplicant.employment} onChange={handleChange} />
        </label>
        <label>
          Source:
          <input name="source" value={editedApplicant.source} onChange={handleChange} />
        </label>
        <label>
          Location:
          <input name="location" value={editedApplicant.location} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input name="email" value={editedApplicant.email} onChange={handleChange} />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function ApplicantTracker() {
  const [selectedTab, setSelectedTab] = useState("All Applicants");
  const [applicants, setApplicants] = useState([
    { name: 'Kim Sanders', role: 'Engineering - Front End', stage: 'Screen', skills: 'Front End, Back End', employment: 'Employed', source: 'AngelList', location: 'New York', email: 'kim.sanders@notion.so' },
    { name: 'Carrie Sandoval', role: 'Engineering - Ops', stage: 'Interview', skills: 'Back End, Platform', employment: 'Freelance', source: 'Cold Inbound', location: 'New York', email: 'carriesandoval@notion.so' },
    { name: 'Michael Kim', role: 'Engineering - Lead', stage: 'Lead', skills: 'Front End', employment: 'Looking', source: 'Referral', location: 'New York', email: 'michaelkim@notion.so' },
    { name: 'Alice Johnson', role: 'Marketing', stage: 'Screen', skills: 'Content Creation', employment: 'Freelance', source: 'LinkedIn', location: 'San Francisco', email: 'alice.johnson@notion.so' },
  ]);

  const [viewApplicant, setViewApplicant] = useState(null);
  const [editApplicant, setEditApplicant] = useState(null);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleViewDetails = (applicant) => {
    setViewApplicant(applicant);
  };

  const handleEdit = (applicant) => {
    setEditApplicant(applicant);
  };

  const handleSaveEdit = (updatedApplicant) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.email === updatedApplicant.email ? updatedApplicant : applicant
      )
    );
  };

  const filteredApplicants = applicants.filter((applicant) => {
    if (selectedTab === "All Applicants") return true;
    if (selectedTab === "Engineering") return applicant.role.includes("Engineering");
    if (selectedTab === "Marketing") return applicant.role.includes("Marketing");
    return false;
  });

  return (
    <div className="container">
      <h1>Applicant Tracker</h1>

      {/* Tabs */}
      <div className="tabs">
        <button className={selectedTab === "All Applicants" ? "active" : ""} onClick={() => handleTabClick("All Applicants")}>All Applicants</button>
        <button className={selectedTab === "Engineering" ? "active" : ""} onClick={() => handleTabClick("Engineering")}>Engineering</button>
        <button className={selectedTab === "Marketing" ? "active" : ""} onClick={() => handleTabClick("Marketing")}>Marketing</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Stage</th>
            <th>Skills</th>
            <th>Employment</th>
            <th>Source</th>
            <th>Location</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.name}</td>
              <td>{applicant.role}</td>
              <td>{applicant.stage}</td>
              <td>{applicant.skills}</td>
              <td>{applicant.employment}</td>
              <td>{applicant.source}</td>
              <td>{applicant.location}</td>
              <td>{applicant.email}</td>
              <td>
                <button onClick={() => handleEdit(applicant)}>Edit</button>
                <button onClick={() => handleViewDetails(applicant)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {viewApplicant && <DetailsModal applicant={viewApplicant} onClose={() => setViewApplicant(null)} />}
      {editApplicant && <EditModal applicant={editApplicant} onClose={() => setEditApplicant(null)} onSave={handleSaveEdit} />}
    </div>
  );
}

export default ApplicantTracker;

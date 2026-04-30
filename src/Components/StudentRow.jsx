import React, { useState } from 'react';

const StudentRow = ({ student, index, onUpdateScore, onDelete }) => {
  const [newScore, setNewScore] = useState(student.score);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (newScore >= 0 && newScore <= 100) {
      onUpdateScore(student.id, newScore);
      setIsEditing(false);
    } else {
      alert('Please enter a score between 0 and 100');
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(student.id);
    }
  };

  const getPerformanceLevel = (score) => {
    if (score >= 80) return { label: 'Excellent', class: 'excellent' };
    if (score >= 60) return { label: 'Good', class: 'good' };
    if (score >= 40) return { label: 'Average', class: 'average' };
    return { label: 'Poor', class: 'poor' };
  };

  const performance = getPerformanceLevel(student.score);
  const isPassing = student.score >= 40;

  return (
    <tr className="modern-row">
      <td className="index">{index}</td>
      <td className="student-info">
        <div className="avatar">
          {student.name.charAt(0).toUpperCase()}
        </div>
        <span className="student-name">{student.name}</span>
      </td>
      <td className="score-value">
        <span className="score-badge">{student.score}</span>
      </td>
      <td>
        <div className="performance-indicator">
          <span className={`performance-badge ${performance.class}`}>
            {performance.label}
          </span>
          <span className={`status-dot ${isPassing ? 'pass' : 'fail'}`}>
            {isPassing ? '✓ Pass' : '✗ Fail'}
          </span>
        </div>
      </td>
      <td>
        {!isEditing ? (
          <div className="score-display">
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>
          </div>
        ) : (
          <div className="edit-controls">
            <input
              type="number"
              className="modern-input"
              value={newScore}
              onChange={(e) => setNewScore(Number(e.target.value))}
              min="0"
              max="100"
              autoFocus
            />
            <button className="save-btn" onClick={handleUpdate}>
              💾 Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              ✕
            </button>
          </div>
        )}
      </td>
      <td>
        <button 
          className="delete-btn"
          onClick={handleDelete}
          title="Delete student"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
};

export default StudentRow;
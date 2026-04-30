import React, { useState } from 'react';

const AddStudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a student name');
      return;
    }
    
    const scoreNum = Number(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      alert('Please enter a valid score between 0 and 100');
      return;
    }
    
    onAddStudent(name.trim(), scoreNum);
    setName('');
    setScore('');
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-toast';
    successMsg.textContent = '✅ Student added successfully!';
    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 2000);
  };

  return (
    <div className="form-card">
      <div className="card-header">
        <h3>➕ Add New Student</h3>
        <button 
          className="toggle-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '−' : '+'}
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="modern-form">
          <div className="form-row">
            <div className="form-field">
              <label>Full Name</label>
              <div className="input-icon">
                <span className="icon">👤</span>
                <input
                  type="text"
                  className="form-input-modern"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
            </div>
            
            <div className="form-field">
              <label>Initial Score</label>
              <div className="input-icon">
                <span className="icon">📝</span>
                <input
                  type="number"
                  className="form-input-modern"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="0 - 100"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
          </div>
          
          <button type="submit" className="submit-modern">
            <span>+</span> Add Student
          </button>
        </form>
      )}
      
      <div className="form-footer">
        <p>💡 Tip: Scores above 40 are considered passing</p>
      </div>
    </div>
  );
};

export default AddStudentForm;
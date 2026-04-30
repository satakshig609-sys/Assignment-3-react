import React, { useState } from 'react';
import StudentRow from './Components/StudentRow';
import AddStudentForm from './Components/AddStudentForm';
import './Scoreboard.css';

const App = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Emma Watson', score: 92 },
    { id: 2, name: 'James Rodriguez', score: 45 },
    { id: 3, name: 'Sophia Chen', score: 38 },
    { id: 4, name: 'Liam O\'Connor', score: 78 },
    { id: 5, name: 'Olivia Martinez', score: 29 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const updateScore = (id, newScore) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, score: newScore } : student
    ));
  };

  const addStudent = (name, score) => {
    const newStudent = {
      id: Date.now(),
      name: name,
      score: score,
    };
    setStudents([newStudent, ...students]);
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statistics = {
    total: students.length,
    passed: students.filter(s => s.score >= 40).length,
    failed: students.filter(s => s.score < 40).length,
    average: (students.reduce((sum, s) => sum + s.score, 0) / students.length).toFixed(1)
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">📊</div>
          <h2>ScoreBoard</h2>
        </div>
        
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-info">
              <span className="stat-value">{statistics.total}</span>
              <span className="stat-label">Total Students</span>
            </div>
          </div>
          
          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-value">{statistics.passed}</span>
              <span className="stat-label">Passed</span>
            </div>
          </div>
          
          <div className="stat-card danger">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <span className="stat-value">{statistics.failed}</span>
              <span className="stat-label">Failed</span>
            </div>
          </div>
          
          <div className="stat-card info">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <span className="stat-value">{statistics.average}</span>
              <span className="stat-label">Avg Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <div className="header-title">
            <h1>Student Performance Dashboard</h1>
            <p>Track and manage student scores efficiently</p>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="content-grid">
          {/* Students Table Section */}
          <div className="table-card">
            <div className="card-header">
              <h3>Student Records</h3>
              <span className="record-count">{filteredStudents.length} students</span>
            </div>
            <div className="table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Score</th>
                    <th>Performance</th>
                    <th>Update Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                      <StudentRow
                        key={student.id}
                        student={student}
                        index={index + 1}
                        onUpdateScore={updateScore}
                        onDelete={deleteStudent}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        <div className="empty-message">
                          📭 No students found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Student Form Section */}
          <AddStudentForm onAddStudent={addStudent} />
        </div>
      </div>
    </div>
  );
};

export default App;
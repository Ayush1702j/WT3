import React from 'react';

/**
 * Reusable CoursePreview Component
 * Renders dynamic course metadata based on the selected course in form state
 */
export default function CoursePreview({ course }) {
  if (!course) {
    return (
      <div className="course-preview-card placeholder-card">
        <div className="placeholder-icon">📚</div>
        <h4>No Course Selected Yet</h4>
        <p>Choose an online certification course from the dropdown above to view course syllabus, instructor, duration, and prerequisites.</p>
      </div>
    );
  }

  return (
    <div className="course-preview-card active-card">
      <div className="card-top-meta">
        <span className="badge badge-category">{course.category}</span>
        <span className="badge badge-level">{course.level}</span>
        <span className="rating-pill">⭐ {course.rating}</span>
      </div>

      <h3 className="course-title">{course.title}</h3>

      <div className="course-info-grid">
        <div className="info-item">
          <span className="info-label">Instructor</span>
          <span className="info-val">{course.instructor}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Duration</span>
          <span className="info-val">{course.duration}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Seats Remaining</span>
          <span className={`info-val ${course.seatsLeft <= 5 ? 'scarcity' : ''}`}>
            🔥 {course.seatsLeft} Seats Left
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Standard Fee</span>
          <span className="info-val fee-highlight">₹{course.baseFee.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="highlights-block">
        <span className="highlights-label">Key Curriculum Modules:</span>
        <ul className="highlights-list">
          {course.highlights.map((h, i) => (
            <li key={i}>✓ {h}</li>
          ))}
        </ul>
      </div>

      <div className="prereq-alert">
        <div className="alert-icon">⚠️</div>
        <div className="alert-content">
          <strong>Prerequisites:</strong> {course.prerequisite}
        </div>
      </div>
    </div>
  );
}

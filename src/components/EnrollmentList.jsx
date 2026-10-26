import React from 'react';

/**
 * Reusable EnrollmentList Component
 * Displays real-time array of submitted enrollments stored in React state
 */
export default function EnrollmentList({ enrollments, onDeleteEnrollment, onClearAll }) {
  if (enrollments.length === 0) {
    return (
      <div className="enrollment-list-empty">
        <p>No student enrollments registered in this browser session yet. Submit the form above to add an enrollment!</p>
      </div>
    );
  }

  return (
    <div className="enrollment-history-card">
      <div className="history-header">
        <div>
          <h3 className="history-title">Active Enrolled Students Directory</h3>
          <p className="history-subtitle">In-memory React state synchronized with browser LocalStorage</p>
        </div>
        <button type="button" className="btn-clear-history" onClick={onClearAll}>
          🗑️ Clear Records
        </button>
      </div>

      <div className="table-responsive">
        <table className="enrollment-table">
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>PRN</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((item) => (
              <tr key={item.enrollmentId}>
                <td className="font-mono text-sm">{item.enrollmentId}</td>
                <td><strong>{item.prn}</strong></td>
                <td>{item.fullName}</td>
                <td><span className="badge badge-course">{item.courseTitle}</span></td>
                <td>{item.batchSlot}</td>
                <td className="font-semibold">₹{item.netFee.toLocaleString('en-IN')}</td>
                <td className="text-sm text-muted">{item.timestamp}</td>
                <td>
                  <button
                    type="button"
                    className="btn-delete-row"
                    onClick={() => onDeleteEnrollment(item.enrollmentId)}
                    title="Remove Record"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from 'react';

/**
 * Reusable ConfirmationModal Component
 * Appears upon successful validation and submission
 */
export default function ConfirmationModal({ enrollment, onClose }) {
  if (!enrollment) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="modal-card">
        <div className="modal-header">
          <div className="success-badge-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div>
            <h2 id="modalTitle" className="modal-title">Enrollment Successful!</h2>
            <p className="modal-subtitle">Official Admission Receipt & Seat Confirmation</p>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose} aria-label="Close Modal">
            ×
          </button>
        </div>

        <div className="receipt-content">
          <div className="receipt-banner">
            <span className="banner-label">Enrollment ID</span>
            <span className="banner-id">{enrollment.enrollmentId}</span>
          </div>

          <div className="receipt-grid">
            <div className="receipt-item">
              <span className="r-label">Student Name:</span>
              <span className="r-val">{enrollment.fullName}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">PRN Number:</span>
              <span className="r-val font-mono">{enrollment.prn}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Email Address:</span>
              <span className="r-val">{enrollment.email}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Mobile Contact:</span>
              <span className="r-val">{enrollment.phone}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Enrolled Course:</span>
              <span className="r-val font-semibold">{enrollment.courseTitle}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Batch Slot:</span>
              <span className="r-val">{enrollment.batchSlot}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Academic Year:</span>
              <span className="r-val">{enrollment.academicYear}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Payment Mode:</span>
              <span className="r-val uppercase">{enrollment.paymentMethod} {enrollment.upiId ? `(${enrollment.upiId})` : ''}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Total Amount Paid:</span>
              <span className="r-val fee-pill">₹{enrollment.netFee.toLocaleString('en-IN')}</span>
            </div>
            <div className="receipt-item">
              <span className="r-label">Timestamp:</span>
              <span className="r-val">{enrollment.timestamp}</span>
            </div>
          </div>

          <div className="receipt-footer-note">
            ✓ A copy of the syllabus, schedule, and live classroom links has been simulated for dispatch to <strong>{enrollment.email}</strong>.
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-print" onClick={() => window.print()}>
            🖨️ Print Receipt
          </button>
          <button type="button" className="btn-primary" onClick={onClose}>
            Enroll Another Student
          </button>
        </div>
      </div>
    </div>
  );
}

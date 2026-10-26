import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import FormField from './components/FormField';
import SelectField from './components/SelectField';
import CoursePreview from './components/CoursePreview';
import SummaryCard from './components/SummaryCard';
import ConfirmationModal from './components/ConfirmationModal';
import EnrollmentList from './components/EnrollmentList';
import { COURSES, VALID_COUPONS } from './data/courses';
import { validateField, validateAll } from './utils/validation';
import './styles/App.css';

const INITIAL_FORM_STATE = {
  fullName: '',
  prn: '',
  email: '',
  phone: '',
  courseId: '',
  academicYear: '',
  batchSlot: '',
  paymentMethod: 'upi',
  upiId: '',
  agreePrereq: false,
  agreeTerms: false
};

export default function App() {
  // 1. Controlled Form State
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // 2. Validation & Touched State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 3. Coupon State
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState('');

  // 4. Submission & UI Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnrollment, setSubmittedEnrollment] = useState(null);
  const [toast, setToast] = useState(null);

  // 5. In-Memory Enrollments List with LocalStorage Persistence
  const [enrollments, setEnrollments] = useState(() => {
    try {
      const saved = localStorage.getItem('edupulse_enrollments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load local storage:', e);
    }
    return [
      {
        enrollmentId: 'ENR-2026-9041',
        fullName: 'Ayush',
        prn: '2304362',
        email: 'ayush@mitaoe.ac.in',
        phone: '9823012345',
        courseTitle: 'Full-Stack Web Development (MERN)',
        batchSlot: 'Weekday Evening (6:00 PM - 8:00 PM)',
        academicYear: 'T.Y. B.Tech (Third Year)',
        paymentMethod: 'upi',
        upiId: 'ayush@okhdfcbank',
        netFee: 3250,
        timestamp: '27-10-2026 00:30'
      }
    ];
  });

  // Sync enrollments with LocalStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('edupulse_enrollments', JSON.stringify(enrollments));
    } catch (e) {
      console.error('Failed to save to local storage:', e);
    }
  }, [enrollments]);

  // Find currently selected course object
  const selectedCourse = useMemo(() => {
    return COURSES.find((c) => c.id === formData.courseId) || null;
  }, [formData.courseId]);

  // Price calculations based on selected course and applied coupon
  const pricing = useMemo(() => {
    const base = selectedCourse ? selectedCourse.baseFee : 0;
    let discount = 0;
    if (appliedCoupon && base > 0) {
      discount = Math.round((base * appliedCoupon.discountPercent) / 100);
    }
    const net = Math.max(0, base - discount);
    return { baseFee: base, discountAmount: discount, netFee: net };
  }, [selectedCourse, appliedCoupon]);

  // Real-Time Form Validation Effect: Checks entire form whenever formData changes
  useEffect(() => {
    const currentErrors = validateAll(formData);
    setErrors(currentErrors);
  }, [formData]);

  // Boolean flag to disable submit button
  const isFormValid = useMemo(() => {
    const currentErrors = validateAll(formData);
    return Object.keys(currentErrors).length === 0;
  }, [formData]);

  // Toast auto-dismissal
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Event Handler: Generic Controlled Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextVal = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextVal
    }));

    // If the field was already touched, validate immediately for real-time feedback
    if (touched[name]) {
      const fieldError = validateField(name, nextVal, { ...formData, [name]: nextVal });
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  // Event Handler: Input Blur (Mark field as touched)
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const currentVal = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    const fieldError = validateField(name, currentVal, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Event Handler: Coupon Application
  const handleApplyCoupon = () => {
    setCouponError('');
    setCouponMessage('');
    const code = couponInput.trim().toUpperCase();

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return;
    }

    if (VALID_COUPONS[code]) {
      setAppliedCoupon({
        code: code,
        discountPercent: VALID_COUPONS[code].discountPercent,
        label: VALID_COUPONS[code].label
      });
      setCouponMessage(`Coupon '${code}' applied! You saved ${VALID_COUPONS[code].discountPercent}%.`);
    } else {
      setCouponError(`Invalid coupon code '${code}'. Try 'STUDENT50' or 'EARLYBIRD20'.`);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponMessage('');
    setCouponError('');
  };

  // Event Handler: Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched to display any remaining errors
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setToast({
        type: 'error',
        message: 'Please resolve all highlighted form validation errors before proceeding.'
      });
      // Scroll to the first error
      const firstErrorField = document.querySelector('.has-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate async network submission
    setTimeout(() => {
      const newEnrollment = {
        enrollmentId: 'ENR-2026-' + Math.floor(1000 + Math.random() * 9000),
        fullName: formData.fullName.trim(),
        prn: formData.prn.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        courseId: formData.courseId,
        courseTitle: selectedCourse ? selectedCourse.title : 'Selected Course',
        batchSlot: formData.batchSlot,
        academicYear: formData.academicYear,
        paymentMethod: formData.paymentMethod,
        upiId: formData.upiId.trim(),
        netFee: pricing.netFee,
        timestamp: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setEnrollments((prev) => [newEnrollment, ...prev]);
      setSubmittedEnrollment(newEnrollment);
      setIsSubmitting(false);
      setToast({
        type: 'success',
        message: `Enrollment confirmed! Registered ID: ${newEnrollment.enrollmentId}`
      });

      // Reset form
      setFormData(INITIAL_FORM_STATE);
      setTouched({});
      setErrors({});
      setAppliedCoupon(null);
      setCouponInput('');
      setCouponMessage('');
      setCouponError('');
    }, 800);
  };

  // Reset entire form
  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all form fields?')) {
      setFormData(INITIAL_FORM_STATE);
      setTouched({});
      setErrors({});
      setAppliedCoupon(null);
      setCouponInput('');
      setCouponMessage('');
      setCouponError('');
      setToast({ type: 'info', message: 'Form cleared successfully.' });
    }
  };

  // Delete an enrollment from session
  const handleDeleteEnrollment = (id) => {
    setEnrollments((prev) => prev.filter((item) => item.enrollmentId !== id));
    setToast({ type: 'info', message: `Enrollment record ${id} removed.` });
  };

  const handleClearAllEnrollments = () => {
    if (window.confirm('Clear all enrolled records from this session?')) {
      setEnrollments([]);
      localStorage.removeItem('edupulse_enrollments');
      setToast({ type: 'info', message: 'All enrollment records cleared.' });
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar enrollmentCount={enrollments.length} />

      {/* Real-time Toast Notifications */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`} role="alert">
          <span className="toast-icon">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '⚠️' : 'ℹ️'}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      <main className="main-content">
        <section className="hero-banner">
          <div className="hero-content">
            <span className="hero-pill">Practical No. 3 | ReactJS Form Validation</span>
            <h2 className="hero-heading">Online Course Enrollment Portal</h2>
            <p className="hero-desc">
              Enroll in specialized technical certifications with instant client-side validation, dynamic fee computation, and controlled input handling.
            </p>
          </div>
        </section>

        <div className="enrollment-layout-grid">
          {/* LEFT COLUMN: Registration Form */}
          <div className="form-column">
            <div className="form-card">
              <div className="form-header">
                <h3 className="section-title">Student Enrollment Application</h3>
                <p className="section-subtitle">
                  Fields marked with <span className="req-star">*</span> are strictly validated in real-time.
                </p>
              </div>

              <form id="enrollmentForm" onSubmit={handleSubmit} noValidate>
                {/* SECTION: Personal & Academic Credentials */}
                <div className="form-fieldset">
                  <h4 className="fieldset-title">1. Student Credentials</h4>
                  
                  <div className="fields-row-2">
                    <FormField
                      id="fullName"
                      name="fullName"
                      label="Full Name"
                      placeholder="e.g. Ayush Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.fullName}
                      touched={touched.fullName}
                      required={true}
                      helperText="Alphabets and spaces only (min 3 chars)"
                    />

                    <FormField
                      id="prn"
                      name="prn"
                      label="PRN / Roll Number"
                      placeholder="e.g. 2304362"
                      value={formData.prn}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.prn}
                      touched={touched.prn}
                      required={true}
                      helperText="7 to 10 alphanumeric characters"
                    />
                  </div>

                  <div className="fields-row-2">
                    <FormField
                      id="email"
                      name="email"
                      type="email"
                      label="Official Email Address"
                      placeholder="e.g. ayush@mitaoe.ac.in"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      touched={touched.email}
                      required={true}
                      helperText="Official university or personal email"
                    />

                    <FormField
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Mobile Phone Number"
                      placeholder="e.g. 9823012345"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.phone}
                      touched={touched.phone}
                      required={true}
                      helperText="10-digit Indian number starting with 6-9"
                    />
                  </div>

                  <SelectField
                    id="academicYear"
                    name="academicYear"
                    label="Current Academic Year of Study"
                    value={formData.academicYear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.academicYear}
                    touched={touched.academicYear}
                    required={true}
                    options={[
                      { value: 'F.Y. B.Tech (First Year)', label: 'F.Y. B.Tech (First Year)' },
                      { value: 'S.Y. B.Tech (Second Year)', label: 'S.Y. B.Tech (Second Year)' },
                      { value: 'T.Y. B.Tech (Third Year)', label: 'T.Y. B.Tech (Third Year)' },
                      { value: 'Final Year B.Tech', label: 'Final Year B.Tech' },
                      { value: 'Postgraduate / M.Tech', label: 'Postgraduate / M.Tech' }
                    ]}
                  />
                </div>

                {/* SECTION: Course Selection & Schedule */}
                <div className="form-fieldset">
                  <h4 className="fieldset-title">2. Course Selection & Preferences</h4>

                  <SelectField
                    id="courseId"
                    name="courseId"
                    label="Select Certification Program"
                    placeholder="-- Choose from 4 Available Courses --"
                    value={formData.courseId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.courseId}
                    touched={touched.courseId}
                    required={true}
                    options={COURSES.map((c) => ({
                      value: c.id,
                      label: `${c.title} (Fee: ₹${c.baseFee.toLocaleString('en-IN')})`
                    }))}
                  />

                  {/* Course Details Preview Component */}
                  <CoursePreview course={selectedCourse} />

                  <SelectField
                    id="batchSlot"
                    name="batchSlot"
                    label="Preferred Learning Batch / Slot"
                    value={formData.batchSlot}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.batchSlot}
                    touched={touched.batchSlot}
                    required={true}
                    options={[
                      { value: 'Weekday Morning (7:30 AM - 9:30 AM)', label: 'Weekday Morning (7:30 AM - 9:30 AM)' },
                      { value: 'Weekday Evening (6:00 PM - 8:00 PM)', label: 'Weekday Evening (6:00 PM - 8:00 PM)' },
                      { value: 'Weekend Intensive (Sat & Sun 10:00 AM - 2:00 PM)', label: 'Weekend Intensive (Sat & Sun 10:00 AM - 2:00 PM)' }
                    ]}
                  />
                </div>

                {/* SECTION: Payment Mode & Billing */}
                <div className="form-fieldset">
                  <h4 className="fieldset-title">3. Payment Mode & Billing</h4>

                  <div className="radio-group-container">
                    <label className="form-label">Payment Method <span className="req-star">*</span></label>
                    <div className="radio-options">
                      <label className={`radio-card ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === 'upi'}
                          onChange={handleChange}
                        />
                        <span className="radio-label">
                          <strong>UPI Transfer</strong> (Google Pay, PhonePe, Paytm)
                        </span>
                      </label>

                      <label className={`radio-card ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={formData.paymentMethod === 'netbanking'}
                          onChange={handleChange}
                        />
                        <span className="radio-label">
                          <strong>Net Banking / Debit Card</strong> (All Major Banks)
                        </span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'upi' && (
                    <FormField
                      id="upiId"
                      name="upiId"
                      label="Virtual Payment Address (UPI ID)"
                      placeholder="e.g. 9823012345@paytm or ayush@okhdfcbank"
                      value={formData.upiId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.upiId}
                      touched={touched.upiId}
                      required={true}
                      helperText="Must match standard UPI handle pattern (username@bank)"
                    />
                  )}
                </div>

                {/* SECTION: Prerequisite Acknowledgment & Terms */}
                <div className="form-fieldset">
                  <h4 className="fieldset-title">4. Compliance & Honor Code</h4>

                  <div className={`checkbox-group ${touched.agreePrereq && errors.agreePrereq ? 'has-error' : ''}`}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        id="agreePrereq"
                        name="agreePrereq"
                        checked={formData.agreePrereq}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.agreePrereq && errors.agreePrereq)}
                      />
                      <span>
                        I acknowledge the prerequisites for the selected course and certify that I possess the fundamental background knowledge. <span className="req-star">*</span>
                      </span>
                    </label>
                    {touched.agreePrereq && errors.agreePrereq && (
                      <p className="error-text" role="alert">{errors.agreePrereq}</p>
                    )}
                  </div>

                  <div className={`checkbox-group ${touched.agreeTerms && errors.agreeTerms ? 'has-error' : ''}`}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={Boolean(touched.agreeTerms && errors.agreeTerms)}
                      />
                      <span>
                        I accept the academic integrity policy, fee structure, and certification criteria of MIT Academy of Engineering. <span className="req-star">*</span>
                      </span>
                    </label>
                    {touched.agreeTerms && errors.agreeTerms && (
                      <p className="error-text" role="alert">{errors.agreeTerms}</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Live Pricing, Coupon & Submit Trigger */}
          <div className="sidebar-column">
            <SummaryCard
              course={selectedCourse}
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              appliedCoupon={appliedCoupon}
              couponMessage={couponMessage}
              couponError={couponError}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              baseFee={pricing.baseFee}
              discountAmount={pricing.discountAmount}
              netFee={pricing.netFee}
              isFormValid={isFormValid}
              isSubmitting={isSubmitting}
              onReset={handleReset}
            />
          </div>
        </div>

        {/* BOTTOM SECTION: Directory of Submitted Enrollments */}
        <EnrollmentList
          enrollments={enrollments}
          onDeleteEnrollment={handleDeleteEnrollment}
          onClearAll={handleClearAllEnrollments}
        />
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal
        enrollment={submittedEnrollment}
        onClose={() => setSubmittedEnrollment(null)}
      />

      <footer className="site-footer">
        <p>
          MIT Academy of Engineering | School of Computer Engineering | Course: Web Technology (2304362L)
        </p>
        <p className="footer-sub">
          Practical No. 3: Client-Side Form Validation Application using ReactJS | Developed by Ayush (PRN: 2304362)
        </p>
      </footer>
    </div>
  );
}

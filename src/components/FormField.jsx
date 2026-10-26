import React from 'react';

/**
 * Reusable Functional FormField Component
 * Demonstrates props destructuring, controlled input handling, and accessible error states
 */
export default function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  placeholder = '',
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  helperText = '',
  autoComplete = 'off',
  disabled = false
}) {
  const isInvalid = Boolean(touched && error);
  const isValid = Boolean(touched && !error && value);

  return (
    <div className={`form-group ${isInvalid ? 'has-error' : ''} ${isValid ? 'has-success' : ''}`}>
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="req-star" aria-hidden="true">*</span>}
      </label>

      <div className="input-wrapper">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className="form-control"
        />

        {/* Real-time Status Icon */}
        <div className="status-icon" aria-hidden="true">
          {isInvalid && (
            <svg className="icon-error" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          {isValid && (
            <svg className="icon-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          )}
        </div>
      </div>

      {/* Inline Real-time Error Feedback */}
      {isInvalid && (
        <p id={`${id}-error`} className="error-text" role="alert">
          {error}
        </p>
      )}

      {/* Neutral Helper Text */}
      {!isInvalid && helperText && (
        <small id={`${id}-helper`} className="helper-text">
          {helperText}
        </small>
      )}
    </div>
  );
}

import React from 'react';

/**
 * Reusable Functional SelectField Component
 */
export default function SelectField({
  id,
  name,
  label,
  value,
  options = [],
  placeholder = '-- Select an Option --',
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  helperText = ''
}) {
  const isInvalid = Boolean(touched && error);
  const isValid = Boolean(touched && !error && value);

  return (
    <div className={`form-group ${isInvalid ? 'has-error' : ''} ${isValid ? 'has-success' : ''}`}>
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="req-star" aria-hidden="true">*</span>}
      </label>

      <div className="input-wrapper select-wrapper">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          className="form-control form-select"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {isInvalid && (
        <p id={`${id}-error`} className="error-text" role="alert">
          {error}
        </p>
      )}

      {!isInvalid && helperText && (
        <small id={`${id}-helper`} className="helper-text">
          {helperText}
        </small>
      )}
    </div>
  );
}

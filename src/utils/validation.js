/**
 * Client-Side Validation Utilities for EduPulse Course Enrollment Form
 */

export const validateField = (name, value, allValues = {}) => {
  switch (name) {
    case 'fullName': {
      const val = (value || '').trim();
      if (!val) return 'Full Name is required.';
      if (!/^[A-Za-z\s]{3,50}$/.test(val)) {
        return 'Full Name must contain only alphabets and spaces (3 to 50 characters).';
      }
      return '';
    }

    case 'prn': {
      const val = (value || '').trim();
      if (!val) return 'PRN / Roll Number is required.';
      if (!/^[A-Za-z0-9]{7,10}$/.test(val)) {
        return 'PRN must be 7 to 10 alphanumeric characters (e.g., 2304362).';
      }
      return '';
    }

    case 'email': {
      const val = (value || '').trim();
      if (!val) return 'Email address is required.';
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(val)) {
        return 'Please enter a valid email address (e.g., student@mitaoe.ac.in).';
      }
      return '';
    }

    case 'phone': {
      const val = (value || '').trim();
      if (!val) return 'Mobile phone number is required.';
      if (!/^[6-9]\d{9}$/.test(val)) {
        return 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
      }
      return '';
    }

    case 'courseId': {
      if (!value) return 'Please select an online certification course.';
      return '';
    }

    case 'academicYear': {
      if (!value) return 'Please select your current academic year of study.';
      return '';
    }

    case 'batchSlot': {
      if (!value) return 'Please select a preferred learning batch / time slot.';
      return '';
    }

    case 'paymentMethod': {
      if (!value) return 'Please select a payment mode.';
      return '';
    }

    case 'upiId': {
      if (allValues.paymentMethod === 'upi') {
        const val = (value || '').trim();
        if (!val) return 'UPI ID is required for UPI payment.';
        const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        if (!upiRegex.test(val)) {
          return 'Enter a valid UPI Virtual Payment Address (e.g., user@okhdfcbank or 9876543210@paytm).';
        }
      }
      return '';
    }

    case 'agreePrereq': {
      if (!value) {
        return 'You must acknowledge the technical course prerequisites.';
      }
      return '';
    }

    case 'agreeTerms': {
      if (!value) {
        return 'You must agree to the academic integrity terms & refund policy.';
      }
      return '';
    }

    default:
      return '';
  }
};

/**
 * Validates the full form dataset and returns an object of errors
 */
export const validateAll = (values) => {
  const errors = {};
  const fields = [
    'fullName',
    'prn',
    'email',
    'phone',
    'courseId',
    'academicYear',
    'batchSlot',
    'paymentMethod',
    'upiId',
    'agreePrereq',
    'agreeTerms'
  ];

  fields.forEach((field) => {
    const error = validateField(field, values[field], values);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

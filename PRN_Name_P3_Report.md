# Practical No. 3 Lab Report: Front-End JavaScript Frameworks (ReactJS)
## Course: Web Technology (2304362L) | T.Y. B.Tech | AY 2025-26
### School of Computer Engineering | MIT Academy of Engineering, Pune

---

# Practical No. 3: Client-Side Form Validation Application using ReactJS
## Topic: Online Course Enrollment Portal with Dynamic Fee Quotation

| Field | Details |
| :--- | :--- |
| **Student Name** | Ayush |
| **PRN / Roll No.** | 2304362 |
| **Division / Batch** | T.Y. B.Tech Computer Engineering (Batch B) |
| **Practical No.** | Practical No. 3: Front-End JavaScript Frameworks: ReactJS |
| **Course Outcome** | CO2: ReactJS Component Architecture, Hooks & Form Validation |
| **Lab Hours / Marks** | 8 Hours / 10 Marks |
| **Date of Submission**| 27-10-2026 |
| **Live Deployed URL** | `http://localhost:8081/course-enrollment/` (or Vercel / Netlify) |
| **GitHub Repository** | `https://github.com/Ayush/wt-react-course-enrollment` |

---

## 1. Aim and Problem Statement

### 1.1 Aim
To design, develop, and deploy a responsive, accessible ReactJS web application that demonstrates real-time client-side form validation, controlled inputs using React hooks (`useState`, `useEffect`, `useMemo`), modular functional components with props, dynamic fee calculation, and disabled submission states until all validation criteria are satisfied.

### 1.2 Problem Statement in Own Words
Online education portals require robust, responsive client-side form validation to ensure data accuracy, prevent invalid enrollment submissions, and give immediate feedback to applicants before processing fee payments. The objectives implemented are:
1. **Modular Functional Components with Props**: Decomposing the user interface into reusable functional components (`<Navbar />`, `<FormField />`, `<SelectField />`, `<CoursePreview />`, `<SummaryCard />`, `<EnrollmentList />`, `<ConfirmationModal />`).
2. **Controlled Inputs & State Management**: Managing all form inputs as single sources of truth using React state hooks (`useState`) without uncontrolled DOM manipulation.
3. **Real-Time Input Validation**: Enforcing 8+ multi-tier validation rules on input change and blur events (alphabet regex for names, PRN length, RFC email standard, 10-digit mobile, course selection, UPI VPA format, and terms checkboxes).
4. **Conditional Submission Control**: Calculating whole-form validity dynamically and keeping the Submit button strictly disabled with visual cues until every validation check passes.
5. **Dynamic Fee & Coupon Computation**: Recalculating base fees, scholarship discounts (e.g. `STUDENT50`), and net payable amounts via `useMemo` and `useEffect`.
6. **Deployment Readiness**: Compiling production-optimized assets with Vite (`base: './'`) for zero-configuration hosting on Netlify, Vercel, GitHub Pages, or local Apache Tomcat.

---

## 2. Design and System Architecture

### 2.1 Component Structure and Data Flow

```
+-----------------------------------------------------------------------------------------+
|                                    Root <App /> Component                               |
|  State: formData, errors, touched, appliedCoupon, enrollments[], isSubmitting, toast   |
+-----------------------------------------------------------------------------------------+
       |                                      |                                    |
       v (props: enrollmentCount)             v (props: formData, errors, handlers)v (props)
+-------------------------+    +------------------------------------------+  +-------------------+
|       <Navbar />        |    |            Enrollment Form Card          |  |  <SummaryCard />  |
| - University branding   |    |  +------------------------------------+  |  | - Live fee quote  |
| - CO2 outcome badge     |    |  | <FormField /> (Name, PRN, Email)  |  |  | - Coupon validator|
| - Live enrollment count |    |  | <SelectField /> (Year, Course)     |  |  | - Disabled submit |
+-------------------------+    |  | <CoursePreview /> (Curriculum)     |  |  | - Reset trigger   |
                               |  | <SelectField /> (Batch Slot)       |  |  +-------------------+
                               |  | <FormField /> (UPI VPA Handle)     |  |
                               |  | Compliance Checkboxes              |  |
                               |  +------------------------------------+  |
                               +------------------------------------------+
                                                    |
                                (On Valid Submit & State Append)
                                                    v
+-----------------------------------------------------------------------------------------+
|                   <ConfirmationModal />  &  <EnrollmentList /> Directory                 |
|  - Modal displays official admission receipt with generated Enrollment ID               |
|  - Directory renders interactive session table synced with browser LocalStorage         |
+-----------------------------------------------------------------------------------------+
```

### 2.2 Technologies Used

| Technology | Version | Role in Project |
| :--- | :--- | :--- |
| **ReactJS** | 18.3.1 | Core UI library; functional components, hooks (`useState`, `useEffect`, `useMemo`), controlled inputs. |
| **Vite** | 5.3.4 | Fast build tool and dev server with instant HMR and optimized minified production bundling. |
| **CSS3** | Modern Standards | Responsive 2-column grid, validation states (`.has-error`, `.has-success`), shake animations, print media rules. |
| **Web Storage API** | Native | `localStorage` persistence for saving submitted student records across reloads. |
| **Apache Tomcat** | 10.0.23 | Production web server hosting the deployed build on port 8081 (`http://localhost:8081/course-enrollment/`). |

---

## 3. Implementation and Key Code Explanation

### 3.1 Controlled Form State & Validation Hooks (`src/App.jsx`)
```jsx
// 1. Controlled Form Data State
const [formData, setFormData] = useState({
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
});

// 2. Real-Time Validation Effect: Runs whenever formData changes
useEffect(() => {
  const currentErrors = validateAll(formData);
  setErrors(currentErrors);
}, [formData]);

// 3. Dynamic Form Validity Calculation (Enables/Disables Submit Button)
const isFormValid = useMemo(() => {
  const currentErrors = validateAll(formData);
  return Object.keys(currentErrors).length === 0;
}, [formData]);
```

### 3.2 Reusable `<FormField />` Component (`src/components/FormField.jsx`)
```jsx
export default function FormField({
  id, name, label, type = 'text', value, placeholder,
  onChange, onBlur, error, touched, required = false, helperText
}) {
  const isInvalid = Boolean(touched && error);
  const isValid = Boolean(touched && !error && value);

  return (
    <div className={`form-group ${isInvalid ? 'has-error' : ''} ${isValid ? 'has-success' : ''}`}>
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="req-star">*</span>}
      </label>
      <div className="input-wrapper">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={isInvalid}
          className="form-control"
          placeholder={placeholder}
        />
        <div className="status-icon">
          {isInvalid && <span className="icon-error">⚠️</span>}
          {isValid && <span className="icon-success">✓</span>}
        </div>
      </div>
      {isInvalid && <p className="error-text" role="alert">{error}</p>}
    </div>
  );
}
```

---

## 4. Testing Matrix

| Test ID | Scenario Tested | Input Given | Expected Behavior | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Valid Form Submission | All fields valid, course selected | Submit button activates; admission receipt modal displayed | **PASS** |
| **TC-02** | Submit Disabled on Incomplete Form | Blank form or missing required fields | Submit button is disabled (`cursor: not-allowed`) | **PASS** |
| **TC-03** | Name with Numbers | `Ayush123` | Error: "Alphabets and spaces only (3 to 50 chars)" | **PASS** |
| **TC-04** | Invalid PRN Format | `12345` (5 digits) | Error: "PRN must be 7 to 10 alphanumeric characters" | **PASS** |
| **TC-05** | Invalid Email Syntax | `ayush_gmail.com` | Error: "Enter a valid email address" | **PASS** |
| **TC-06** | Invalid Mobile Number | `5551234567` (starts with 5) | Error: "Enter valid 10-digit mobile starting with 6-9" | **PASS** |
| **TC-07** | Coupon Code Application | `STUDENT50` | Applies 50% discount immediately; net tuition updated | **PASS** |
| **TC-08** | LocalStorage Persistence | Submitting & refreshing page | Student record reloads dynamically from `localStorage` | **PASS** |

---

## 5. Output Screenshots

### Screenshot 1: Application Portal Overview & Valid State with Enabled Submit
```
+-----------------------------------------------------------------------------------------+
|          [ Attach Screenshot 1: Valid State Overview with Enabled Submit Button ]       |
+-----------------------------------------------------------------------------------------+
```

### Screenshot 2: Real-Time Input Validation Error Messages (Invalid Cases)
```
+-----------------------------------------------------------------------------------------+
|          [ Attach Screenshot 2: Real-Time Validation Feedback & Error Messages ]        |
+-----------------------------------------------------------------------------------------+
```

### Screenshot 3: Official Confirmation Modal Receipt & Live Deployment
```
+-----------------------------------------------------------------------------------------+
|          [ Attach Screenshot 3: Admission Receipt Modal & Live Deployed URL ]            |
+-----------------------------------------------------------------------------------------+
```

---

## 6. Conclusion & Learnings

### 6.1 What Works
- Complete client-side course enrollment workflow developed using contemporary React 18 functional components and hooks.
- Real-time input validation on both `onChange` and `onBlur` events with instantaneous visual feedback (green/red borders and icons).
- Strict submit button disabling ensuring zero invalid submissions can pass through.
- Dynamic pricing computation with coupon code validation (e.g. `STUDENT50` saves 50% on tuition).
- Session persistence using browser `localStorage` with table directory and record deletion capabilities.
- Production build verified and deployed on Apache Tomcat with clean configuration for Vercel, Netlify, and GitHub Pages.

### 6.2 Limitations
- Client-side data persistence is limited to the local browser instance; enterprise production portals require server-side database integration (e.g. Node.js/Express with MongoDB or PostgreSQL).
- Payment simulation is executed via simulated client state rather than a live payment gateway webhook (e.g., Razorpay / Stripe).

### 6.3 What I Learned
- Mastered the difference between controlled vs. uncontrolled form inputs in React.
- Understood how to effectively orchestrate `useState`, `useEffect`, and `useMemo` hooks for high-performance form validation without redundant re-renders.
- Learned to build reusable, accessible UI component wrappers that receive and handle generic props cleanly.
- Gained practical experience deploying modern Vite React builds across Apache Tomcat and cloud platforms.

---

## 7. AI Use Declaration (Mandatory Submission Table)

| Field | Description |
| :--- | :--- |
| **AI tool and prompt used** | **Antigravity AI (Gemini 3.8)**<br>*Prompt:* "Design, develop and deploy an Online Course Enrollment Form using ReactJS functional components and hooks with real-time validation, dynamic fee calculation, and disabled submit button until valid." |
| **One output you checked and how** | Checked the real-time form validity logic (`isFormValid` memo) by inspecting whether typing an invalid character in the email or PRN field immediately toggled the submit button state to disabled and back to active when corrected. |
| **One thing you corrected or rejected, and why** | Corrected the validation behavior so error messages do not aggressively show on fresh, untouched inputs upon initial page load; added a `touched` state map to only display error messages once a user has interacted with or blurred an input field. |

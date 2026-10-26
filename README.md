# Web Technology Practical No. 3: Front-End JavaScript Frameworks (ReactJS)
## Client-Side Form Validation Application: Online Course Enrollment Portal

**Course**: Web Technology (2304362L) | T.Y. B.Tech | AY 2025-26  
**Institution**: MIT Academy of Engineering, Pune (Autonomous Affiliated to SPPU)  
**School**: School of Computer Engineering  
**Student Name**: Ayush | **PRN**: 2304362 | **Batch**: T.Y. B.Tech Computer Engineering (Batch B)  
**Course Outcome**: CO2: Develop front-end web applications using contemporary frameworks and client-side validation  

---

## 🚀 Quick Start Guide

### 1. Run in Development Mode (Vite Dev Server)
```bash
# Navigate to project directory
cd wt_assignment_3_react_enrollment

# Install dependencies (React 18 & Vite)
npm install

# Start development server
npm run dev
```
Open your browser at: `http://localhost:3000` (or the port shown by Vite).

### 2. Build for Production
```bash
npm run build
# Compiles optimized static assets to /dist
```

### 3. Run Locally via Apache Tomcat
The production build is deployed and running on Tomcat at:
```
http://localhost:8081/course-enrollment/
```

---

## 🌐 1-Click Deployment to Vercel / Netlify / GitHub Pages

The project has been configured with `base: './'` in `vite.config.js`, ensuring zero broken asset paths regardless of platform.

### A. Deploy on Vercel (Recommended)
1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/wt-react-course-enrollment.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [vercel.com](https://vercel.com) with GitHub.
3. Click **"Add New Project"** -> Select your repository.
4. Framework Preset: **Vite** (auto-detected).
5. Click **"Deploy"**. You will receive an instant live URL (e.g., `https://wt-react-course-enrollment.vercel.app`).

### B. Deploy on Netlify
1. Log in to [netlify.com](https://www.netlify.com).
2. Click **"Add new site"** -> **"Import an existing project"** -> Connect to GitHub.
3. Build command: `npm run build` | Publish directory: `dist`.
4. Click **"Deploy Site"**.

---

## 🧩 Component Architecture & Props Flow

```
<App />  (Root state: formData, errors, touched, pricing, enrollments)
 │
 ├── <Navbar enrollmentCount={enrollments.length} />
 │
 ├── <FormField id="fullName" value={formData.fullName} error={errors.fullName} onChange={...} />
 ├── <FormField id="prn" value={formData.prn} error={errors.prn} onChange={...} />
 ├── <FormField id="email" value={formData.email} error={errors.email} onChange={...} />
 ├── <FormField id="phone" value={formData.phone} error={errors.phone} onChange={...} />
 ├── <SelectField id="academicYear" value={formData.academicYear} options={...} />
 ├── <SelectField id="courseId" value={formData.courseId} options={...} />
 │
 ├── <CoursePreview course={selectedCourse} />
 │
 ├── <SelectField id="batchSlot" value={formData.batchSlot} options={...} />
 ├── <FormField id="upiId" value={formData.upiId} error={errors.upiId} ... />
 │
 ├── <SummaryCard
 │     course={selectedCourse}
 │     pricing={pricing}
 │     couponInput={couponInput}
 │     isFormValid={isFormValid}
 │     isSubmitting={isSubmitting}
 │     onApplyCoupon={...}
 │   />
 │
 ├── <EnrollmentList enrollments={enrollments} onDeleteEnrollment={...} onClearAll={...} />
 └── <ConfirmationModal enrollment={submittedEnrollment} onClose={...} />
```

---

## 🛡️ Validation Rules Implemented (Real-Time + Controlled Inputs)

1. **Full Name**: Required, alphabets and spaces only (`^[A-Za-z\s]{3,50}$`), min 3 chars.
2. **PRN / Roll No.**: Required, exactly 7–10 alphanumeric characters (`^[A-Za-z0-9]{7,10}$`).
3. **Official Email**: Required, RFC 5322 regex format (`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`).
4. **Mobile Phone**: Required, 10-digit Indian standard starting with 6, 7, 8, or 9 (`^[6-9]\d{9}$`).
5. **Course Selection**: Required, must choose from the 4 technical certification tracks.
6. **Academic Year**: Required dropdown selection.
7. **Batch / Slot**: Required choice (Morning, Evening, Weekend).
8. **Payment Method & UPI Validation**: If UPI is selected, requires valid VPA pattern (`^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$`).
9. **Technical Prerequisites Acknowledgement**: Mandatory checkbox.
10. **Academic Integrity & Terms**: Mandatory checkbox.
11. **Submit Button Disabling**: The submit button remains strictly disabled until every single field passes validation.

---

## 📦 What to Upload on Moodle

1. **Online Text Box**:
   - GitHub Repository Link (e.g. `https://github.com/Ayush/wt-react-course-enrollment`)
   - Deployed Application URL (e.g. `https://wt-react-course-enrollment.vercel.app` or `http://localhost:8081/course-enrollment/`)
2. **Source Code ZIP**: `2304362_Ayush_P3_CourseEnrollment.zip` (Run `python create_submission_zip.py`)
3. **Lab Report PDF**: `2304362_Ayush_P3_Report.pdf` (Print from `PRN_Name_P3_Report.html` or compile `PRN_Name_P3_Report.tex`)

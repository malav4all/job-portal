# Job Application Web App

## 📌 Overview
This is a **full-stack job application web app** where **recruiters** can post jobs, manage applications, and review candidates, while **candidates** can view job listings, apply for jobs, and track their application status.

## 🚀 Features

### ✅ **For Candidates:**
- View all available job listings.
- Apply for jobs by uploading a resume.
- Track application status in the "My Applications" section.

### ✅ **For Recruiters:**
- Create, update, and delete job listings.
- View applications for their posted jobs.
- Change application statuses (Pending, Reviewed, Accepted, Rejected).

### ✅ **General Features:**
- JWT authentication (Login/Register).
- Role-based access control.
- Fully responsive UI using **React.js + Tailwind CSS**.
- Backend powered by **Node.js + Express + MongoDB**.

---

## 🛠️ Tech Stack

### **Frontend:**
- **React.js (Vite + TypeScript)**
- **Tailwind CSS**
- **Redux Toolkit (State Management)**
- **React Router**

### **Backend:**
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Multer (Resume Upload)**

---

## 📥 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/your-repo/job-app.git
 cd job-app
```

### **2️⃣ Backend Setup**
```sh
cd job-app-backend
npm install
```

#### **Environment Variables (`.env` file in `job-app-backend/`)**
```
PORT=5000
MONGO_URI=mongodb+srv://your_mongo_uri
JWT_SECRET=your_secret_key
```

#### **Run Backend**
```sh
npm run dev
```

### **3️⃣ Frontend Setup**
```sh
cd job-app-frontend
npm install
```

#### **Run Frontend**
```sh
npm run dev
```

---

## 🔗 API Endpoints (Backend)

### **🔹 Authentication**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Register new user (Recruiter/Candidate) |
| `/auth/login` | POST | Login user & get JWT token |

### **🔹 Jobs**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/jobs` | GET | Get all jobs (Public) |
| `/jobs` | POST | Create job (Recruiter only) |
| `/jobs/:id` | DELETE | Delete job (Recruiter only) |

### **🔹 Applications**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/applications` | POST | Candidate applies for a job |
| `/applications/candidate` | GET | Candidate views their applications |
| `/applications/recruiter` | GET | Recruiter views job applications |
| `/applications/:id/status` | PUT | Recruiter updates application status |

---

## 🔑 User Roles & Access

| Feature | Candidate | Recruiter |
|----------|-----------|------------|
| View Jobs | ✅ | ✅ |
| Apply for Jobs | ✅ | ❌ |
| Track Applications | ✅ | ❌ |
| Post Jobs | ❌ | ✅ |
| Manage Jobs | ❌ | ✅ |
| View Job Applications | ❌ | ✅ |
| Update Application Status | ❌ | ✅ |

---

## 📌 Deployment

### **1️⃣ Deploy Backend (Render/Vercel)**
1. Push the backend code to GitHub.
2. Go to [Render](https://render.com/) and create a new service.
3. Connect GitHub, select the repository, and configure environment variables.
4. Deploy the service and get the backend URL.

### **2️⃣ Deploy Frontend (Vercel/Netlify)**
1. Push the frontend code to GitHub.
2. Go to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) and create a new project.
3. Connect GitHub, select the repository, and deploy.

---

## 📸 Screenshots

#### **🏠 Home Page (Job Listings)**
- Shows all jobs available.
- Candidates can click "Apply Now".

#### **👤 Recruiter Dashboard**
- Create and manage job postings.
- View candidate applications.

#### **📄 Candidate Dashboard**
- Shows jobs they applied for.
- Displays application statuses.

---

## 🚀 Future Improvements
- Resume Parsing with AI.
- Email notifications for application status changes.
- Filters and search for job listings.

---

## 💡 Conclusion
🎉 Congratulations! You have successfully set up a **fully functional job application system** with **React, Redux, Node.js, and MongoDB**. 🚀

For any issues, feel free to open an issue or contribute to improvements!

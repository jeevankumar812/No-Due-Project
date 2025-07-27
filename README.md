# **No Due System**  

### **👨‍🎓 Project By:**  
**K Jeevan Kumar**  
**Final Year, Alva's Institute of Engineering & Technology**  

---

## **📌 Overview**  
The **No Due System** is a web-based application that digitalizes the traditional no-due clearance process for students. Students can upload their assignments for various subjects, and faculty can review and approve them online. Once all subjects are approved, the system automatically generates a **No Due Certificate** in PDF format.  

This project ensures:  
✅ Paperless workflow  
✅ Real-time status tracking  
✅ Automated certificate generation  

---

## **🛠️ Tech Stack**  

### **Frontend**  
- **React.js (with Vite)** – ⚡ Fast & responsive UI  
- **Tailwind CSS** – 🎨 Modern styling  
- **Framer Motion** – ✨ Smooth animations  

### **Backend**  
- **Node.js with Express** – 🔥 Server-side APIs  
- **MongoDB** – 📦 Database for storing students, faculty, and assignment details  
- **Mongoose** – 📑 ORM for MongoDB  
- **Multer** – 📤 Handling file uploads  
- **PDFKit** – 📝 PDF Certificate generation  

---

## **📂 Project Structure**  

```bash
NoDueManagementSystem/
├── client/                       # React frontend application
│   ├── src/
│   │   ├── pages/                 # All React pages (Student, Faculty, Dashboard, etc.)
│   │   ├── components/            # Reusable UI components (Navbar, Buttons, etc.)
│   │   ├── services/              # API request handlers (Axios calls)
│   │   ├── context/               # React Context API (AuthContext for student & faculty)
│   │   └── assets/screenshots/    # Project screenshots for documentation
│   └── public/                    # Static files (logo, background images, favicon)
│
├── server/                        # Node.js + Express backend
│   ├── models/                    # Mongoose schema models (Student, Faculty)
│   ├── routes/                    # API routes (students.js, faculty.js)
│   ├── controllers/               # Business logic & API handlers
│   ├── middleware/                # Auth middleware & file upload (Multer)
│   ├── uploads/                   # Stores uploaded assignment PDFs & generated certificates
│   ├── utils/                     # Helper functions (e.g., generateCertificate.js)
│   └── config/                    # Database & environment configurations
│
├── .env                           # Environment variables (Mongo URI, JWT secret, etc.)
├── package.json                   # Project metadata & dependencies for both client & server
├── README.md                      # Project documentation (this file)
└── LICENSE                        # License file (optional)
```

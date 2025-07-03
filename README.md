# Technical_Council_Task1_Software

# 🐾 Animal Welfare Portal – NIT Trichy Campus

A full-stack web application dedicated to the **welfare of injured animals in the NIT Trichy campus**, built to help the **Prakruti Club** in providing medication to all injured species within the campus. This platform aims to **streamline the process of reporting, managing, and responding to animal injury cases**, ensuring timely care and attention.

---

## 🌟 Why This Project Matters

In a campus as vast and green as **NIT Trichy**, injured stray animals often go unnoticed or lack timely medical attention. This project is a digital initiative to:

- 🆘 **Enable students and faculty to report injured animals quickly**
- 🏥 **Help Prakruti Club volunteers take timely action**
- 📍 **Allow users to pinpoint their location for faster rescue**
- 🗂️ **Maintain a record of animal cases for future reference and analytics**

---

## ✅ Core Features

### 🐶 Animal Injury Case Management
- Upload detailed reports with image, location, and description
- Edit, delete, or view reports (based on authentication)
- Real-time visibility into reported cases

### 👤 User Profile Section
- Register and login securely
- Edit personal profile information
- View and manage own submitted cases

### 📍 Map Integration
-Implemented a map button which redirects to other site where users can find out exact location
- Providing exact location can help club members for easy tracking and identification of species

### 🔐 Authentication & Authorization
- Secure registration and login using sessions
- Authorization to restrict report editing/deletion to only authorized users

### 📢 User Feedback & Validation
- Flash messages to display success/error feedback
- Frontend validations with Bootstrap and JS
- Backend validations using **Joi** for robust data integrity

---

## 🧑‍💻 Tech Stack

### ⚙ Backend
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Joi** – Backend schema validation
- **express-session** – User session management
- **connect-flash** – Flash message alerts

### 🎨 Frontend
- **HTML5**
- **CSS3 + Bootstrap**
- **JavaScript (Vanilla)**

### 🗺 Location
- **Geolocation API** (Browser-based) for user positioning

---

## 📂 Project Structure
animal-welfare-app/
│
├── public/ # Static files (CSS, JS, images)
├── routes/ # All Express route handlers
├── models/ # Mongoose models (User, AnimalCase)
├── views/ # EJS templates
├── middleware/ # Custom middlewares (auth, validation)
├── app.js # Main app entry
└── .env # Environment variables

---

## 🧪 Validations

- **Frontend**:
  - Required field checks
  - Bootstrap alert feedback
- **Backend**:
  - Joi schema validation for animal report submission and user signup/login
  - Sanitization of user inputs to avoid injection

---
💡 Future Enhancements (Optional)

Admin dashboard with analytics of reported cases

Email notifications for urgent cases--Node mailer

Image compression and optimization

Integration with Google Maps for detailed tracking--Maps api 

Developed with ❤️ at NIT Trichy to support the voiceless lives around us.


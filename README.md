# 🏛️ Nigrani — Smart Real-Time Monitoring & Inspection App

> A robust, full-stack monitoring and compliance platform for the Department of Social Justice & Empowerment (DoSJE)

## 📌 Problem Statement
**SIH 2025 Problem Statement ID:** SIH26095

**Title:** Smart Real-Time Monitoring & Inspection Mobile App

The Ministry of Social Justice and Empowerment (DoSJE) funds numerous Grant-in-Aid (GIA) institutions across India. Currently, the monitoring faces critical challenges:
- Lack of real-time visibility into the functioning of these institutions.
- Potential fake reporting, ghost beneficiaries, and proxy attendance.
- Manual, delayed inspection processes that lack verifiable evidence.
- No centralized system for anomaly detection.

## 💡 Our Solution
Nigrani is an end-to-end full-stack solution featuring a React-based Progressive Web App (PWA) for inspectors and administrators, backed by a robust Node.js/Express API with a MongoDB database. 

It provides real-time geographic tracking, biometric/photographic evidence capture, AI-assisted anomaly detection, and a centralized administrative dashboard, moving the entire compliance ecosystem online.

## 📂 Project Structure

```text
nigrani/
├── frontend/             # React + Vite PWA Application
│   ├── public/           # Static assets, PWA manifest, Service Worker
│   └── src/
│       ├── components/   # Modular React components
│       ├── context/      # Global state (Auth, Theme, Language)
│       ├── services/     # Axios API integrations
│       ├── config/       # Constants, schemes, and translations
│       ├── utils/        # Helpers and export utilities
│       └── App.jsx       # Main routing application
│
├── backend/              # Node.js + Express API
│   └── src/
│       ├── config/       # Database connection
│       ├── controllers/  # Request handlers (Auth, Institutions, Inspections)
│       ├── models/       # Mongoose Schemas
│       ├── routes/       # API route definitions
│       ├── middleware/   # JWT Auth & Error Handling
│       ├── utils/        # Seeding scripts
│       └── server.js     # Express App entry point
```

## ⚙️ Prerequisites
- Node.js (v18 or higher)
- MongoDB (Running locally on default port 27017 or a valid MongoDB URI)

## 🚀 Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install

# Seed the database with initial users and institutions
npm run seed

# Start the development server
npm run dev
```
The backend API will run on `http://localhost:5000`.

### 2. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install

# Start the Vite development server
npm run dev
```
The frontend will run on `http://localhost:5173`.

## 🔐 Demo Credentials (Seeded Data)

- **Admin (PMU Officer):** 
  - Email: `admin@dosje.gov.in`
  - Password: `admin123`
- **Field Inspector:** 
  - Email: `inspector@pmu.gov.in`
  - Password: `insp123`
- **NGO Incharge:** 
  - Email: `ngo@ashray.org`
  - Password: `ngo123`

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements
- **Smart India Hackathon 2026** for providing a platform to innovate for the nation.
- **Ministry of Social Justice & Empowerment (DoSJE)** for the problem statement and continuous guidance.
- **Technocrats Institute of Technology** for the support and resources throughout the development journey.

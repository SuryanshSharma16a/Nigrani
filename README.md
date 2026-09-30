# 🏛️ Nigrani — Smart Real-Time Monitoring & Inspection App

> A robust, full-stack monitoring and compliance platform for the Department of Social Justice & Empowerment (DoSJE)

![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwindcss)

> 🔗 **Live Prototype:** [https://nigrani-sih.vercel.app](https://nigrani-six.vercel.app/)
> 🎬 **Demo Video:** [Watch on YouTube](YOUR_YOUTUBE_LINK)
> 💻 **Source Code:** [GitHub Repository](https://github.com/SuryanshSharma16a/Nigrani)

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

## ✨ Key Features

| # | Feature | Description | Status |
|---|---------|-------------|--------|
| 1 | 🎥 Live CCTV Monitoring | Real-time surveillance grid with offline-feed alerts & snapshot capture | ✅ Working |
| 2 | 📞 Random Video Conferencing | Surprise VC with Project Incharge / Staff / Beneficiaries with call logs | ✅ Working |
| 3 | 🤖 AI Random Assignment | Workload-balanced, geo-clustered, priority-based inspection allocation | ✅ Working |
| 4 | 📍 Geo-Tagged Inspections | GPS-verified reports with photo evidence & offline capture | ✅ Working |
| 5 | ⚠️ AI Anomaly Detection | Detects attendance drops, financial mismatch & declining scores with confidence scores | ✅ Working |
| 6 | 👥 Attendance Analytics | Proxy-attendance detection, 7/30-day trends, heatmap analysis | ✅ Working |
| 7 | 📡 Real-Time Dashboard | Live KPIs, compliance trends & scheme-wise breakdown for officials | ✅ Working |
| 8 | 📴 Offline-First Design | Inspections work without internet; auto-sync queue on reconnect | ✅ Working |
| 9 | 🗺️ Geo-Fencing | Location verification of every inspector visit | ✅ Working |
| 10 | 🔔 Alert Center | Severity-based notifications (Critical / Warning / Info / Success) | ✅ Working |
| 11 | 🌐 Hindi–English Toggle | Multilingual interface for field officers | ✅ Working |
| 12 | 📄 Reports & Export | PDF summaries + one-click CSV data export | ✅ Working |
| 13 | 💬 Beneficiary Feedback | Citizen-centric feedback with rating & complaint resolution | ✅ Working |
| 14 | 🧾 Audit Trail | Complete activity log of every action for transparency | ✅ Working |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Recharts, Lucide Icons |
| State Management | React Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT + bcryptjs, Role-Based Access Control |
| Real-Time (Planned) | WebRTC, WebSockets |
| AI/ML (Planned) | Python, TensorFlow for production anomaly models |

## 📊 Expected Impact

- 🎯 **80% reduction** in fake reporting & proxy functioning via GPS + evidence verification
- 👁️ **Real-time visibility** across all GIA institutions from a single dashboard
- ⚡ **50% faster** inspection cycles through AI-based random assignment
- 🚨 **Early warning system** for compliance failures via anomaly detection
- 🤝 **Citizen-centric delivery** through direct beneficiary feedback loop

## 🔮 Future Scope

- Real CCTV integration via RTSP/ONVIF protocols from installed IP cameras
- Actual WebRTC-based video conferencing with recording
- ML models (TensorFlow/Python) trained on historical inspection data
- Native mobile apps (React Native) with biometric authentication
- Blockchain-based tamper-proof audit trail
- Integration with UMANG app & DigiLocker for beneficiary verification
- Face-recognition based attendance to fully eliminate proxy attendance

## 📱 Screenshots

| Landing Page | Admin Dashboard |
|:---:|:---:|
| <img width="1900" height="866" alt="Screenshot 2026-09-30 102924" src="https://github.com/user-attachments/assets/6d71a1e8-46d2-4ddb-9a24-5e5b943a7355" />
 | <img width="1582" height="872" alt="Screenshot 2026-09-30 103149" src="https://github.com/user-attachments/assets/47b24eb5-a40b-4abe-b942-136f396ec9b8" />
|

| Inspector App | CCTV Monitoring |
|:---:|:---:|
| <img width="465" height="780" alt="Screenshot 2026-09-30 103245" src="https://github.com/user-attachments/assets/2578160f-39c3-4eed-a5d2-1fa8aa044742" />
 | <img width="1578" height="868" alt="Screenshot 2026-09-30 103350" src="https://github.com/user-attachments/assets/c9bbeb31-4ac7-4584-9032-908b5f8f6870" />
 |

## 👥 Team — Team Drishti

| Name | Role |
|------|------|
| Suryansh Sharma | Team Lead & Backend |
| Sonam Kumari | Research & Documentation |
| Dev Meena | Frontend Development |
| Ishita Sahu | AI/ML & Analytics |
| Suhani Soni | UI/UX & Testing |
| Anshul | DevOps & Deployment |

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

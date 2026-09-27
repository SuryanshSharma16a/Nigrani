const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Institution = require('../models/Institution');
const Inspection = require('../models/Inspection');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const users = [
  { name: "Ananya Rao", email: "admin@dosje.gov.in", password: "admin123", role: "admin", designation: "PMU Officer" },
  { name: "Rohan Verma", email: "inspector@pmu.gov.in", password: "insp123", role: "inspector", designation: "Field Inspector" },
  { name: "Suresh Kumar", email: "ngo@ashray.org", password: "ngo123", role: "ngo", designation: "NGO Incharge" }
];

const institutions = [
  { name: 'Ashray Senior Citizens Home', schemeId: 'SC-01', schemeCode: 'SRC', district: 'Lucknow', state: 'Uttar Pradesh', status: 'compliant', complianceScore: 92, lastInspected: '2026-09-10', capacity: 50, currentInmates: 45, grantAmount: '₹12,50,000', address: '12, Gomti Nagar, Lucknow', coordinates: { lat: 26.8467, lng: 80.9462 } },
  { name: 'Sahara De-Addiction Centre', schemeId: 'DA-01', schemeCode: 'DAC', district: 'Kanpur', state: 'Uttar Pradesh', status: 'flagged', complianceScore: 65, lastInspected: '2026-08-22', capacity: 30, currentInmates: 28, grantAmount: '₹8,00,000', address: '45, Civil Lines, Kanpur', coordinates: { lat: 26.4499, lng: 80.3319 } },
  { name: 'Umeed Special School', schemeId: 'PWD-01', schemeCode: 'PWD', district: 'Varanasi', state: 'Uttar Pradesh', status: 'compliant', complianceScore: 88, lastInspected: '2026-09-15', capacity: 100, currentInmates: 95, grantAmount: '₹25,00,000', address: '78, Lanka, Varanasi', coordinates: { lat: 25.3176, lng: 82.9739 } },
  { name: 'Garima Greh, Sector 12', schemeId: 'TG-01', schemeCode: 'TGW', district: 'Noida', state: 'Uttar Pradesh', status: 'escalated', complianceScore: 42, lastInspected: '2026-07-05', capacity: 20, currentInmates: 12, grantAmount: '₹5,00,000', address: 'Sector 12, Noida', coordinates: { lat: 28.5983, lng: 77.3316 } },
  { name: 'Dr. Ambedkar SC Boys Hostel', schemeId: 'SC-02', schemeCode: 'SCH', district: 'Agra', state: 'Uttar Pradesh', status: 'compliant', complianceScore: 95, lastInspected: '2026-09-20', capacity: 200, currentInmates: 190, grantAmount: '₹50,00,000', address: 'Khandari, Agra', coordinates: { lat: 27.1767, lng: 78.0081 } },
  { name: 'Punarjeevan De-Addiction Centre', schemeId: 'DA-02', schemeCode: 'DAC', district: 'Meerut', state: 'Uttar Pradesh', status: 'flagged', complianceScore: 58, lastInspected: '2026-08-10', capacity: 40, currentInmates: 35, grantAmount: '₹10,00,000', address: 'Saket, Meerut', coordinates: { lat: 28.9845, lng: 77.7064 } },
  { name: 'Jyoti Blind School', schemeId: 'PWD-02', schemeCode: 'PWD', district: 'Allahabad', state: 'Uttar Pradesh', status: 'compliant', complianceScore: 90, lastInspected: '2026-09-05', capacity: 80, currentInmates: 75, grantAmount: '₹20,00,000', address: 'Civil Lines, Allahabad', coordinates: { lat: 25.4358, lng: 81.8463 } },
  { name: 'Navjeevan Old Age Home', schemeId: 'SC-03', schemeCode: 'SRC', district: 'Ghaziabad', state: 'Uttar Pradesh', status: 'compliant', complianceScore: 85, lastInspected: '2026-08-28', capacity: 60, currentInmates: 55, grantAmount: '₹15,00,000', address: 'Raj Nagar, Ghaziabad', coordinates: { lat: 28.6692, lng: 77.4538 } },
  { name: 'Sankalp Rehabilitation Centre', schemeId: 'DA-03', schemeCode: 'DAC', district: 'Aligarh', state: 'Uttar Pradesh', status: 'escalated', complianceScore: 35, lastInspected: '2026-06-15', capacity: 50, currentInmates: 40, grantAmount: '₹12,00,000', address: 'Marris Road, Aligarh', coordinates: { lat: 27.8974, lng: 78.0880 } },
  { name: 'Naya Savera Transgender Home', schemeId: 'TG-02', schemeCode: 'TGW', district: 'Lucknow', state: 'Uttar Pradesh', status: 'compliant', complianceScore: 82, lastInspected: '2026-09-12', capacity: 25, currentInmates: 20, grantAmount: '₹6,00,000', address: 'Alambagh, Lucknow', coordinates: { lat: 26.8152, lng: 80.9022 } },
  { name: 'Babu Jagjivan Ram SC Girls Hostel', schemeId: 'SC-04', schemeCode: 'SCH', district: 'Bareilly', state: 'Uttar Pradesh', status: 'flagged', complianceScore: 68, lastInspected: '2026-08-05', capacity: 150, currentInmates: 140, grantAmount: '₹40,00,000', address: 'Cantonment, Bareilly', coordinates: { lat: 28.3670, lng: 79.4304 } }
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Institution.deleteMany();
    await Inspection.deleteMany();

    const bcrypt = require('bcryptjs');
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      return { ...user, password: hashedPassword };
    }));

    const createdUsers = await User.insertMany(hashedUsers);
    const adminUser = createdUsers[0]._id;
    const inspectorUser = createdUsers[1]._id;

    const createdInstitutions = await Institution.insertMany(institutions);

    const inspections = [
      {
        institutionId: createdInstitutions[0]._id,
        inspectorId: inspectorUser,
        date: '2026-09-10',
        score: 92,
        status: 'Compliant',
        remarks: 'All good, well maintained.',
        location: { lat: 26.8467, lng: 80.9462 }
      },
      {
        institutionId: createdInstitutions[1]._id,
        inspectorId: inspectorUser,
        date: '2026-08-22',
        score: 65,
        status: 'Non-Compliant',
        remarks: 'CCTV not working. Staff missing.',
        location: { lat: 26.4499, lng: 80.3319 }
      }
    ];

    await Inspection.insertMany(inspections);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

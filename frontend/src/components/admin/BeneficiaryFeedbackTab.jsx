import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Star, MessageSquare, CheckCircle, Clock, Filter } from 'lucide-react';

const mockFeedback = [
  { id: 'fb-1', rating: 3, text: 'Khana bahut achha milta hai lekin building mein leakage hai', institution: 'Ashray Senior Citizens Home', date: '2026-09-25', author: 'Anonymous', category: 'Infrastructure', status: 'In Review' },
  { id: 'fb-2', rating: 5, text: 'Staff is very helpful and caring', institution: 'Sahara De-Addiction Centre', date: '2026-09-24', author: 'Ramesh Singh', category: 'Staff Behavior', status: 'Resolved' },
  { id: 'fb-3', rating: 2, text: 'Water supply is irregular, please look into this', institution: 'Dr. Ambedkar SC Boys Hostel', date: '2026-09-22', author: 'Anonymous', category: 'Infrastructure', status: 'Pending' },
  { id: 'fb-4', rating: 4, text: 'Vocational training classes are running on time now.', institution: 'Umeed Special School', date: '2026-09-21', author: 'Priya D.', category: 'Other', status: 'Resolved' },
  { id: 'fb-5', rating: 1, text: 'Washrooms are not clean at all', institution: 'Garima Greh, Sector 12', date: '2026-09-20', author: 'Anonymous', category: 'Cleanliness', status: 'Pending' },
  { id: 'fb-6', rating: 5, text: 'Bhojan ki quality mein kaafi sudhaar hua hai.', institution: 'Punarjeevan De-Addiction Centre', date: '2026-09-18', author: 'Anonymous', category: 'Food Quality', status: 'Resolved' },
  { id: 'fb-7', rating: 3, text: 'Need more medical checkups for inmates.', institution: 'Ashray Senior Citizens Home', date: '2026-09-15', author: 'Suresh', category: 'Other', status: 'In Review' },
  { id: 'fb-8', rating: 4, text: 'Very good environment for children to learn and play.', institution: 'Umeed Special School', date: '2026-09-10', author: 'Meena Sharma', category: 'Staff Behavior', status: 'Resolved' }
];

export const BeneficiaryFeedbackTab = () => {
  const [feedbacks, setFeedbacks] = useState(mockFeedback);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const stats = {
    total: feedbacks.length,
    avgRating: (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1),
    pending: feedbacks.filter(f => f.status === 'Pending').length,
    resolved: feedbacks.filter(f => f.status === 'Resolved').length
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    const matchCat = filterCategory === 'all' || f.category === filterCategory;
    const matchStatus = filterStatus === 'all' || f.status === filterStatus;
    return matchCat && matchStatus;
  });

  const handleMarkResolved = (id) => {
    setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status: 'Resolved' } : f));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Beneficiary Feedback</h2>
        <p className="text-sm text-slate-500 mt-1">Citizen-centric service delivery insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Feedback', value: stats.total, icon: MessageSquare, color: 'text-indigo-600' },
          { label: 'Average Rating', value: `${stats.avgRating} / 5`, icon: Star, color: 'text-yellow-500' },
          { label: 'Pending Complaints', value: stats.pending, icon: Clock, color: 'text-orange-600' },
          { label: 'Resolved This Month', value: stats.resolved, icon: CheckCircle, color: 'text-green-600' }
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 flex flex-col justify-center border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-500">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-white">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Filter className="w-4 h-4" />
            <span className="font-semibold">Filters:</span>
          </div>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Food Quality">Food Quality</option>
            <option value="Staff Behavior">Staff Behavior</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Other">Other</option>
          </select>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Review">In Review</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFeedbacks.map(fb => (
          <Card key={fb.id} className="p-5 bg-white border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < fb.rating ? 'fill-current' : 'text-slate-200'}`} />
                ))}
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                fb.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                fb.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {fb.status}
              </span>
            </div>
            
            <p className="text-slate-800 font-medium mb-4 italic">"{fb.text}"</p>
            
            <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-4">
              <span className="font-semibold text-indigo-600">{fb.institution}</span>
              <span>•</span>
              <span>{fb.date}</span>
              <span>•</span>
              <span className="bg-slate-100 px-1.5 rounded">{fb.author}</span>
              <span>•</span>
              <span className="bg-slate-100 px-1.5 rounded">{fb.category}</span>
            </div>

            {fb.status !== 'Resolved' && (
              <button 
                onClick={() => handleMarkResolved(fb.id)}
                className="w-full py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Mark Resolved
              </button>
            )}
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-xs text-slate-400 font-medium italic">
          This module ensures citizen-centric service delivery as per DoSJE guidelines.
        </p>
      </div>
    </div>
  );
};

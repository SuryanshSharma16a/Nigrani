import React, { useState, useMemo } from 'react';
import { generateSeedActivityLog } from '../../data/activityLog';
import { Card } from '../common/Card';
import { 
  ClipboardList, 
  ShieldAlert, 
  Camera, 
  Video, 
  UserPlus, 
  Activity,
  LogIn,
  AlertCircle,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';

const getRelativeTime = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return `Yesterday`;
  return `${diffInDays} days ago`;
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'inspection_submitted': return <ClipboardList className="w-5 h-5" />;
    case 'escalation': return <ShieldAlert className="w-5 h-5" />;
    case 'flag_changed': return <AlertCircle className="w-5 h-5" />;
    case 'cctv_alert': return <Camera className="w-5 h-5" />;
    case 'vc_call': return <Video className="w-5 h-5" />;
    case 'assignment_created': return <UserPlus className="w-5 h-5" />;
    case 'anomaly_detected': return <Activity className="w-5 h-5" />;
    case 'login': return <LogIn className="w-5 h-5" />;
    default: return <Activity className="w-5 h-5" />;
  }
};

const getSeverityStyles = (severity) => {
  switch (severity) {
    case 'success': return 'bg-green-100 text-green-700 border-green-200 dot-green-500';
    case 'warning': return 'bg-orange-100 text-orange-700 border-orange-200 dot-orange-500';
    case 'critical': return 'bg-red-100 text-red-700 border-red-200 dot-red-500';
    case 'info':
    default: return 'bg-blue-100 text-blue-700 border-blue-200 dot-blue-500';
  }
};

export const ActivityLogTab = () => {
  const [logs] = useState(() => generateSeedActivityLog());
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchType = filterType === 'all' || log.type === filterType;
      const matchSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
      const matchSearch = log.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSeverity && matchSearch;
    });
  }, [logs, filterType, filterSeverity, searchQuery]);

  const stats = useMemo(() => {
    return {
      totalToday: logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length,
      criticalThisWeek: logs.filter(l => l.severity === 'critical').length,
      inspectionsThisWeek: logs.filter(l => l.type === 'inspection_submitted').length,
      systemAlerts: logs.filter(l => l.actorRole === 'system').length
    };
  }, [logs]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Activity Log</h2>
        <p className="text-sm text-slate-500 mt-1">Real-time trail of all actions and automated system events.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Activities Today', value: stats.totalToday, color: 'text-indigo-600' },
          { label: 'Critical Alerts', value: stats.criticalThisWeek, color: 'text-red-600' },
          { label: 'Inspections Logged', value: stats.inspectionsThisWeek, color: 'text-green-600' },
          { label: 'System Alerts', value: stats.systemAlerts, color: 'text-orange-600' }
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 flex flex-col justify-center border-slate-100">
            <span className="text-sm font-medium text-slate-500 mb-1">{stat.label}</span>
            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
          </Card>
        ))}
      </div>

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search activity, user, or institution..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg w-full sm:w-auto">
              <Filter className="w-4 h-4" />
              <span>Type:</span>
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent border-none focus:outline-none font-semibold text-slate-900 cursor-pointer w-full"
              >
                <option value="all">All Types</option>
                <option value="inspection_submitted">Inspections</option>
                <option value="escalation">Escalations</option>
                <option value="cctv_alert">CCTV Alerts</option>
                <option value="anomaly_detected">AI Anomalies</option>
                <option value="vc_call">VC Calls</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg w-full sm:w-auto">
              <span>Severity:</span>
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-transparent border-none focus:outline-none font-semibold text-slate-900 cursor-pointer w-full"
              >
                <option value="all">All</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
                <option value="success">Success</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Timeline List */}
      <Card className="p-6">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900">No activities found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="relative border-l border-slate-200 ml-4 space-y-8 pb-4">
            {filteredLogs.slice(0, visibleCount).map((log) => {
              const severityClass = getSeverityStyles(log.severity);
              const isSystem = log.actorRole === 'system';
              const dotColor = severityClass.split(' ').find(c => c.startsWith('dot-'))?.replace('dot-', 'bg-');
              const iconColors = severityClass.split(' ').slice(0, 2).join(' ');
              
              return (
                <div key={log.id} className="relative pl-8">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white ${dotColor}`} />
                  
                  {/* Content Card */}
                  <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 ${iconColors}`}>
                          {getTypeIcon(log.type)}
                        </div>
                        <div>
                          <p className="text-sm text-slate-900 font-medium leading-snug">
                            {log.description}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-semibold text-indigo-600 hover:underline cursor-pointer">
                              {log.institutionName}
                            </span>
                            <span className="text-slate-300 hidden sm:inline">•</span>
                            <div className="flex items-center gap-1 mt-1 sm:mt-0">
                              <span className="text-slate-600">{log.actor}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${isSystem ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                                {log.actorRole}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-slate-400 whitespace-nowrap shrink-0 mt-2 sm:mt-0">
                        {getRelativeTime(log.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {visibleCount < filteredLogs.length && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 5)}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <ChevronDown className="w-4 h-4" />
              Load More
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

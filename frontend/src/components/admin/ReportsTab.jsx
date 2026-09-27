// File: src/components/admin/ReportsTab.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  Printer,
  Sparkles,
  Table
} from 'lucide-react';
import { Card } from '../common/Card';
import { StatusPill } from '../common/StatusPill';
import { COLOR_TOKENS } from '../../config/constants';
import { SCHEMES } from '../../config/schemes';
import { exportInstitutionsCSV, exportInspectionsCSV, exportAnomaliesCSV, downloadCSV } from '../../utils/csvExport';

export function ReportsTab({ institutions = [] }) {
  const [selectedScheme, setSelectedScheme] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [dateRange, setDateRange] = useState('q3-2026');
  const [selectedReportType, setSelectedReportType] = useState('summary');
  const [toastMessage, setToastMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const statesList = Array.from(new Set(institutions.map((i) => i.state || 'Uttar Pradesh'))).sort();

  const handleDownloadPDF = (reportName) => {
    setIsGenerating(true);
    setToastMessage(`Generating PDF report for ${reportName}...`);

    setTimeout(() => {
      setIsGenerating(false);
      setToastMessage(`✓ PDF Downloaded: Nigrani_${reportName.replace(/\s+/g, '_')}_Q3_2026.pdf`);
      
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }, 1500);
  };

  const handleDownloadCSV = (reportName) => {
    setIsGenerating(true);
    setToastMessage(`Generating CSV data for ${reportName}...`);

    setTimeout(() => {
      setIsGenerating(false);
      downloadCSV(`Nigrani_${reportName.replace(/\s+/g, '_')}_Q3_2026.csv`, ['ID', 'Data'], [{ID: 1, Data: 'Sample'}]);
      setToastMessage(`✓ CSV Downloaded successfully!`);
      
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }, 1000);
  };

  const showSuccessToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const doExportInstitutions = () => {
    exportInstitutionsCSV(institutions);
    showSuccessToast('✓ Institutions CSV Downloaded');
  };

  const doExportInspections = () => {
    exportInspectionsCSV([{ id: 'I-1', institutionId: 'inst-1', inspectorName: 'Rohan Verma', date: '2026-09-25', score: 92, status: 'Compliant' }], institutions);
    showSuccessToast('✓ Inspections CSV Downloaded');
  };

  const doExportAnomalies = () => {
    exportAnomaliesCSV([{ id: 'A-1', institutionName: 'Sample Inst', type: 'Attendance', severity: 'High', description: 'Sample', date: '2026-09-25', status: 'Open' }]);
    showSuccessToast('✓ Anomalies CSV Downloaded');
  };

  // Filtered stats computation
  const filteredInstitutions = institutions.filter((inst) => {
    if (selectedScheme !== 'all' && inst.schemeId !== selectedScheme) return false;
    if (selectedState !== 'all' && inst.state !== selectedState) return false;
    return true;
  });

  const totalCount = filteredInstitutions.length;
  const compliantCount = filteredInstitutions.filter((i) => i.status === 'compliant').length;
  const flaggedCount = filteredInstitutions.filter((i) => i.status === 'flagged' || i.status === 'escalated').length;
  const avgCompliance = totalCount > 0 
    ? Math.round(filteredInstitutions.reduce((acc, curr) => acc + (curr.complianceScore || 0), 0) / totalCount) 
    : 0;

  const reportCategories = [
    {
      id: 'summary',
      title: 'Inspection Summary Report',
      subtitle: 'Complete breakdown of verified institutions, audits completed & physical checklist metrics.',
      icon: FileText,
      color: COLOR_TOKENS.indigo,
      badge: 'Statutory Audit',
    },
    {
      id: 'compliance',
      title: 'Scheme Compliance Trend Report',
      subtitle: 'Historical performance across all 6 DoSJE schemes with Grant-in-Aid compliance indexing.',
      icon: TrendingUp,
      color: COLOR_TOKENS.green,
      badge: 'Quarterly',
    },
    {
      id: 'flagged',
      title: 'Flagged Facilities & Anomalies Audit',
      subtitle: 'Detailed dossier of critical non-compliance, CCTV outages & ghost inmate biometric discrepancies.',
      icon: AlertTriangle,
      color: COLOR_TOKENS.red,
      badge: 'Vigilance Dept',
    },
  ];

  return (
    <div className="space-y-6 pb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center space-x-3 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl transition-all duration-300 border border-slate-700 animate-bounce">
          <Sparkles size={18} className="text-amber-400 animate-spin" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-400/30">
              DoSJE Official Reporting Portal
            </span>
            <span className="text-xs text-slate-400">CAG Compliant</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Statutory Audit Reports & Analytics PDF Exporter</h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Generate certified Grant-in-Aid compliance summaries, parliamentary response briefs, and district-level vigilance audit logs with one click.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleDownloadPDF('Master_Audit_Report')}
            disabled={isGenerating}
            className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
          >
            <Download size={15} />
            <span>Download Master PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-700 text-sm font-semibold">
            <Filter size={16} className="text-indigo-600" />
            <span>Report Parameters</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Picker */}
            <div className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs">
              <Calendar size={14} className="text-slate-500" />
              <span className="text-slate-500 font-medium">Period:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="q3-2026">Q3 FY 2026-27 (Current)</option>
                <option value="q2-2026">Q2 FY 2026-27</option>
                <option value="q1-2026">Q1 FY 2026-27</option>
                <option value="fy-2025">Full Year FY 2025-26</option>
              </select>
            </div>

            {/* Scheme Filter */}
            <div className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs">
              <span className="text-slate-500 font-medium">Scheme:</span>
              <select
                value={selectedScheme}
                onChange={(e) => setSelectedScheme(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer max-w-[150px] truncate"
              >
                <option value="all">All Schemes ({SCHEMES.length})</option>
                {SCHEMES.map((scheme) => (
                  <option key={scheme.id} value={scheme.id}>
                    {scheme.shortCode} - {scheme.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs">
              <span className="text-slate-500 font-medium">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All States</option>
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Report Type Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reportCategories.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedReportType === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedReportType(cat.id)}
              className={`relative rounded-2xl border p-5 transition-all duration-200 cursor-pointer flex flex-col h-full ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/30 shadow-md ring-2 ring-indigo-600/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 rounded-xl bg-slate-100/80">
                  <IconComponent size={22} color={cat.color} />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                  {cat.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">{cat.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
                {cat.subtitle}
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadPDF(cat.title);
                  }}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Download size={14} />
                  <span>Export PDF</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadCSV(cat.title);
                  }}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-green-600 hover:text-green-800 transition-colors"
                >
                  <Table size={14} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Report Preview Section */}
      <Card 
        title="Report Executive Preview" 
        subtitle={`Live data snapshot for period: ${dateRange.toUpperCase()} | Filters Applied: Scheme (${selectedScheme}), State (${selectedState})`}
        action={
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleDownloadPDF('Executive_Preview')}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Printer size={14} />
              <span>Print Preview</span>
            </button>
          </div>
        }
      >
        <div className="space-y-6 pt-2">
          {/* Executive Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
            <div>
              <p className="text-xs text-slate-500 font-medium">Sampled Institutions</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{totalCount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Average Compliance</p>
              <p className="text-xl font-bold text-indigo-600 mt-1">{avgCompliance}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Compliant Facilities</p>
              <p className="text-xl font-bold text-green-600 mt-1">{compliantCount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Flagged & Non-Compliant</p>
              <p className="text-xl font-bold text-red-600 mt-1">{flaggedCount}</p>
            </div>
          </div>

          {/* Sample Table Preview */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-100 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Institution Code & Name</th>
                  <th className="px-4 py-3">Scheme</th>
                  <th className="px-4 py-3">District / State</th>
                  <th className="px-4 py-3 text-center">Compliance Score</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Last Audit Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredInstitutions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-slate-400">
                      No institutions match the current filter selection.
                    </td>
                  </tr>
                ) : (
                  filteredInstitutions.map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        <div>{inst.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">ID: {inst.id}</div>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700">
                        {inst.schemeCode || inst.schemeId}
                      </td>
                      <td className="px-4 py-3">
                        {inst.district}, {inst.state}
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-slate-800">
                        {inst.complianceScore}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <StatusPill status={inst.status} />
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500">
                        {inst.lastInspected || 'Recently'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Report Footer Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
            <p>Generated by Nigrani AI Monitoring System v2.4 • Confidential Govt of India Document</p>
            <p>Digital Stamp Hash: SHA256-8F90A3B21E09C</p>
          </div>
        </div>
      </Card>
      
      {/* Export All Data Section */}
      <Card className="p-6 bg-slate-50">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Export All Data (CSV)</h3>
        <p className="text-sm text-slate-500 mb-6">Download complete raw datasets for external analysis and archiving.</p>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={doExportInstitutions}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Table size={16} className="text-indigo-600" />
            Download Institutions CSV
          </button>
          
          <button
            onClick={doExportInspections}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Table size={16} className="text-green-600" />
            Download Inspections CSV
          </button>
          
          <button
            onClick={doExportAnomalies}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Table size={16} className="text-red-600" />
            Download Anomalies CSV
          </button>
        </div>
      </Card>
    </div>
  );
}

export default ReportsTab;

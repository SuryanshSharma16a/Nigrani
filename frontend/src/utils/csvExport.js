// File: src/utils/csvExport.js

export function generateCSV(headers, rows) {
  const sanitize = (value) => {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const headerRow = headers.join(',');
  const dataRows = rows.map(row => headers.map(header => sanitize(row[header])).join(','));
  
  return [headerRow, ...dataRows].join('\n');
}

export function downloadCSV(filename, headers, rows) {
  const csvStr = generateCSV(headers, rows);
  // Add BOM for Excel compatibility
  const blob = new Blob(['\uFEFF' + csvStr], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportInstitutionsCSV(institutions) {
  const headers = ['ID', 'Name', 'Scheme Code', 'State', 'District', 'Status', 'Compliance Score (%)', 'Last Inspected'];
  const rows = institutions.map(inst => ({
    'ID': inst.id,
    'Name': inst.name,
    'Scheme Code': inst.schemeCode || inst.schemeId,
    'State': inst.state,
    'District': inst.district,
    'Status': inst.status,
    'Compliance Score (%)': inst.complianceScore,
    'Last Inspected': inst.lastInspected || 'N/A'
  }));
  downloadCSV('Nigrani_Institutions.csv', headers, rows);
}

export function exportInspectionsCSV(inspections, institutions = []) {
  const getInstName = (id) => institutions.find(i => i.id === id)?.name || id;
  
  const headers = ['Inspection ID', 'Institution Name', 'Inspector', 'Date', 'Score (%)', 'Status'];
  const rows = inspections.map(ins => ({
    'Inspection ID': ins.id,
    'Institution Name': getInstName(ins.institutionId),
    'Inspector': ins.inspectorName,
    'Date': ins.date,
    'Score (%)': ins.score,
    'Status': ins.status
  }));
  downloadCSV('Nigrani_Inspections.csv', headers, rows);
}

export function exportAnomaliesCSV(anomalies) {
  const headers = ['Anomaly ID', 'Institution Name', 'Type', 'Severity', 'Description', 'Date Detected', 'Status'];
  const rows = anomalies.map(anomaly => ({
    'Anomaly ID': anomaly.id,
    'Institution Name': anomaly.institutionName,
    'Type': anomaly.type,
    'Severity': anomaly.severity,
    'Description': anomaly.description,
    'Date Detected': anomaly.date,
    'Status': anomaly.status
  }));
  downloadCSV('Nigrani_Anomalies.csv', headers, rows);
}

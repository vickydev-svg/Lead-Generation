import React, { useState, useMemo } from 'react';
import { Download, RefreshCw, Trash2, FileText, Share2, Check } from 'lucide-react';

const ExportCenterView = ({ initialExports, onDeleteExport }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [exports, setExports] = useState(initialExports);
  const [syncingId, setSyncingId] = useState(null);

  const filteredExports = useMemo(() => {
    if (activeTab === 'all') return exports;
    return exports.filter(e => e.format.toLowerCase() === activeTab.toLowerCase());
  }, [exports, activeTab]);

  const handleDelete = (id) => {
    if (window.confirm('Delete this export file?')) {
      setExports(exports.filter(e => e.id !== id));
      if (onDeleteExport) onDeleteExport(id);
    }
  };

  const handleSyncCRM = (id, name) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      alert(`Successfully synced "${name}" with HubSpot!`);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Export Center
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Download scraped databases or synchronize compiled lists directly into your CRM.
        </p>
      </div>

      {/* Format Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        gap: '24px'
      }}>
        {['all', 'CSV', 'excel', 'Google Sheets', 'CRM', 'webhook'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 6px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent-color)' : '2px solid transparent',
              color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all var(--transition-fast)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Exports Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Format</th>
              <th>Count</th>
              <th>Created Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExports.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                  No exports found in this category.
                </td>
              </tr>
            ) : (
              filteredExports.map((exp) => (
                <tr key={exp.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={16} style={{ color: 'var(--accent-hover)' }} />
                      <span>{exp.filename}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>
                      {exp.format}
                    </span>
                  </td>
                  <td>
                    <strong>{exp.records.toLocaleString()}</strong> rows
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{exp.time}</td>
                  
                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      
                      {/* Download */}
                      <button
                        onClick={() => alert(`Downloading ${exp.filename}...`)}
                        className="btn btn-secondary btn-xs"
                        style={{ padding: '6px' }}
                        title="Download file"
                      >
                        <Download size={12} />
                      </button>

                      {/* Sync to CRM */}
                      <button
                        onClick={() => handleSyncCRM(exp.id, exp.filename)}
                        className="btn btn-secondary btn-xs"
                        disabled={syncingId === exp.id}
                        style={{ padding: '6px' }}
                        title="Sync with CRM (HubSpot/Salesforce)"
                      >
                        {syncingId === exp.id ? (
                          <RefreshCw size={12} className="animate-spin" />
                        ) : (
                          <Share2 size={12} />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="btn btn-danger btn-xs"
                        style={{ padding: '6px' }}
                        title="Delete file record"
                      >
                        <Trash2 size={12} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ExportCenterView;

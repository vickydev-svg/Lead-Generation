import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, Play, CheckCircle, Clock, Ban } from 'lucide-react';

const BulkSearchView = ({ queue, onUploadCSV }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.csv')) {
        simulateFileUpload(file.name);
      } else {
        alert('Please upload a valid CSV file.');
      }
    }
  };

  const simulateFileUpload = (filename) => {
    alert(`File "${filename}" uploaded successfully! 5 bulk queries identified.`);
    onUploadCSV([
      { keyword: 'Gyms', location: 'Miami, USA', radius: 15 },
      { keyword: 'Bakeries', location: 'Boston, USA', radius: 10 },
      { keyword: 'Chiropractors', location: 'Seattle, USA', radius: 25 },
    ]);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Bulk Search Uploader
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Upload a list of keywords and locations to scrape hundreds of queries automatically in parallel.
        </p>
      </div>

      {/* Main Grid: Upload left, queue right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* Upload Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Uploader Box */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{
              border: dragActive ? '2px dashed var(--accent-hover)' : '2px dashed var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: dragActive ? 'var(--accent-glow)' : 'var(--bg-secondary)',
              padding: '40px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onClick={() => {
              const filename = prompt('Select file (mock dialog):', 'leads_template.csv');
              if (filename) simulateFileUpload(filename);
            }}
          >
            <div style={{
              display: 'inline-flex',
              padding: '16px',
              borderRadius: '50%',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              color: 'var(--accent-hover)',
              marginBottom: '16px'
            }}>
              <UploadCloud size={32} />
            </div>
            
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Upload CSV File
            </h3>
            
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '280px', margin: '0 auto 16px' }}>
              Drag and drop your file here, or click to browse. CSV must contain <code style={{ fontSize: '0.7rem' }}>Keyword</code> and <code style={{ fontSize: '0.7rem' }}>Location</code> columns.
            </p>

            <a 
              href="#download-template" 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Downloading template.csv'); }}
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent-hover)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <FileSpreadsheet size={14} />
              <span>Download Sample CSV Template</span>
            </a>
          </div>

          {/* Guidelines */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Formatting Guidelines</h3>
            <ul style={{ 
              fontSize: '0.8rem', 
              color: 'var(--text-secondary)', 
              paddingLeft: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <li>Maximum bulk limits: <strong>50 queries</strong> per CSV upload.</li>
              <li>Columns: <strong>Keyword</strong> (required), <strong>Location</strong> (required), <strong>Radius</strong> (optional, in km).</li>
              <li>Row formats: <code>Dentists, New York, 25</code> or <code>Gyms, Paris</code>.</li>
            </ul>
          </div>

        </div>

        {/* Queue Column */}
        <div className="card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.0rem', fontWeight: 700, marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: 0 }}>
            Scraper Queue status
          </h3>

          <div className="table-container" style={{ border: 'none' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Query</th>
                  <th>Status</th>
                  <th>Results</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((q, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>
                      {q.keyword} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>in {q.location}</span>
                    </td>
                    <td>
                      <span className={`badge ${q.status === 'Completed' ? 'badge-success' : q.status === 'Running' ? 'badge-warning' : 'badge-info'}`} style={{ fontSize: '0.65rem', display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
                        {q.status === 'Completed' ? <CheckCircle size={10} /> : q.status === 'Running' ? <Play size={10} className="animate-spin" /> : <Clock size={10} />}
                        {q.status}
                      </span>
                    </td>
                    <td>{q.results > 0 ? q.results.toLocaleString() : '-'}</td>
                    <td>{q.credits} cr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default BulkSearchView;

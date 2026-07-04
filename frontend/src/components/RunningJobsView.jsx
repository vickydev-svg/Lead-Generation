import React, { useState } from 'react';
import { Play, Pause, Trash2, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const RunningJobsView = ({ initialJobs }) => {
  const [jobs, setJobs] = useState(initialJobs);

  const toggleJobStatus = (id) => {
    setJobs(jobs.map(job => {
      if (job.id === id) {
        return {
          ...job,
          status: job.status === 'Running' ? 'Paused' : 'Running'
        };
      }
      return job;
    }));
  };

  const cancelJob = (id) => {
    if (window.confirm('Are you sure you want to cancel this crawl job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Crawler Jobs Manager
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Monitor active, completed, and paused scraper pipelines.
        </p>
      </div>

      {/* Jobs Table Card */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Leads Extracted</th>
              <th>Credits spent</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const pct = Math.round((job.processed / job.total) * 100);
              return (
                <tr key={job.id}>
                  <td style={{ fontWeight: 600 }}>{job.name}</td>
                  <td>
                    <span className={`badge ${
                      job.status === 'Running' ? 'badge-success' : 
                      job.status === 'Completed' ? 'badge-info' : 
                      job.status === 'Paused' ? 'badge-warning' : 'badge-danger'
                    }`} style={{ display: 'inline-flex', gap: '4px', alignItems: 'center', fontSize: '0.65rem' }}>
                      {job.status === 'Running' && <Loader2 size={10} className="animate-spin" />}
                      {job.status === 'Completed' && <CheckCircle2 size={10} />}
                      {job.status === 'Failed' && <XCircle size={10} />}
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '160px' }}>
                      <div className="progress-track" style={{ flex: 1, height: '6px' }}>
                        <div 
                          className={`progress-bar ${job.status === 'Running' ? 'progress-bar-animated' : ''}`}
                          style={{ 
                            width: `${pct}%`,
                            backgroundColor: job.status === 'Failed' ? 'var(--danger)' : '' 
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {pct}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: '#ffffff' }}>{job.processed.toLocaleString()}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}> / {job.total.toLocaleString()}</span>
                  </td>
                  <td>{job.credits} cr</td>
                  
                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      
                      {/* Play/Pause (only for Running or Paused) */}
                      {(job.status === 'Running' || job.status === 'Paused') && (
                        <button
                          onClick={() => toggleJobStatus(job.id)}
                          className="btn btn-secondary btn-xs"
                          style={{ padding: '6px' }}
                          title={job.status === 'Running' ? 'Pause Scraper' : 'Resume Scraper'}
                        >
                          {job.status === 'Running' ? <Pause size={12} /> : <Play size={12} />}
                        </button>
                      )}

                      {/* Cancel / Stop */}
                      {job.status !== 'Completed' && job.status !== 'Failed' && (
                        <button
                          onClick={() => cancelJob(job.id)}
                          className="btn btn-danger btn-xs"
                          style={{ padding: '6px' }}
                          title="Terminate Job"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RunningJobsView;

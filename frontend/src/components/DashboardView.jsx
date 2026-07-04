import React from 'react';
import { 
  TrendingUp, 
  Search, 
  Download, 
  Folder, 
  ArrowUpRight, 
  Play, 
  ExternalLink,
  ChevronRight,
  Lightbulb
} from 'lucide-react';

const DashboardView = ({ 
  stats, 
  recentSearches, 
  runningJobs, 
  latestExports, 
  setActiveTab,
  setDirectSearchQuery 
}) => {
  
  const handleTryAISuggestion = () => {
    setDirectSearchQuery('Marketing Agencies in Australia');
    setActiveTab('search-leads');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Good morning, John
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Here's what's happening with your lead generation pipelines today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {[
          { title: 'Total Searches', value: stats.totalSearches, change: '+12%', icon: Search, label: 'this week' },
          { title: 'Leads Found', value: stats.leadsFound.toLocaleString(), change: '+18%', icon: TrendingUp, label: 'this week' },
          { title: 'Exports', value: stats.exports, change: '+8%', icon: Download, label: 'this week' },
          { title: 'Projects', value: stats.projects, change: '+2%', icon: Folder, label: 'this week' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.title}</span>
                <div style={{
                  padding: '6px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)'
                }}>
                  <Icon size={16} style={{ color: 'var(--accent-hover)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff' }}>{item.value}</span>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--success)', 
                  fontWeight: 700, 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  {item.change}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Left (Searches & Jobs), Right (Exports) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Recent Searches & Running Jobs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Recent Searches */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Recent Searches</h3>
              <button 
                onClick={() => setActiveTab('search-history')}
                className="btn btn-ghost btn-xs"
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View all history</span>
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
              <table className="custom-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Keyword/Location</th>
                    <th>Leads Found</th>
                    <th>Credits Spent</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSearches.slice(0, 4).map((s, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600 }}>
                        {s.keyword} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>in {s.location}</span>
                      </td>
                      <td>{s.leadsFound.toLocaleString()} leads</td>
                      <td>{s.credits} cr</td>
                      <td style={{ color: 'var(--text-muted)' }}>{s.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Running Jobs */}
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Running Jobs</h3>
              <button 
                onClick={() => setActiveTab('running-jobs')}
                className="btn btn-ghost btn-xs"
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <span>View all jobs</span>
                <ChevronRight size={14} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {runningJobs.slice(0, 3).map((job, idx) => {
                const percentage = Math.round((job.processed / job.total) * 100);
                return (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'rgba(255,255,255,0.01)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{job.name}</span>
                      <span className={`badge ${job.status === 'Running' ? 'badge-success' : job.status === 'Completed' ? 'badge-info' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>
                        {job.status}
                      </span>
                    </div>
                    
                    <div className="progress-container">
                      <div className="progress-track">
                        <div 
                          className={`progress-bar ${job.status === 'Running' ? 'progress-bar-animated' : ''}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {percentage}%
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>Processed: {job.processed} / {job.total}</span>
                      <span>Credits Spent: {job.credits} cr</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Latest Exports */}
        <div className="card" style={{ padding: '20px', minHeight: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Latest Exports</h3>
            <button 
              onClick={() => setActiveTab('export-center')}
              className="btn btn-ghost btn-xs"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Export Center</span>
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {latestExports.slice(0, 4).map((exp, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'rgba(255,255,255,0.01)',
                transition: 'border-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px', whiteSpace: 'nowrap' }}>
                    {exp.filename}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {exp.records} rows • {exp.time}
                  </span>
                </div>
                <a 
                  href="#download"
                  onClick={(e) => { e.preventDefault(); alert('Downloading ' + exp.filename); }}
                  className="btn btn-secondary btn-xs" 
                  style={{ minWidth: 'auto', padding: '6px' }}
                  title="Download File"
                >
                  <Download size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Suggestion Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 24px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(96, 165, 250, 0.05) 100%)',
        border: '1px solid rgba(37, 99, 235, 0.25)',
        boxShadow: '0 0 15px rgba(37, 99, 235, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            padding: '8px',
            borderRadius: '50%'
          }}>
            <Lightbulb size={20} style={{ color: 'var(--accent-hover)' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-hover)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
              AI Recommendation
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
              Try searching <strong style={{ color: '#ffffff' }}>'Marketing Agencies in Australia'</strong> — We detected a high density of websites lacking SSL and social details.
            </span>
          </div>
        </div>
        <button 
          onClick={handleTryAISuggestion}
          className="btn btn-primary btn-sm"
          style={{ padding: '8px 16px', flexShrink: 0 }}
        >
          Try Now
        </button>
      </div>

    </div>
  );
};

export default DashboardView;

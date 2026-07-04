import React from 'react';
import { 
  TrendingUp, 
  Search, 
  Download, 
  Folder, 
  ChevronRight,
  Lightbulb,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const DashboardView = ({ 
  stats, 
  recentSearches, 
  lists,
  latestExports, 
  user,
  setActiveTab,
  setDirectSearchQuery,
  onViewSearch
}) => {
  
  const handleTryAISuggestion = () => {
    setDirectSearchQuery('Marketing Agencies in Australia');
    setActiveTab('search-leads');
  };

  const name = user?.fullName ? user.fullName.split(' ')[0] : 'Prospector';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem', 
            fontWeight: 700, 
            margin: '0 0 6px 0', 
            color: '#ffffff', 
            letterSpacing: '-0.03em' 
          }}>
            Welcome back, {name} 👋
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Here is your live prospecting overview. You're ready to find some leads today.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('search-leads')}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
        >
          <Sparkles size={16} />
          <span>New Lead Search</span>
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px',
      }}>

        {/* Bento Cell 1: Total Searches Stat (col-span-3) */}
        <div className="card" style={{
          gridColumn: 'span 3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Searches</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(94, 106, 210, 0.1)', border: '1px solid rgba(94, 106, 210, 0.2)' }}>
              <Search size={16} style={{ color: 'var(--accent-hover)' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
              {stats.totalSearches}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Queries submitted</span>
          </div>
        </div>

        {/* Bento Cell 2: Leads Found Stat (col-span-3) */}
        <div className="card" style={{
          gridColumn: 'span 3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Leads Extracted</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
              <TrendingUp size={16} style={{ color: 'var(--success)' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
              {stats.leadsFound.toLocaleString()}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified businesses</span>
          </div>
        </div>

        {/* Bento Cell 3: Saved Lists Stat (col-span-3) */}
        <div className="card" style={{
          gridColumn: 'span 3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Saved Lists</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <Folder size={16} style={{ color: 'var(--warning)' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
              {stats.lists}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target segments</span>
          </div>
        </div>

        {/* Bento Cell 4: Exports Stat (col-span-3) */}
        <div className="card" style={{
          gridColumn: 'span 3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '140px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CSV Exports</span>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
              <Download size={16} style={{ color: '#a78bfa' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
              {stats.exports}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Files generated</span>
          </div>
        </div>

        {/* Bento Cell 5: Recent Searches Table (col-span-8, row-span-2) */}
        <div className="card" style={{
          gridColumn: 'span 8',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Recent Search Logs</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Your latest scraping query logs</p>
            </div>
            <button 
              onClick={() => setActiveTab('search-history')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Full History</span>
              <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="table-container" style={{ border: 'none', backgroundColor: 'transparent' }}>
            <table className="custom-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Keyword / Location</th>
                  <th>Leads Found</th>
                  <th>Credits</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSearches && recentSearches.length > 0 ? (
                  recentSearches.slice(0, 4).map((s, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => onViewSearch && onViewSearch(s.id, s.keyword, s.location)}
                      style={{ cursor: 'pointer' }}
                      title="Click to view extracted leads"
                    >
                      <td style={{ fontWeight: 600 }}>
                        {s.keyword} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>in {s.location}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{s.leadsFound.toLocaleString()} leads</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-hover)' }}>{s.credits} cr</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{s.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No searches executed yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bento Cell 6: Saved Lead Lists Quick View (col-span-4) */}
        <div className="card" style={{
          gridColumn: 'span 4',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Lead Lists</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Saved target cohorts</p>
            </div>
            <button 
              onClick={() => setActiveTab('saved-lists')}
              className="btn btn-ghost btn-xs"
              style={{ padding: '4px' }}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {lists && lists.length > 0 ? (
              lists.slice(0, 3).map((list, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '12px 14px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-color)', 
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{list.name}</span>
                  <span className="badge badge-warning" style={{ fontSize: '0.65rem' }}>{list.leadsCount} leads</span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No saved lists yet.
              </div>
            )}
          </div>
        </div>

        {/* Bento Cell 7: Latest Exports center (col-span-4) */}
        <div className="card" style={{
          gridColumn: 'span 4',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Latest Downloads</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Exported CSV files</p>
            </div>
            <button 
              onClick={() => setActiveTab('saved-lists')}
              className="btn btn-ghost btn-xs"
              style={{ padding: '4px' }}
            >
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {latestExports && latestExports.length > 0 ? (
              latestExports.slice(0, 3).map((exp, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255,255,255,0.01)',
                  transition: 'border-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                      {exp.filename}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
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
                    <Download size={12} />
                  </a>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No files exported yet.
              </div>
            )}
          </div>
        </div>

        {/* Bento Cell 8: AI Suggestion Banner (col-span-12) */}
        <div style={{
          gridColumn: 'span 12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(90deg, rgba(94, 106, 210, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)',
          border: '1px solid rgba(94, 106, 210, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
        }} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              backgroundColor: 'rgba(94, 106, 210, 0.2)',
              padding: '10px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Lightbulb size={20} style={{ color: 'var(--accent-hover)' }} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-hover)', textTransform: 'uppercase', display: 'block', marginBottom: '2px', letterSpacing: '0.05em' }}>
                AI Recommendations
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                Try searching <strong style={{ color: '#ffffff' }}>'Marketing Agencies in Australia'</strong> — We detected a high density of websites lacking SSL and social details.
              </span>
            </div>
          </div>
          <button 
            onClick={handleTryAISuggestion}
            className="btn btn-primary btn-sm"
            style={{ padding: '10px 20px', flexShrink: 0 }}
          >
            Try Now
          </button>
        </div>

      </div>

    </div>
  );
};

export default DashboardView;

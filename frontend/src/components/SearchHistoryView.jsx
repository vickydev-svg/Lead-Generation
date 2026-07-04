import React from 'react';
import { History, Play, Bookmark, Trash2 } from 'lucide-react';

const SearchHistoryView = ({ history, onRepeatSearch, onDeleteHistory, onSaveSearchTemplate, onViewSearch }) => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Search History
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Review and re-run your previous lead generation campaigns.
        </p>
      </div>

      {/* History table list */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Search Target</th>
              <th>Leads Extracted</th>
              <th>Time Elapsed</th>
              <th>Credits Spent</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
                  No previous searches. Start a new search to populate history!
                </td>
              </tr>
            ) : (
              history.map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => onViewSearch && onViewSearch(item.id, item.keyword, item.location)}
                  style={{ cursor: 'pointer' }}
                  title="Click to view extracted leads"
                >
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <History size={16} style={{ color: 'var(--text-muted)' }} />
                      <span>
                        {item.keyword} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>in {item.location}</span>
                      </span>
                    </div>
                  </td>
                  <td>
                    <strong>{item.leadsFound.toLocaleString()}</strong> leads
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{item.time}</td>
                  <td>{item.credits} cr</td>
                  
                  {/* Action buttons */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      
                      {/* Repeat Search */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onRepeatSearch(item); }}
                        className="btn btn-primary btn-xs"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                        title="Re-run search query"
                      >
                        <Play size={10} fill="#ffffff" />
                        <span>Repeat</span>
                      </button>

                      {/* Save Template */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveSearchTemplate({ keyword: item.keyword, location: item.location, radius: 25, maxResults: item.leadsFound });
                          alert('Added search parameters to saved configurations.');
                        }}
                        className="btn btn-secondary btn-xs"
                        style={{ padding: '6px' }}
                        title="Save search parameters"
                      >
                        <Bookmark size={12} />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onDeleteHistory(item.id); }}
                        className="btn btn-danger btn-xs"
                        style={{ padding: '6px' }}
                        title="Remove history item"
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

export default SearchHistoryView;

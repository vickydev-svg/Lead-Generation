import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Ban } from 'lucide-react';

const SearchProgressView = ({ activeSearch, onSearchComplete, onCancelSearch }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  
  // Progress states
  const [p1, setP1] = useState(0); // Finding places
  const [p2, setP2] = useState(0); // Business info
  const [p3, setP3] = useState(0); // Visiting websites
  const [p4, setP4] = useState(0); // Extracting emails
  const [p5, setP5] = useState(0); // Social profiles
  const [p6, setP6] = useState(0); // AI processing

  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    // 1. Ticking timer
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    // 2. Simulating scraper stages
    const progressInterval = setInterval(() => {
      setP1(prev => {
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 12) + 5;
        return Math.min(next, 100);
      });

      setP2(prev => {
        if (p1 < 20) return 0;
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 10) + 4;
        return Math.min(next, 100);
      });

      setP3(prev => {
        if (p2 < 20) return 0;
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 8) + 3;
        return Math.min(next, 100);
      });

      setP4(prev => {
        if (p3 < 20) return 0;
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 8) + 2;
        return Math.min(next, 100);
      });

      setP5(prev => {
        if (p4 < 20) return 0;
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 6) + 2;
        return Math.min(next, 100);
      });

      setP6(prev => {
        if (p5 < 80) return 0;
        if (prev >= 100) return 100;
        const next = prev + Math.floor(Math.random() * 15) + 5;
        return Math.min(next, 100);
      });

    }, 600);

    return () => {
      clearInterval(timer);
      clearInterval(progressInterval);
    };
  }, [p1, p2, p3, p4, p5]);

  // Complete search once AI processing hits 100%
  useEffect(() => {
    if (p6 >= 100) {
      // Small timeout to let user appreciate the completed state
      const delay = setTimeout(() => {
        onSearchComplete();
      }, 1000);
      return () => clearTimeout(delay);
    }
  }, [p6, onSearchComplete]);

  // Calculate live counts based on percentages
  const maxLeads = activeSearch.maxResults || 2500;
  const leadsFound = Math.round((p1 / 100) * maxLeads * 0.93); // Slightly less than max to feel real
  const businessEnriched = Math.round((p2 / 100) * leadsFound);
  const emailsExtracted = Math.round((p4 / 100) * businessEnriched * 0.64);
  const remaining = Math.max(0, maxLeads - leadsFound);

  return (
    <div className="animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '800px',
      margin: '20px auto'
    }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            margin: '0 0 4px 0', 
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Loader2 className="animate-spin" size={24} style={{ color: 'var(--accent-hover)' }} />
            <span>Extracting Leads...</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Keyword: <strong style={{ color: '#ffffff' }}>{activeSearch.keyword}</strong> • Location: <strong style={{ color: '#ffffff' }}>{activeSearch.location}</strong>
          </p>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Job ID: <code style={{ fontSize: '0.7rem' }}>#LID-{activeSearch.id || '9827'}</code>
        </span>
      </div>

      {/* Progress Cards Stack */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '28px' }}>
        
        {/* Stage 1: Google Maps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: p1 > 0 ? '#ffffff' : 'var(--text-muted)' }}>
              1. Finding places on Google Maps
            </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {leadsFound.toLocaleString()} / {maxLeads.toLocaleString()} ({p1}%)
            </span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className={`progress-bar ${p1 < 100 ? 'progress-bar-animated' : ''}`} style={{ width: `${p1}%` }} />
          </div>
        </div>

        {/* Stage 2: Business Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: p2 > 0 ? '#ffffff' : 'var(--text-muted)' }}>
              2. Extracting business information
            </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {p2}%
            </span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className={`progress-bar ${p2 > 0 && p2 < 100 ? 'progress-bar-animated' : ''}`} style={{ width: `${p2}%`, backgroundColor: 'var(--accent-hover)' }} />
          </div>
        </div>

        {/* Stage 3: Visiting Websites */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: p3 > 0 ? '#ffffff' : 'var(--text-muted)' }}>
              3. Visiting business websites
            </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {p3}%
            </span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className={`progress-bar ${p3 > 0 && p3 < 100 ? 'progress-bar-animated' : ''}`} style={{ width: `${p3}%` }} />
          </div>
        </div>

        {/* Stage 4: Extracting Emails */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: p4 > 0 ? '#ffffff' : 'var(--text-muted)' }}>
              4. Scraping contact emails & phone numbers
            </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {emailsExtracted.toLocaleString()} found ({p4}%)
            </span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className={`progress-bar ${p4 > 0 && p4 < 100 ? 'progress-bar-animated' : ''}`} style={{ width: `${p4}%` }} />
          </div>
        </div>

        {/* Stage 5: Detecting Social Profiles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: p5 > 0 ? '#ffffff' : 'var(--text-muted)' }}>
              5. Locating social profiles (LinkedIn, Facebook, Instagram)
            </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {p5}%
            </span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className={`progress-bar ${p5 > 0 && p5 < 100 ? 'progress-bar-animated' : ''}`} style={{ width: `${p5}%` }} />
          </div>
        </div>

        {/* Stage 6: AI Classification */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 600, color: p6 > 0 ? '#ffffff' : 'var(--text-muted)' }}>
              6. AI enrichment & quality analysis scoring
            </span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {p6}%
            </span>
          </div>
          <div className="progress-track" style={{ height: '6px' }}>
            <div className={`progress-bar ${p6 > 0 && p6 < 100 ? 'progress-bar-animated' : ''}`} style={{ width: `${p6}%`, backgroundColor: 'var(--success)' }} />
          </div>
        </div>

        {/* Statistics Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-color)',
          marginTop: '12px',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Elapsed Time
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>{formatTime(elapsedSeconds)}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Leads Found
            </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--accent-hover)' }}>{leadsFound.toLocaleString()}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Processed
            </span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>{businessEnriched.toLocaleString()}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Remaining
            </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{remaining.toLocaleString()}</strong>
          </div>
        </div>

        {/* Cancel Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
          <button 
            type="button" 
            onClick={onCancelSearch} 
            className="btn btn-danger"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
          >
            <Ban size={16} />
            <span>Cancel Search</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default SearchProgressView;

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Globe2, Compass, Sliders, CheckCircle, HelpCircle, Save } from 'lucide-react';

const SearchLeadsView = ({ 
  onStartSearch, 
  onSaveSearchTemplate,
  directSearchQuery, 
  setDirectSearchQuery,
  creditsBalance
}) => {
  const [keyword, setKeyword] = useState('Dentists');
  const [location, setLocation] = useState('New York, USA');
  const [radius, setRadius] = useState(25);
  const [language, setLanguage] = useState('English');
  const [maxResults, setMaxResults] = useState(2500);
  
  // Advanced filters
  const [hasWebsite, setHasWebsite] = useState(true);
  const [hasEmail, setHasEmail] = useState(true);
  const [openNow, setOpenNow] = useState(false);
  const [minRating, setMinRating] = useState(3.0);
  const [minReviews, setMinReviews] = useState(10);
  const [category, setCategory] = useState('Dentist');

  // Handle direct search queries passed from landing or history
  useEffect(() => {
    if (directSearchQuery) {
      // Direct searches could be formatted like "Dentists in New York"
      const query = directSearchQuery;
      if (query.toLowerCase().includes(' in ')) {
        const parts = query.split(/ in /i);
        setKeyword(parts[0]);
        setLocation(parts[1]);
      } else {
        setKeyword(query);
      }
      // Clear out directSearchQuery after using
      setDirectSearchQuery('');
    }
  }, [directSearchQuery, setDirectSearchQuery]);

  const creditCost = Math.round(maxResults * 0.1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim() || !location.trim()) {
      alert('Please enter a business keyword and location.');
      return;
    }
    onStartSearch({
      keyword,
      location,
      radius,
      language,
      maxResults,
      filters: {
        hasWebsite,
        hasEmail,
        openNow,
        minRating,
        minReviews,
        category
      },
      creditCost
    });
  };

  const handleSaveTemplate = () => {
    onSaveSearchTemplate({ keyword, location, radius, maxResults });
    alert('Search configuration saved successfully!');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          New Search Setup
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Configure criteria to extract targeted B2B leads from Google Maps.
        </p>
      </div>

      {/* Main Grid: Form Left, Map Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: 0 }}>
            Query Parameters
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Keyword */}
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label">Business Type / Keyword</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="input-field"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Dentists, Restaurants, etc."
                  style={{ width: '100%', paddingLeft: '38px' }}
                />
              </div>
            </div>

            {/* Location */}
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label">Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="input-field"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="New York, USA"
                  style={{ width: '100%', paddingLeft: '38px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '16px' }}>
            {/* Radius Slider */}
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Search Radius</span>
                <span style={{ color: 'var(--accent-hover)', fontWeight: 700 }}>{radius} km</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                className="range-slider"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                style={{ marginTop: '12px' }}
              />
            </div>

            {/* Language */}
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label">Language</label>
              <select
                className="input-field"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ width: '100%', cursor: 'pointer' }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Arabic">Arabic</option>
              </select>
            </div>

            {/* Max Results */}
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label">Max Results</label>
              <select
                className="input-field"
                value={maxResults}
                onChange={(e) => setMaxResults(parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              >
                <option value="100">100 Leads</option>
                <option value="500">500 Leads</option>
                <option value="1000">1,000 Leads</option>
                <option value="2500">2,500 Leads</option>
                <option value="5000">5,000 Leads</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          <div style={{
            marginTop: '8px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: 'var(--text-secondary)' }}>
              <Sliders size={14} />
              Advanced Filters
            </h4>

            {/* Row 1 switches */}
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label className="switch">
                  <input type="checkbox" checked={hasWebsite} onChange={(e) => setHasWebsite(e.target.checked)} />
                  <span className="slider"></span>
                </label>
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Has Website</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label className="switch">
                  <input type="checkbox" checked={hasEmail} onChange={(e) => setHasEmail(e.target.checked)} />
                  <span className="slider"></span>
                </label>
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Has Email</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label className="switch">
                  <input type="checkbox" checked={openNow} onChange={(e) => setOpenNow(e.target.checked)} />
                  <span className="slider"></span>
                </label>
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Open Now Only</span>
              </div>
            </div>

            {/* Row 2 slider and dropdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '16px' }}>
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Min Rating</span>
                  <span style={{ color: 'var(--warning)', fontWeight: 700 }}>{minRating.toFixed(1)} ★</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  className="range-slider"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  style={{ marginTop: '12px' }}
                />
              </div>

              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">Min Reviews</label>
                <input
                  type="number"
                  className="input-field"
                  value={minReviews}
                  onChange={(e) => setMinReviews(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{ width: '100%' }}
                />
              </div>

              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">Category</label>
                <select
                  className="input-field"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="Dentist">Dentist</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Lawyer">Lawyer</option>
                  <option value="Gym">Gym / Fitness</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Real Estate">Real Estate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-color)',
            marginTop: '8px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Estimated Usage:</span>
                <strong style={{ color: 'var(--accent-hover)', fontWeight: 700 }}>{creditCost} Credits</strong>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Your Balance: {creditsBalance.toLocaleString()} Credits
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleSaveTemplate}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={16} />
                <span>Save Search</span>
              </button>
              
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 28px' }}>
                Search Now
              </button>
            </div>
          </div>

        </form>

        {/* Right Map Preview */}
        <div className="card" style={{ 
          padding: '20px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          height: '100%' 
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
            Live Map Preview
          </h3>
          
          {/* Map canvas simulation using SVG */}
          <div style={{
            flex: 1,
            backgroundColor: '#0a0f1d',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            position: 'relative',
            height: '320px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Custom SVG Grid representing a city map */}
            <svg width="100%" height="100%" style={{ opacity: 0.25 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(37, 99, 235, 0.4)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Diagonal streets */}
              <line x1="0" y1="0" x2="400" y2="400" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="3" />
              <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="2" />
              <line x1="150" y1="0" x2="150" y2="400" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="2" />
            </svg>

            {/* Glowing Map Pins */}
            {[
              { top: '25%', left: '30%', label: 'Lead 1' },
              { top: '45%', left: '60%', label: 'Lead 2' },
              { top: '70%', left: '40%', label: 'Lead 3' },
              { top: '30%', left: '75%', label: 'Lead 4' },
              { top: '60%', left: '20%', label: 'Lead 5' },
              { top: '80%', left: '70%', label: 'Lead 6' },
            ].map((pin, index) => (
              <div 
                key={index} 
                style={{
                  position: 'absolute',
                  top: pin.top,
                  left: pin.left,
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'var(--accent-hover)',
                  borderRadius: '50%',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 12px var(--accent-color)',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulseGlow 2s infinite alternate',
                  animationDelay: `${index * 0.3}s`
                }}
                title={pin.label}
              />
            ))}

            {/* Central Radar Pulse */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '80px',
              height: '80px',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'spin 10s linear infinite'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '1px',
                height: '40px',
                backgroundColor: 'rgba(59, 130, 246, 0.8)'
              }}></div>
            </div>

            {/* Overlay indicators */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: 'rgba(7, 11, 19, 0.85)',
              border: '1px solid var(--border-color)',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)'
            }}>
              Target Area: <strong style={{ color: '#ffffff' }}>{location}</strong>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Location Coordinates</span>
              <span>40.7128° N, 74.0060° W</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Map Zoom Level</span>
              <span>12x (Radius Auto-fit)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SearchLeadsView;

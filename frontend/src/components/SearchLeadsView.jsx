import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

const SearchLeadsView = ({
  onStartSearch,
  onSaveSearchTemplate,
  directSearchQuery,
  setDirectSearchQuery,
  creditsBalance
}) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(25);
  const [maxResults, setMaxResults] = useState(500);
  const [mapLocation, setMapLocation] = useState('world');
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  // Handle direct search queries passed from landing or history
  useEffect(() => {
    if (directSearchQuery) {
      const query = directSearchQuery;
      if (query.toLowerCase().includes(' in ')) {
        const parts = query.split(/ in /i);
        setKeyword(parts[0]);
        setLocation(parts[1]);
        setMapLocation(parts[1]);
      } else {
        setKeyword(query);
      }
      setDirectSearchQuery('');
    }
  }, [directSearchQuery, setDirectSearchQuery]);

  // Debounce map update when location changes
  const handleLocationChange = (val) => {
    setLocation(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (val.trim().length > 2) setMapLocation(val.trim());
    }, 900);
  };

  const creditCost = Math.round(maxResults * 0.1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim() || !location.trim()) {
      alert('Please enter a business type and location.');
      return;
    }
    const params = { keyword: keyword.trim(), location: location.trim(), radius, maxResults, creditCost };
    // Reset form immediately so it's blank when user comes back
    setKeyword('');
    setLocation('');
    setRadius(25);
    setMaxResults(500);
    setMapLocation('world');
    onStartSearch(params);
  };

  // Build OSM iframe URL from location string
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=0,0`;
  const searchMapSrc = mapLocation && mapLocation !== 'world'
    ? `https://www.openstreetmap.org/export/embed.html?layer=mapnik&query=${encodeURIComponent(mapLocation)}`
    : null;

  // Use nominatim to get coords, then embed
  const [mapIframeSrc, setMapIframeSrc] = useState('https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik');

  useEffect(() => {
    if (!mapLocation || mapLocation === 'world') {
      setMapIframeSrc('https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik');
      return;
    }
    // Geocode using Nominatim
    const controller = new AbortController();
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(mapLocation)}&format=json&limit=1`, {
      signal: controller.signal,
      headers: { 'Accept-Language': 'en' }
    })
      .then(r => r.json())
      .then(results => {
        if (results && results.length > 0) {
          const { lat, lon, boundingbox } = results[0];
          const [s, n, w, e] = boundingbox.map(Number);
          setMapIframeSrc(
            `https://www.openstreetmap.org/export/embed.html?bbox=${w},${s},${e},${n}&layer=mapnik&marker=${lat},${lon}`
          );
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [mapLocation]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Search Leads
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Extract targeted business leads from Google Maps. Enter a business type and location to begin.
        </p>
      </div>

      {/* Main 2-column grid: Form | Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Business Keyword */}
          <div className="input-group" style={{ margin: 0 }}>
            <label className="input-label">Business Type</label>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="input-field"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="e.g. Dentists, Restaurants, Lawyers..."
                style={{ width: '100%', paddingLeft: '38px' }}
                autoComplete="off"
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
                onChange={e => handleLocationChange(e.target.value)}
                placeholder="e.g. New York, USA  or  Mumbai, India"
                style={{ width: '100%', paddingLeft: '38px' }}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Radius */}
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
              onChange={e => setRadius(parseInt(e.target.value))}
              style={{ marginTop: '10px', width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1 km</span>
              <span>50 km</span>
              <span>100 km</span>
            </div>
          </div>

          {/* Max Results */}
          <div className="input-group" style={{ margin: 0 }}>
            <label className="input-label">Max Leads to Fetch</label>
            <select
              className="input-field"
              value={maxResults}
              onChange={e => setMaxResults(parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            >
              <option value="50">50 leads — quick test</option>
              <option value="100">100 leads</option>
              <option value="500">500 leads</option>
              <option value="1000">1,000 leads</option>
              <option value="2500">2,500 leads</option>
            </select>
          </div>

          {/* Credit cost + Submit */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span>Estimated cost: </span>
              <span style={{ color: 'var(--accent-hover)', fontWeight: 700 }}>{creditCost} credits</span>
              <br />
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Balance: {(creditsBalance || 0).toLocaleString()} credits</span>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '12px 32px', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Search size={16} />
              Search Now
            </button>
          </div>
        </form>

        {/* Right: Real OSM Map */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={14} style={{ color: 'var(--accent-hover)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
              {location.trim() ? `Showing: ${location}` : 'Enter a location to preview map'}
            </span>
          </div>
          <div style={{ position: 'relative', height: '420px' }}>
            <iframe
              key={mapIframeSrc}
              src={mapIframeSrc}
              title="Location Map"
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {/* Overlay showing search area */}
            {location.trim() && keyword.trim() && (
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                backgroundColor: 'rgba(7,11,19,0.9)',
                border: '1px solid var(--border-color)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                backdropFilter: 'blur(4px)'
              }}>
                Searching <strong style={{ color: '#ffffff' }}>{keyword}</strong> in <strong style={{ color: '#ffffff' }}>{location}</strong>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SearchLeadsView;

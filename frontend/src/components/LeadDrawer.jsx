import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Globe, 
  ExternalLink,
  ShieldCheck, 
  Smile, 
  Share2, 
  Mail, 
  Info,
  Calendar,
  Building,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const LeadDrawer = ({ lead, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!lead) return null;

  // AI Score radial calculation
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (lead.aiScore / 100) * circumference;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '460px',
      backgroundColor: 'var(--bg-secondary)',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn var(--transition-normal)'
    }}>
      
      {/* Header section */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: 'var(--accent-hover)'
          }}>
            🏢
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                {lead.name}
              </h2>
              <span className="badge badge-success" style={{ fontSize: '0.6rem', padding: '2px 6px' }}>
                Verified
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {lead.category} • Healthcare Services
            </p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '50%'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <X size={20} />
        </button>
      </div>

      {/* Quick stats grid (4 boxes) & AI Score circle */}
      <div style={{
        padding: '20px 24px',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        borderBottom: '1px solid var(--border-color)',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '20px',
        alignItems: 'center'
      }}>
        
        {/* Specs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          {[
            { label: 'Rating', value: `${lead.rating} / 5.0`, sub: `${lead.reviews} reviews` },
            { label: 'Employees', value: lead.employees || '10-20', sub: 'Est. Range' },
            { label: 'Price Range', value: lead.price || '$$', sub: 'Moderate' },
            { label: 'Founded', value: lead.founded || '2015', sub: '11 years ago' }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px'
            }}>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                {item.label}
              </span>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#ffffff', marginTop: '2px' }}>
                {item.value}
              </strong>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                {item.sub}
              </span>
            </div>
          ))}
        </div>

        {/* AI Lead score Gauge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px'
        }}>
          <div className="radial-score">
            <svg>
              <circle className="bg" cx="40" cy="40" r={radius} />
              <circle 
                className="fg" 
                cx="40" 
                cy="40" 
                r={radius} 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <span className="score-text">{lead.aiScore}</span>
            <span className="score-lbl">Score</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)' }}>
            Excellent Target
          </span>
        </div>

      </div>

      {/* Tabs list navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '0 16px'
      }}>
        {['overview', 'contact', 'website', 'social', 'insights'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 14px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--accent-color)' : '2px solid transparent',
              color: activeTab === tab ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'capitalize',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels content (scrollable) */}
      <div style={{
        flex: 1,
        padding: '24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
            {/* Address */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <MapPin size={16} style={{ color: 'var(--text-secondary)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', display: 'block' }}>Address</span>
                <span style={{ fontSize: '0.85rem', color: '#ffffff' }}>{lead.address || '123 5th Avenue, New York, NY 10001, USA'}</span>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <Phone size={16} style={{ color: 'var(--text-secondary)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', display: 'block' }}>Phone</span>
                <span style={{ fontSize: '0.85rem', color: '#ffffff' }}>{lead.phone}</span>
              </div>
            </div>

            {/* Hours */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <Clock size={16} style={{ color: 'var(--text-secondary)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', display: 'block' }}>Hours</span>
                <span style={{ fontSize: '0.8rem', color: '#ffffff', display: 'block', marginTop: '2px' }}>
                  Mon - Fri: 9:00 AM - 6:00 PM<br />
                  Sat: 9:00 AM - 2:00 PM<br />
                  Sun: Closed
                </span>
              </div>
            </div>

            {/* Coordinates */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <Globe size={16} style={{ color: 'var(--text-secondary)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', display: 'block' }}>Map Coordinates</span>
                <code style={{ fontSize: '0.75rem', marginTop: '2px', display: 'inline-block' }}>40.7128° N, 74.0060° W</code>
              </div>
            </div>

            {/* Description */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <Info size={16} style={{ color: 'var(--text-secondary)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', display: 'block' }}>Business Summary</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '4px' }}>
                  {lead.summary || "General & cosmetic clinic located in your target area."}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Scraped Emails (2)</h4>
            
            <div style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{lead.email}</span>
                <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>Primary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>billing@{lead.website}</span>
                <span className="badge badge-info" style={{ fontSize: '0.6rem' }}>Finance</span>
              </div>
            </div>

            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Telephone lines</h4>
            <div style={{
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Main Office</span>
                <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>{lead.phone}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Secondary Office</span>
                <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>(212) 555-8947</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'website' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Website Audit</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* SSL */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(16, 185, 129, 0.05)'
              }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>SSL Certificate</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600 }}>Valid (Expires 90d)</span>
              </div>

              {/* Technologies */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Detected Tech Stack</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {['WordPress', 'Elementor', 'Google Analytics', 'Recaptcha', 'Yoast SEO'].map((tech, i) => (
                    <span key={i} style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* SEO Load speed */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)'
              }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Performance Scores</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '4px' }}>
                  <span>Lighthouse Mobile Performance</span>
                  <strong style={{ color: 'var(--warning)' }}>64 / 100</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span>SSL Security Protocol</span>
                  <strong style={{ color: 'var(--success)' }}>A+ Grade</strong>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>Social Profiles Extracted</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { network: 'Facebook', url: `facebook.com/${lead.name.toLowerCase().replace(/ /g, '')}`, status: 'active' },
                { network: 'Instagram', url: `instagram.com/${lead.name.toLowerCase().replace(/ /g, '')}`, status: 'active' },
                { network: 'LinkedIn', url: `linkedin.com/company/${lead.name.toLowerCase().replace(/ /g, '')}`, status: 'active' },
                { network: 'Twitter / X', url: '-', status: 'missing' }
              ].map((s, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: s.status === 'missing' ? 'rgba(239, 68, 68, 0.02)' : 'var(--bg-tertiary)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', color: s.status === 'missing' ? 'var(--text-muted)' : '#ffffff' }}>
                      {s.network}
                    </span>
                    {s.url !== '-' && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.url}</span>
                    )}
                  </div>
                  
                  {s.status === 'active' ? (
                    <a href={`https://${s.url}`} target="_blank" rel="noreferrer" className="btn btn-secondary btn-xs" style={{ minWidth: 'auto', padding: '6px' }}>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="badge badge-danger" style={{ fontSize: '0.6rem' }}>Missing</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>AI Prospecting Intelligence</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Target Opportunity */}
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(245, 158, 11, 0.05)'
              }}>
                <AlertTriangle size={18} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--warning)', display: 'block' }}>SEO & Conversion Opportunities</span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: '4px' }}>
                    {lead.opportunity || "Identify SEO keywords, mobile styling optimizations, and HTTPS certificate validation."}
                  </p>
                </div>
              </div>

              {/* B2B Outreach Pitch */}
              <div style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(16, 185, 129, 0.05)'
              }}>
                <CheckCircle size={18} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success)', display: 'block' }}>B2B Outreach Pitch</span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginTop: '4px' }}>
                    {lead.pitch || "Hey there! I looked at your site and wanted to share 2 minor adjustments that could boost your leads..."}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default LeadDrawer;

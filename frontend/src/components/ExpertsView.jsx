import React from 'react';
import { Star, MessageSquare, Briefcase, Award } from 'lucide-react';

const ExpertsView = () => {
  const experts = [
    { name: 'Alex Mercer', role: 'Enterprise Scraping Consultant', rating: 4.9, jobs: 142, rate: '$85/hr', tags: ['Python', 'Puppeteer', 'Custom APIs'] },
    { name: 'Priya Rajan', role: 'Email Deliverability Architect', rating: 5.0, jobs: 98, rate: '$120/hr', tags: ['DKIM/SPF', 'Warmup', 'SMTP Setup'] },
    { name: 'Marcus Vance', role: 'B2B Cold Outreach Automator', rating: 4.8, jobs: 210, rate: '$95/hr', tags: ['Instantly.ai', 'Smartlead', 'Copywriting'] }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          LeadIntel Experts Network
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Hire vetted B2B lead generation specialists, custom crawling developers, and outreach experts.
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {experts.map((e, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.0rem', fontWeight: 700, color: '#ffffff', margin: '0 0 4px 0' }}>{e.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-hover)', fontWeight: 600 }}>{e.role}</span>
              </div>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>{e.rate}</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} style={{ color: 'var(--warning)', fill: 'var(--warning)' }} />
                <span>{e.rating} rating</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{e.jobs} jobs done</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {e.tags.map((tag, i) => (
                <span key={i} style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.7rem',
                  color: 'var(--text-secondary)'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <button 
              onClick={() => alert(`Message request sent to ${e.name}. They will reply via email.`)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '4px' }}
            >
              <MessageSquare size={14} />
              <span>Contact Expert</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ExpertsView;

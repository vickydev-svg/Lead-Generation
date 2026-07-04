import React from 'react';
import { CreditCard, ShieldCheck, Download, ExternalLink, ArrowUpRight } from 'lucide-react';

const BillingView = ({ creditsBalance }) => {
  const invoices = [
    { id: 'INV-2026-004', date: 'Jun 20, 2026', amount: '$99.00', status: 'Paid' },
    { id: 'INV-2026-003', date: 'May 20, 2026', amount: '$99.00', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Apr 20, 2026', amount: '$99.00', status: 'Paid' },
    { id: 'INV-2026-001', date: 'Mar 20, 2026', amount: '$99.00', status: 'Paid' }
  ];

  const totalCredits = 20000;
  const creditUsagePct = Math.round((creditsBalance / totalCredits) * 100);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          Billing & Subscription
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Manage your plan, check credit usage stats, and view past payment invoices.
        </p>
      </div>

      {/* Main Grid: Plan Left, Usage Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* Left Card: Current Plan */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Current Subscription
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Pro Plan
              </h2>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
              Active
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Includes 20,000 credits/month, Google Maps email enrichment, social extraction, and automated bulk CSV crawling.
          </p>

          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Monthly cost</span>
              <strong style={{ fontSize: '1.25rem', color: '#ffffff' }}>$99.00 / mo</strong>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Renews on <strong>Jul 20, 2026</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => alert('Plan upgrades are simulated.')} 
              className="btn btn-primary"
              style={{ flex: 1 }}
            >
              Upgrade Plan
            </button>
            <button 
              onClick={() => alert('Billing portal redirect.')} 
              className="btn btn-secondary"
            >
              Cancel Subscription
            </button>
          </div>
        </div>

        {/* Right Card: Usage Gauge */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Credit Usage</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Remaining Balance</span>
              <strong>{creditsBalance.toLocaleString()} / {totalCredits.toLocaleString()} Credits</strong>
            </div>
            
            <div className="progress-track" style={{ height: '10px' }}>
              <div 
                className="progress-bar progress-bar-animated" 
                style={{ width: `${creditUsagePct}%` }}
              />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'flex-end' }}>
              Usage level: {creditUsagePct}% available
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '16px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Map Scrapes</span>
              <span>8,245 credits spent</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Email Verification Checks</span>
              <span>1,205 credits spent</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>AI Lead Enrichment Scans</span>
              <span>3,000 credits spent</span>
            </div>
          </div>
        </div>

      </div>

      {/* Invoice list */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.0rem', fontWeight: 700, marginBottom: '16px' }}>Invoice History</h3>
        
        <div className="table-container" style={{ border: 'none' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Billing Date</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600 }}>{inv.id}</td>
                  <td>{inv.date}</td>
                  <td><strong>{inv.amount}</strong></td>
                  <td>
                    <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => alert(`Downloading PDF for invoice ${inv.id}`)}
                      className="btn btn-secondary btn-xs"
                      style={{ padding: '6px' }}
                      title="Download PDF"
                    >
                      <Download size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default BillingView;

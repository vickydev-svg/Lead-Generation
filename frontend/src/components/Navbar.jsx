import React from 'react';
import { Search, Bell, LogOut, Coins, CreditCard } from 'lucide-react';

const Navbar = ({ activeTab, credits, onLogout, setPage, setActiveTab }) => {
  // Format tab ID to clean title
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'search-leads': return 'Search Leads';
      case 'search-progress': return 'Search Progress';
      case 'search-results': return 'Search Results';
      case 'projects': return 'Projects';
      case 'saved-lists': return 'Saved Lists';
      case 'bulk-search': return 'Bulk Search';
      case 'running-jobs': return 'Running Jobs';
      case 'export-center': return 'Export Center';
      case 'search-history': return 'Search History';
      case 'billing': return 'Billing & Usage';
      case 'api-keys': return 'API Integrations';
      case 'profile': return 'User Profile';
      case 'settings': return 'System Settings';
      case 'experts': return 'Hire Experts';
      default: return 'LeadIntel';
    }
  };

  return (
    <div style={{
      height: '70px',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0
    }}>
      {/* Title / Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>LeadIntel</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>/</span>
        <span style={{ color: '#ffffff', fontSize: '0.875rem', fontWeight: 600 }}>{getTitle()}</span>
      </div>

      {/* Global Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Search box */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'var(--text-muted)' 
          }} />
          <input
            type="text"
            placeholder="Search leads, projects, lists..."
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px 8px 36px',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'all var(--transition-fast)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-color)';
              e.target.style.width = '320px';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.width = '280px';
            }}
          />
        </div>

        {/* Credits Badge */}
        <button 
          onClick={() => setActiveTab('billing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(37, 99, 235, 0.1)'}
        >
          <Coins size={14} style={{ color: 'var(--accent-hover)' }} />
          <span style={{ color: 'var(--accent-hover)' }}>{credits.toLocaleString()}</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Credits</span>
        </button>

        {/* Notifications Icon */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={18} style={{ color: 'var(--text-secondary)' }} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '6px',
            height: '6px',
            backgroundColor: 'var(--danger)',
            borderRadius: '50%'
          }}></span>
        </div>

        {/* Profile Dropdown Trigger */}
        <div 
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-color)',
            backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid var(--border-color)'
          }} />
        </div>

        <span style={{ height: '20px', width: '1px', backgroundColor: 'var(--border-color)' }}></span>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>

      </div>
    </div>
  );
};

export default Navbar;

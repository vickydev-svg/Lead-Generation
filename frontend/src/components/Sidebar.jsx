import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  FolderKanban, 
  ClipboardList, 
  Activity, 
  UserCheck, 
  History, 
  CreditCard, 
  Key, 
  Settings,
  Flame
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search-leads', label: 'Search Leads', icon: Search },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'saved-lists', label: 'Lead Lists', icon: ClipboardList },
    { id: 'running-jobs', label: 'Jobs', icon: Activity },
    { id: 'experts', label: 'Experts', icon: UserCheck },
    { id: 'search-history', label: 'Search History', icon: History },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{
      width: '260px',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0
    }}>
      {/* Logo Header */}
      <div style={{
        padding: '24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          backgroundColor: 'var(--accent-color)',
          color: '#ffffff',
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px var(--accent-glow)'
        }}>
          <Flame size={18} fill="#ffffff" />
        </div>
        <span style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: '#ffffff'
        }}>
          LeadIntel
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{
        flex: 1,
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        overflowY: 'auto'
      }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all var(--transition-fast)',
                borderLeft: isActive ? '3px solid var(--accent-color)' : '3px solid transparent',
                paddingLeft: isActive ? '11px' : '14px' // adjust for border shift
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Icon size={18} style={{ 
                color: isActive ? 'var(--accent-color)' : 'var(--text-muted)',
                transition: 'color var(--transition-fast)'
              }} />
              <span>{item.label}</span>
              
              {item.id === 'running-jobs' && (
                <span style={{
                  marginLeft: 'auto',
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--success)',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700
                }}>
                  3 Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Quick Switch Info / Support footer */}
      <div style={{
        padding: '16px 16px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          color: '#ffffff',
          fontSize: '0.9rem'
        }}>
          JD
        </div>
        <div style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1
        }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>John Doe</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>john@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

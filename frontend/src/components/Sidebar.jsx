import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  ListChecks,
  ClipboardList, 
  History, 
  CreditCard, 
  User,
  Settings,
  Flame,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user, leadsCount }) => {
  const initials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const menuItems = [
    { id: 'dashboard',      label: 'Dashboard',    icon: LayoutDashboard },
    { id: 'search-leads',   label: 'Search Leads', icon: Search },
    { id: 'search-results', label: 'My Leads',     icon: ListChecks,   badge: leadsCount > 0 ? leadsCount : null },
    { id: 'saved-lists',    label: 'Saved Lists',  icon: ClipboardList },
    { id: 'search-history', label: 'History',      icon: History },
    { id: 'billing',        label: 'Billing',      icon: CreditCard },
  ];

  const bottomItems = [
    { id: 'profile',  label: 'Profile',  icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const NavButton = ({ item }) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return (
      <button
        onClick={() => setActiveTab(item.id)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          padding: '11px 14px',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          backgroundColor: isActive ? 'rgba(37,99,235,0.15)' : 'transparent',
          color: isActive ? '#ffffff' : 'var(--text-secondary)',
          fontWeight: isActive ? 600 : 500,
          fontSize: '0.875rem',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all var(--transition-fast)',
          borderLeft: isActive ? '3px solid var(--accent-color)' : '3px solid transparent',
          paddingLeft: isActive ? '11px' : '14px',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
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
        <Icon size={17} style={{ color: isActive ? 'var(--accent-color)' : 'var(--text-muted)', flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{item.label}</span>
        {item.badge && (
          <span style={{
            backgroundColor: 'var(--accent-color)',
            color: '#ffffff',
            fontSize: '0.65rem',
            padding: '2px 6px',
            borderRadius: '999px',
            fontWeight: 700,
            minWidth: '20px',
            textAlign: 'center'
          }}>
            {item.badge > 999 ? '999+' : item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div style={{
      width: '230px',
      backgroundColor: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      flexShrink: 0
    }}>
      {/* Logo */}
      <div style={{
        padding: '22px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{
          backgroundColor: 'var(--accent-color)',
          color: '#ffffff',
          width: '30px',
          height: '30px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px var(--accent-glow)',
          flexShrink: 0
        }}>
          <Flame size={16} fill="#ffffff" />
        </div>
        <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
          LeadIntel
        </span>
      </div>

      {/* Main Nav */}
      <div style={{ flex: 1, padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 6px', marginBottom: '4px' }}>
          Main
        </span>
        {menuItems.map(item => <NavButton key={item.id} item={item} />)}

        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '12px 0' }} />
        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 6px', marginBottom: '4px' }}>
          Account
        </span>
        {bottomItems.map(item => <NavButton key={item.id} item={item} />)}
      </div>

      {/* User Footer */}
      <div style={{
        padding: '14px 14px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        transition: 'background var(--transition-fast)'
      }}
        onClick={() => setActiveTab('profile')}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          backgroundColor: 'var(--accent-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, color: '#ffffff', fontSize: '0.85rem', flexShrink: 0
        }}>
          {initials}
        </div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.fullName || 'My Account'}
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.email || ''}
          </p>
        </div>
        <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
      </div>
    </div>
  );
};

export default Sidebar;

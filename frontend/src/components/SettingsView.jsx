import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Download, 
  Users, 
  Share2, 
  Shield, 
  CreditCard,
  Volume2
} from 'lucide-react';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('general');

  // Form states
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('English');
  const [exportFormat, setExportFormat] = useState('CSV');
  const [enableSound, setEnableSound] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [browserNotif, setBrowserNotif] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'exports', label: 'Export Settings', icon: Download },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Share2 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing Settings', icon: CreditCard },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings updated successfully!');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          System Settings
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Configure application preferences, team workflows, and global export formats.
        </p>
      </div>

      {/* Main Grid: Tabs Left, Content Right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 2.2fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        
        {/* Left Vertical Tabs list */}
        <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 14px',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={16} style={{ color: isActive ? 'var(--accent-hover)' : 'var(--text-muted)' }} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Content Panel */}
        <form onSubmit={handleSave} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {activeTab === 'general' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
              <h3 style={{ fontSize: '1.0rem', fontWeight: 700, margin: 0, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                General System Settings
              </h3>

              {/* Theme (Radio list) */}
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">UI Theme Mode</label>
                <div style={{ display: 'flex', gap: '24px', marginTop: '6px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={theme === 'dark'}
                      onChange={() => setTheme('dark')}
                      style={{ cursor: 'pointer', accentColor: 'var(--accent-color)' }}
                    />
                    <span>Dark Theme (Recommended)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={theme === 'light'}
                      onChange={() => {
                        setTheme('light');
                        alert('Light mode is simulated; dark design elements remain active.');
                      }}
                      style={{ cursor: 'pointer', accentColor: 'var(--accent-color)' }}
                    />
                    <span>Light Theme</span>
                  </label>
                </div>
              </div>

              {/* Language */}
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">Default Language</label>
                <select
                  className="input-field"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="English">English (US)</option>
                  <option value="Spanish">Español (ES)</option>
                  <option value="French">Français (FR)</option>
                  <option value="German">Deutsch (DE)</option>
                </select>
              </div>

              {/* Default Export format */}
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">Default Export Extension</label>
                <select
                  className="input-field"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="CSV">Comma Separated Values (.csv)</option>
                  <option value="XLSX">Excel Spreadsheet (.xlsx)</option>
                  <option value="JSON">Structured JSON (.json)</option>
                </select>
              </div>

              {/* Toggle checklist options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                
                {/* Sound */}
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Enable Scraper Audio alerts</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Play sound chimes when crawling jobs finish.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={enableSound} onChange={(e) => setEnableSound(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>

                {/* Email Notif */}
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Digests</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Receive daily lists of leads scraped.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>

                {/* Browser Notif */}
                <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Browser Push Alerts</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Receive notifications in the background.</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={browserNotif} onChange={(e) => setBrowserNotif(e.target.checked)} />
                    <span className="slider"></span>
                  </label>
                </div>

              </div>

            </div>
          )}

          {activeTab !== 'general' && (
            <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--text-secondary)' }} className="animate-fade-in">
              <Settings size={32} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', marginBottom: '6px' }}>{tabs.find(t => t.id === activeTab)?.label}</h3>
              <p style={{ fontSize: '0.8rem', margin: 0 }}>This settings module configuration is simulated. General settings is fully operational.</p>
            </div>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '18px',
            marginTop: '10px'
          }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
              Save Settings
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default SettingsView;

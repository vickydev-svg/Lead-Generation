import React, { useState } from 'react';
import { User, Mail, Building, Clock, Save, ShieldAlert } from 'lucide-react';

const ProfileView = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [company, setCompany] = useState('Acme Inc.');
  const [timezone, setTimezone] = useState('(UTC-05:00) Eastern Time (US & Canada)');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    const oldP = prompt('Enter old password:');
    if (!oldP) return;
    const newP = prompt('Enter new password:');
    if (!newP) return;
    alert('Password updated successfully!');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          User Profile
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Manage your personal account settings, company details, and timezone parameters.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSave} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Avatar Upload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-color)',
            backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid var(--border-color)',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }} />
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 4px 0' }}>Profile Picture</h3>
            <button 
              type="button" 
              onClick={() => alert('Image upload simulation.')}
              className="btn btn-secondary btn-xs"
            >
              Upload New Image
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="input-group" style={{ margin: 0 }}>
          <label className="input-label">Full Name</label>
          <div style={{ position: 'relative' }}>
            <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', paddingLeft: '38px' }}
            />
          </div>
        </div>

        {/* Email */}
        <div className="input-group" style={{ margin: 0 }}>
          <label className="input-label">Email Address</label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', paddingLeft: '38px' }}
            />
          </div>
        </div>

        {/* Company */}
        <div className="input-group" style={{ margin: 0 }}>
          <label className="input-label">Company / Organization</label>
          <div style={{ position: 'relative' }}>
            <Building size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-field"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{ width: '100%', paddingLeft: '38px' }}
            />
          </div>
        </div>

        {/* Timezone */}
        <div className="input-group" style={{ margin: 0 }}>
          <label className="input-label">Timezone</label>
          <div style={{ position: 'relative' }}>
            <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select
              className="input-field"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              style={{ width: '100%', paddingLeft: '38px', cursor: 'pointer' }}
            >
              <option value="(UTC-05:00) Eastern Time (US & Canada)">(UTC-05:00) Eastern Time (US & Canada)</option>
              <option value="(UTC-08:00) Pacific Time (US & Canada)">(UTC-08:00) Pacific Time (US & Canada)</option>
              <option value="(UTC+00:00) Greenwich Mean Time">(UTC+00:00) Greenwich Mean Time</option>
              <option value="(UTC+05:30) Chennai, Kolkata, Mumbai">(UTC+05:30) Chennai, Kolkata, Mumbai</option>
            </select>
          </div>
        </div>

        {/* Actions bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '20px'
        }}>
          <button 
            type="button" 
            onClick={handleChangePassword} 
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShieldAlert size={16} />
            <span>Change Password</span>
          </button>

          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
          >
            <Save size={16} />
            <span>Save Profile</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default ProfileView;

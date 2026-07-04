import React, { useState } from 'react';
import { User, Mail, Building, Clock, Save, ShieldAlert, CheckCircle, AlertCircle } from 'lucide-react';
import { apiClient } from '../apiClient';

const ProfileView = ({ user, onUserUpdated }) => {
  const currentUser = user || apiClient.getCurrentUser() || {};

  const [name, setName] = useState(currentUser.fullName || '');
  const [email] = useState(currentUser.email || '');
  const [company, setCompany] = useState(currentUser.company || '');
  const [timezone, setTimezone] = useState('(UTC+05:30) Chennai, Kolkata, Mumbai');

  // Password change states
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [saveMsg, setSaveMsg] = useState('');
  const [saveError, setSaveError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveMsg('');
    setSaveError('');
    setLoading(true);
    try {
      await apiClient.updateProfile(name.trim(), company.trim());
      setSaveMsg('Profile updated successfully!');
      if (onUserUpdated) onUserUpdated({ ...currentUser, fullName: name.trim(), company: company.trim() });
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setSaveMsg('');
    setSaveError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setSaveError('Please fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSaveError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setSaveError('New password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await apiClient.changePassword(currentPassword, newPassword);
      setSaveMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  // Avatar initials
  const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
          User Profile
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Manage your personal account settings and company details.
        </p>
      </div>

      {/* Status Messages */}
      {saveMsg && (
        <div style={{
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          color: 'var(--success)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={16} />
          {saveMsg}
        </div>
      )}
      {saveError && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          color: 'var(--danger)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertCircle size={16} />
          {saveError}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#ffffff',
            border: '2px solid var(--border-color)',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            flexShrink: 0
          }}>
            {initials}
          </div>
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 2px 0', color: '#ffffff' }}>{name || 'Your Name'}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{email}</span>
          </div>
        </div>

        {/* Full Name */}
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
              placeholder="Your full name"
            />
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="input-group" style={{ margin: 0 }}>
          <label className="input-label">Email Address <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>(cannot change)</span></label>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="email"
              className="input-field"
              value={email}
              readOnly
              style={{ width: '100%', paddingLeft: '38px', opacity: 0.6, cursor: 'not-allowed' }}
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
              placeholder="Your company name"
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
              <option value="(UTC-05:00) Eastern Time">(UTC-05:00) Eastern Time (US &amp; Canada)</option>
              <option value="(UTC-08:00) Pacific Time">(UTC-08:00) Pacific Time (US &amp; Canada)</option>
              <option value="(UTC+00:00) Greenwich Mean Time">(UTC+00:00) Greenwich Mean Time</option>
              <option value="(UTC+05:30) Chennai, Kolkata, Mumbai">(UTC+05:30) Chennai, Kolkata, Mumbai</option>
            </select>
          </div>
        </div>

        {/* Actions */}
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
            onClick={() => { setSaveError(''); setSaveMsg(''); setShowPasswordForm(!showPasswordForm); }}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShieldAlert size={16} />
            <span>Change Password</span>
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
          >
            <Save size={16} />
            <span>{loading ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>

      {/* Password Change Form */}
      {showPasswordForm && (
        <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>Change Password</h3>

          <div className="input-group" style={{ margin: 0 }}>
            <label className="input-label">Current Password</label>
            <input
              type="password"
              className="input-field"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Your current password"
            />
          </div>

          <div className="input-group" style={{ margin: 0 }}>
            <label className="input-label">New Password</label>
            <input
              type="password"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
            />
          </div>

          <div className="input-group" style={{ margin: 0 }}>
            <label className="input-label">Confirm New Password</label>
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowPasswordForm(false)} className="btn btn-secondary">
              Cancel
            </button>
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={loading}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ShieldAlert size={16} />
              <span>{loading ? 'Updating...' : 'Update Password'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;

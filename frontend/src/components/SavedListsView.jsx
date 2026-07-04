import React, { useState } from 'react';
import { ClipboardList, Plus, Download, Trash2, Edit2 } from 'lucide-react';

const SavedListsView = ({ lists, onCreateList, onDeleteList, onExportList }) => {
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    onCreateList(newListName.trim(), []);
    setNewListName('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
            Saved Lead Lists
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Custom segments, tags, and groups of leads prepared for export or CRM sync.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} />
          <span>Create New List</span>
        </button>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {lists.map((list) => (
          <div key={list.id} className="card" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid rgba(37, 99, 235, 0.2)',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--accent-hover)'
              }}>
                <ClipboardList size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: '0 0 2px 0' }}>
                  {list.name}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {list.leadsCount} leads in segment
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                onClick={() => {
                  onExportList(list.id);
                  alert(`Exported list "${list.name}" to Export Center!`);
                }}
                className="btn btn-secondary btn-xs"
                style={{ padding: '8px' }}
                title="Download List"
              >
                <Download size={14} />
              </button>
              
              <button 
                onClick={() => {
                  if (window.confirm(`Delete list "${list.name}"?`)) onDeleteList(list.id);
                }}
                className="btn btn-danger btn-xs"
                style={{ padding: '8px' }}
                title="Delete List"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create List Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0' }}>Create Lead List</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">List Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Dental Clinic Contacts"
                  className="input-field"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SavedListsView;

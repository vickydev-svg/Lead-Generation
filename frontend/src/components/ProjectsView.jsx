import React, { useState } from 'react';
import { FolderKanban, Plus, Calendar, Layers, Trash2 } from 'lucide-react';

const ProjectsView = ({ projects, onCreateProject, onDeleteProject }) => {
  const [showModal, setShowModal] = useState(false);
  const [newProjName, setNewProjName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProjName.trim()) return;
    onCreateProject(newProjName.trim());
    setNewProjName('');
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
            Projects
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Organize your scraped leads, searches, and export queues into specific campaigns.
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} />
          <span>Create Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {projects.map((proj) => (
          <div key={proj.id} className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative'
          }}>
            {/* Delete button */}
            <button
              onClick={() => {
                if (window.confirm(`Delete project "${proj.name}"?`)) onDeleteProject(proj.id);
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
              title="Delete Project"
            >
              <Trash2 size={16} />
            </button>

            {/* Icon & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--accent-hover)'
              }}>
                <FolderKanban size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
                  {proj.name}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Active Campaign
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              borderTop: '1px solid var(--border-color)',
              borderBottom: '1px solid var(--border-color)',
              padding: '12px 0'
            }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>
                  Total Leads
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#ffffff', marginTop: '2px', display: 'block' }}>
                  {proj.leadsCount.toLocaleString()}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', fontWeight: 600, textTransform: 'uppercase' }}>
                  Lists
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#ffffff', marginTop: '2px', display: 'block' }}>
                  {proj.listsCount || 1}
                </strong>
              </div>
            </div>

            {/* Timestamps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={12} />
                <span>Created {proj.created}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={12} />
                <span>Updated {proj.updated}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modal Dialog for New Project */}
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
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0' }}>Create New Project</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lawyers California"
                  className="input-field"
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectsView;

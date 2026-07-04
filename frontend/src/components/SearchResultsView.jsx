import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Grid, 
  Save, 
  Download, 
  Search, 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Check,
  Globe,
  Mail,
  PhoneCall
} from 'lucide-react';

const SearchResultsView = ({ 
  leads, 
  activeSearch, 
  onOpenDrawer, 
  onSaveList, 
  onExportLeads, 
  onDeleteLeads 
}) => {
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterWebsite, setFilterWebsite] = useState('all');
  const [filterEmail, setFilterEmail] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Select/Deselect all rows in a list/category
  const handleSelectAll = (e, targetLeads) => {
    const newSelected = new Set(selectedIds);
    if (e.target.checked) {
      targetLeads.forEach(lead => newSelected.add(lead.id));
    } else {
      targetLeads.forEach(lead => newSelected.delete(lead.id));
    }
    setSelectedIds(newSelected);
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Filter and search logic
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // 1. Search term (matches name, website, email)
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Rating filter
      const matchesRating = 
        filterRating === 'all' ? true :
        filterRating === '4.5+' ? lead.rating >= 4.5 :
        filterRating === '4.0+' ? lead.rating >= 4.0 :
        lead.rating < 4.0;
        
      // 3. Website filter
      const matchesWebsite = 
        filterWebsite === 'all' ? true :
        filterWebsite === 'yes' ? lead.website !== '-' :
        lead.website === '-';

      // 4. Email filter
      const matchesEmail = 
        filterEmail === 'all' ? true :
        filterEmail === 'yes' ? lead.email !== '-' :
        lead.email === '-';

      return matchesSearch && matchesRating && matchesWebsite && matchesEmail;
    });
  }, [leads, searchTerm, filterRating, filterWebsite, filterEmail]);

  const [expandedCategories, setExpandedCategories] = useState({});

  const groupedLeads = useMemo(() => {
    const groups = {};
    filteredLeads.forEach(lead => {
      const cat = lead.category || 'Uncategorized';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(lead);
    });
    return groups;
  }, [filteredLeads]);

  // Default first category to open if none are set
  useEffect(() => {
    const keys = Object.keys(groupedLeads);
    if (keys.length > 0 && Object.keys(expandedCategories).length === 0) {
      setExpandedCategories({ [keys[0]]: true });
    }
  }, [groupedLeads]);

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const [exportStatus, setExportStatus] = useState('');  // '' | 'exporting' | 'done' | 'error'
  const [saveListName, setSaveListName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);

  const handleBulkExport = async () => {
    if (selectedIds.size === 0) {
      alert('Please select at least one lead to export.');
      return;
    }
    setExportStatus('exporting');
    try {
      await onExportLeads(Array.from(selectedIds));
      setExportStatus('done');
      setSelectedIds(new Set());
      setTimeout(() => setExportStatus(''), 3000);
    } catch {
      setExportStatus('error');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const handleExportAll = async () => {
    setExportStatus('exporting');
    try {
      await onExportLeads(leads.map(l => l.id));
      setExportStatus('done');
      setTimeout(() => setExportStatus(''), 3000);
    } catch {
      setExportStatus('error');
      setTimeout(() => setExportStatus(''), 3000);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Are you sure you want to delete the ${selectedIds.size} selected leads?`)) {
      onDeleteLeads(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const handleBulkAddToList = () => {
    if (selectedIds.size === 0) {
      alert('Please select leads to add to a list.');
      return;
    }
    setShowSaveInput(true);
  };

  const confirmSaveList = () => {
    const name = saveListName.trim() || `${activeSearch?.keyword || 'Search'} - ${activeSearch?.location || ''}`;
    onSaveList(name, selectedIds.size > 0 ? Array.from(selectedIds) : leads.map(l => l.id));
    setSaveListName('');
    setShowSaveInput(false);
    setSelectedIds(new Set());
  };

  // Check if all rows in a category are selected
  const isCategoryAllSelected = (categoryLeads) => {
    return categoryLeads.length > 0 && categoryLeads.every(lead => selectedIds.has(lead.id));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Export status banner */}
      {exportStatus && (
        <div style={{
          padding: '10px 16px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: exportStatus === 'done' ? 'rgba(16,185,129,0.1)' : exportStatus === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(37,99,235,0.1)',
          border: `1px solid ${exportStatus === 'done' ? 'rgba(16,185,129,0.3)' : exportStatus === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(37,99,235,0.3)'}`,
          color: exportStatus === 'done' ? 'var(--success)' : exportStatus === 'error' ? 'var(--danger)' : 'var(--accent-hover)'
        }}>
          {exportStatus === 'exporting' && '⏳ Preparing CSV download...'}
          {exportStatus === 'done' && '✅ CSV downloaded successfully!'}
          {exportStatus === 'error' && '❌ Export failed — please try again.'}
        </div>
      )}

      {/* Inline Save List input */}
      {showSaveInput && (
        <div className="card" style={{ padding: '16px', display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.3)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', flexShrink: 0 }}>List name:</span>
          <input
            type="text"
            className="input-field"
            style={{ flex: 1 }}
            placeholder={`${activeSearch?.keyword || 'Search'} - ${activeSearch?.location || ''}`}
            value={saveListName}
            onChange={e => setSaveListName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirmSaveList()}
            autoFocus
          />
          <button onClick={confirmSaveList} className="btn btn-primary btn-sm">Save</button>
          <button onClick={() => setShowSaveInput(false)} className="btn btn-secondary btn-sm">Cancel</button>
        </div>
      )}

      {/* Search Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {filteredLeads.length.toLocaleString()} Leads Found
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Search Query: <strong style={{ color: '#ffffff' }}>{activeSearch.keyword || 'Dentists'} in {activeSearch.location || 'New York'}</strong>
          </p>
        </div>

        {/* Global Toolbar buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => { setSaveListName(''); setShowSaveInput(true); }} className="btn btn-secondary btn-sm">
            <Save size={14} />
            <span>Save as List</span>
          </button>
          
          <button onClick={handleExportAll} disabled={exportStatus === 'exporting'} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={14} />
            <span>{exportStatus === 'exporting' ? 'Exporting...' : 'Export All CSV'}</span>
          </button>
        </div>
      </div>

      {/* Filters & Inner Search Row */}
      <div className="card" style={{ 
        padding: '14px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        
        {/* Drops */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Rating</span>
            <select 
              value={filterRating} 
              onChange={(e) => setFilterRating(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            >
              <option value="all">All Ratings</option>
              <option value="4.5+">4.5 ★ & Above</option>
              <option value="4.0+">4.0 ★ & Above</option>
              <option value="low">Under 4.0 ★</option>
            </select>
          </div>

          {/* Website */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Website</span>
            <select 
              value={filterWebsite} 
              onChange={(e) => setFilterWebsite(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            >
              <option value="all">All Leads</option>
              <option value="yes">Has Website</option>
              <option value="no">No Website</option>
            </select>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Email</span>
            <select 
              value={filterEmail} 
              onChange={(e) => setFilterEmail(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            >
              <option value="all">All Contacts</option>
              <option value="yes">Has Email</option>
              <option value="no">No Email</option>
            </select>
          </div>

        </div>

        {/* Text Filter Search */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search within leads..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px 6px 32px',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>

      </div>

      {/* Grouped Accordion Tables */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(groupedLeads).length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No leads found matching your criteria.
          </div>
        ) : (
          Object.entries(groupedLeads).map(([cat, leadsList]) => {
            const isOpen = !!expandedCategories[cat];
            const isAllCatSelected = isCategoryAllSelected(leadsList);
            return (
              <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Category Header (Accordion) */}
                <div 
                  onClick={() => toggleCategory(cat)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#ffffff',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(94, 106, 210, 0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.1rem' }}>📁</span>
                    <span style={{ fontFamily: 'var(--font-heading)' }}>{cat}</span>
                    <span className="badge badge-info" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{leadsList.length} leads</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{isOpen ? 'Collapse' : 'Expand'}</span>
                    <span style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}>▼</span>
                  </div>
                </div>

                {/* Table (shows only if open) */}
                {isOpen && (
                  <div className="table-container" style={{ margin: '4px 0 16px 0', animation: 'fadeIn 0.2s ease-out' }}>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>
                            <label className="checkbox-container">
                              <input 
                                type="checkbox" 
                                checked={isAllCatSelected}
                                onChange={(e) => handleSelectAll(e, leadsList)}
                              />
                              <span className="custom-checkbox"></span>
                            </label>
                          </th>
                          <th>Business Name</th>
                          <th>Rating</th>
                          <th>Reviews</th>
                          <th>Website</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>AI Score</th>
                          <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadsList.map((lead) => {
                          const isSelected = selectedIds.has(lead.id);
                          return (
                            <tr key={lead.id} style={{ backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.05)' : '' }}>
                              <td>
                                <label className="checkbox-container">
                                  <input 
                                    type="checkbox" 
                                    checked={isSelected}
                                    onChange={() => handleSelectRow(lead.id)}
                                  />
                                  <span className="custom-checkbox"></span>
                                </label>
                              </td>
                              <td style={{ fontWeight: 600 }}>
                                <span 
                                  onClick={() => onOpenDrawer(lead)}
                                  style={{ cursor: 'pointer', color: '#ffffff' }}
                                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                >
                                  {lead.name}
                                </span>
                              </td>
                              <td style={{ fontWeight: 600, color: 'var(--warning)', fontSize: '0.8rem' }}>{lead.rating} ★</td>
                              <td style={{ fontSize: '0.8rem' }}>{lead.reviews}</td>
                              
                              {/* Website */}
                              <td>
                                {lead.website && lead.website !== '-' ? (
                                  <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-hover)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                                    <Globe size={12} />
                                    <span style={{ fontSize: '0.8rem' }}>{lead.website.replace('https://', '').replace('http://', '').replace('www.', '')}</span>
                                  </a>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)' }}>-</span>
                                )}
                              </td>

                              {/* Email */}
                              <td>
                                {lead.email && lead.email !== '-' ? (
                                  <a href={`mailto:${lead.email}`} style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                                    <Mail size={12} style={{ color: 'var(--text-secondary)' }} />
                                    <span style={{ fontSize: '0.8rem' }}>{lead.email}</span>
                                  </a>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)' }}>-</span>
                                )}
                              </td>

                              {/* Phone */}
                              <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                                {lead.phone && lead.phone !== '-' ? (
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <PhoneCall size={12} style={{ color: 'var(--text-muted)' }} />
                                    {lead.phone}
                                  </span>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)' }}>-</span>
                                )}
                              </td>

                              {/* AI Score */}
                              <td>
                                <span className={`badge ${lead.aiScore >= 80 ? 'badge-success' : lead.aiScore >= 60 ? 'badge-warning' : 'badge-danger'}`}>
                                  {lead.aiScore} / 100
                                </span>
                              </td>

                              {/* Action buttons */}
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '4px' }}>
                                  <button 
                                    onClick={() => onOpenDrawer(lead)} 
                                    className="btn btn-secondary btn-xs" 
                                    style={{ minWidth: 'auto', padding: '6px' }}
                                    title="View Details"
                                  >
                                    <Eye size={12} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer controls: Bulk operations only */}
      {Object.entries(groupedLeads).length > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '10px',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {selectedIds.size} selected globally
            </span>
            
            {selectedIds.size > 0 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={handleBulkAddToList} 
                  className="btn btn-secondary btn-xs"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={12} />
                  <span>Add to List</span>
                </button>
                <button 
                  onClick={handleBulkExport} 
                  className="btn btn-secondary btn-xs"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Download size={12} />
                  <span>Export</span>
                </button>
                <button 
                  onClick={handleBulkDelete} 
                  className="btn btn-danger btn-xs"
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Trash2 size={12} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
          
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Categorized view of all target prospects
          </span>
        </div>
      )}

    </div>
  );
};

export default SearchResultsView;

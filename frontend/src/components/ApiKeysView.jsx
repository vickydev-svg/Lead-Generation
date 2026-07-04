import React, { useState } from 'react';
import { Key, Plus, Trash2, Eye, EyeOff, Check, Copy } from 'lucide-react';

const ApiKeysView = () => {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Production Key', key: 'lead_prod_a982fd09b2713f64098bc', created: '2 months ago', status: 'Active' },
    { id: '2', name: 'Development Key', key: 'lead_dev_c1248be01048b2e1719b0', created: '1 week ago', status: 'Active' },
    { id: '3', name: 'Backup Key', key: 'lead_back_b8743fd9c8241088bc018', created: '2 weeks ago', status: 'Inactive' }
  ]);
  const [webhookUrl, setWebhookUrl] = useState('https://yourdomain.com/webhook');
  const [showKeyId, setShowKeyId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCreateKey = () => {
    const name = prompt('Enter a name for the new API Key:', 'Staging Key');
    if (!name) return;
    const newKey = {
      id: Date.now().toString(),
      name,
      key: `lead_live_${Math.random().toString(36).substr(2, 16)}`,
      created: 'Just now',
      status: 'Active'
    };
    setKeys([...keys, newKey]);
  };

  const handleDeleteKey = (id) => {
    if (window.confirm('Are you sure you want to delete this API Key?')) {
      setKeys(keys.filter(k => k.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setKeys(keys.map(k => {
      if (k.id === id) {
        return {
          ...k,
          status: k.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return k;
    }));
  };

  const handleCopy = (id, keyText) => {
    navigator.clipboard.writeText(keyText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.02em' }}>
            API Keys & Integrations
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Integrate LeadIntel data directly into your custom applications or serverless routes.
          </p>
        </div>
        <button 
          onClick={handleCreateKey} 
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={16} />
          <span>Create New Key</span>
        </button>
      </div>

      {/* Keys Table Card */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Key Name</th>
              <th>API Key</th>
              <th>Created</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => {
              const isVisible = showKeyId === k.id;
              const displayKey = isVisible ? k.key : `${k.key.substring(0, 10)}••••••••••••••••`;
              return (
                <tr key={k.id}>
                  <td style={{ fontWeight: 600 }}>{k.name}</td>
                  <td>
                    <code style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>{displayKey}</code>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{k.created}</td>
                  <td>
                    <button 
                      onClick={() => toggleStatus(k.id)}
                      className={`badge ${k.status === 'Active' ? 'badge-success' : 'badge-danger'}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      {k.status}
                    </button>
                  </td>
                  
                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      
                      {/* Toggle Visibility */}
                      <button
                        onClick={() => setShowKeyId(isVisible ? null : k.id)}
                        className="btn btn-secondary btn-xs"
                        style={{ padding: '6px' }}
                        title={isVisible ? 'Hide Key' : 'Reveal Key'}
                      >
                        {isVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>

                      {/* Copy Key */}
                      <button
                        onClick={() => handleCopy(k.id, k.key)}
                        className="btn btn-secondary btn-xs"
                        style={{ padding: '6px' }}
                        title="Copy Key"
                      >
                        {copiedId === k.id ? <Check size={12} style={{ color: 'var(--success)' }} /> : <Copy size={12} />}
                      </button>

                      {/* Delete Key */}
                      <button
                        onClick={() => handleDeleteKey(k.id)}
                        className="btn btn-danger btn-xs"
                        style={{ padding: '6px' }}
                        title="Revoke Key"
                      >
                        <Trash2 size={12} />
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Webhook Configuration Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.0rem', fontWeight: 700, margin: 0 }}>Webhook Integration</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
          Receive HTTP POST alerts automatically on your servers once a map crawl or data enrichment job completes.
        </p>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            className="input-field"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://yourdomain.com/webhook-receiver"
            style={{ flex: 1 }}
          />
          <button 
            onClick={() => alert('Webhook endpoint saved successfully!')} 
            className="btn btn-primary"
            style={{ padding: '10px 24px' }}
          >
            Save Endpoint
          </button>
        </div>
      </div>

    </div>
  );
};

export default ApiKeysView;

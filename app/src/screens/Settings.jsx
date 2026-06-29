import React, { useState } from 'react';
import { StatusBar, Badge } from '../components/Shared.jsx';
import * as Ic from '../components/Icons.jsx';

const sites = [
  { icon: '🏭', name: 'Industrial Zone A', guards: 8, status: 'active', bg: '#E8F5E9' },
  { icon: '🏢', name: 'Corporate Tower B', guards: 5, status: 'active', bg: '#E3F2FD' },
  { icon: '🏗️', name: 'Warehouse Complex', guards: 6, status: 'alert',  bg: '#FFEBEE' },
  { icon: '🏪', name: 'Retail Park C',     guards: 3, status: 'active', bg: '#F3E5F5' },
  { icon: '🏨', name: 'Hotel Residence',   guards: 4, status: 'active', bg: '#FFF3E0' },
];

const settingGroups = [
  {
    label: 'Security',
    rows: [
      { icon: '🛡️', bg: '#FFEBEE', title: 'Real-Time Protection',  sub: 'Always active',        type: 'toggle', on: true  },
      { icon: '🌐', bg: '#E3F2FD', title: 'Geofencing',            sub: '5 zones configured',   type: 'arrow'              },
      { icon: '📡', bg: '#E8F5E9', title: 'Offline Mode',          sub: 'Last sync: 2 min ago', type: 'toggle', on: true  },
      { icon: '☁️', bg: '#E8F5E9', title: 'Cloud Backup',          sub: 'Auto-sync enabled',    type: 'toggle', on: true  },
    ],
  },
  {
    label: 'Role & Access',
    rows: [
      { icon: '👤', bg: '#F3E5F5', title: 'My Role',               sub: 'Supervisor',           type: 'arrow' },
      { icon: '🔑', bg: '#FFF3E0', title: 'Manage Access',         sub: '12 active users',      type: 'arrow' },
      { icon: '📋', bg: '#E3F2FD', title: 'Audit Logs',            sub: 'View all activity',    type: 'arrow' },
    ],
  },
  {
    label: 'App',
    rows: [
      { icon: '🔔', bg: '#FFF3E0', title: 'Push Notifications',    sub: 'Enabled for all alerts',type: 'toggle', on: true  },
      { icon: '🌙', bg: '#EDE7F6', title: 'Dark Mode',             sub: 'Off',                  type: 'toggle', on: false },
      { icon: '❓', bg: '#F3E5F5', title: 'Help & Support',         sub: '',                     type: 'arrow' },
      { icon: '🚪', bg: '#FFEBEE', title: 'Logout',                sub: '',                     type: 'arrow', danger: true },
    ],
  },
];

export default function Settings({ onBack, onNavigate, onLogout }) {
  const [view, setView] = useState('main'); // 'main' | 'sites' | 'profile'

  if (view === 'profile') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
        <StatusBar variant="white" />
        <div className="app-bar ab-white">
          <button className="ab-back" style={{ background: 'var(--bg-page)', color: 'var(--text)' }} onClick={() => setView('main')}>‹</button>
          <span className="ab-title">Update Details</span>
          <div style={{ width: 32 }} />
        </div>
        <div className="screen-content" style={{ background: 'var(--bg-page)', padding: '20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--red)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 12px' }}>
              R
            </div>
            <button className="btn btn-secondary btn-sm">Change Photo</button>
          </div>

          <div className="form-group mb-16">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" defaultValue="Ramesh Kumar" />
          </div>

          <div className="form-group mb-16">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" defaultValue="+91 9876543210" disabled style={{ background: 'var(--bg-page)' }} />
          </div>

          <div className="form-group mb-16">
            <label className="form-label">Emergency Contact</label>
            <input type="tel" className="form-input" placeholder="Emergency Number" />
          </div>

          <div className="form-group mb-24">
            <label className="form-label">Blood Group</label>
            <select className="form-select">
              <option>O+</option>
              <option>A+</option>
              <option>B+</option>
              <option>AB+</option>
              <option>O-</option>
            </select>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setView('main')}>Save Changes</button>

        </div>
      </div>
    );
  }

  if (view === 'sites') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
        <StatusBar variant="white" />
        <div className="app-bar ab-white">
          <button className="ab-back" style={{ background: 'var(--bg-page)', color: 'var(--text)' }} onClick={() => setView('main')}>‹</button>
          <span className="ab-title">Multi-Site Management</span>
          <button style={{ background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 'var(--r-sm)', padding: '6px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Add</button>
        </div>
        <div className="screen-content" style={{ background: 'var(--bg-page)', paddingTop: 12 }}>
          {/* Summary Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, padding: '0 18px 14px' }}>
            {[{ val: '5', label: 'Total Sites', color: 'var(--blue)' }, { val: '24', label: 'Active Guards', color: 'var(--green)' }, { val: '1', label: 'Alerts', color: 'var(--red)' }].map((s, i) => (
              <div key={i} style={{ background: 'var(--bg)', borderRadius: 'var(--r)', padding: '14px 10px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--text-sub)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
          {sites.map((s, i) => (
            <div className="site-card" key={i}>
              <div className="site-icon" style={{ background: s.bg }}>{s.icon}</div>
              <div className="site-info">
                <div className="site-name">{s.name}</div>
                <div className="site-detail">👮 {s.guards} guards · {s.status === 'alert' ? '⚠ Alert active' : '✓ All clear'}</div>
              </div>
              <Badge type={s.status === 'active' ? 'green' : 'red'} label={s.status === 'active' ? 'Active' : 'Alert'} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      <StatusBar variant="dark" />
      <div className="settings-header">
        <div className="settings-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Settings
          <button className="ab-back" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 20 }} onClick={onBack}>×</button>
        </div>
        <div className="profile-card-wrap" onClick={() => setView('profile')} style={{ cursor: 'pointer' }}>
          <div className="profile-avatar-big">R</div>
          <div style={{ flex: 1 }}>
            <div className="p-name">Ramesh Kumar</div>
            <div className="p-role">ramesh@securewatch.in</div>
          </div>
          <Ic.Edit size={16} color="rgba(255,255,255,0.7)" />
        </div>
      </div>

      <div className="screen-content" style={{ background: 'var(--bg-page)' }}>
        {/* Multi-site shortcut */}
        <div style={{ margin: '14px 18px 0' }}>
          <div
            onClick={() => setView('sites')}
            style={{
              background: 'linear-gradient(135deg, #1E88E5, #0D47A1)',
              borderRadius: 'var(--r)', padding: '16px',
              display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(30,136,229,0.35)',
            }}
          >
            <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.2)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🌐</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>Multi-Site Management</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>5 sites · 24 active guards</div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>›</span>
          </div>
        </div>

        {settingGroups.map((group, gi) => (
          <div key={gi}>
            <div className="settings-group-label">{group.label}</div>
            <div className="settings-group">
              {group.rows.map((row, ri) => (
                <div 
                  className="setting-row" 
                  key={ri}
                  onClick={() => {
                    if (row.title === 'Logout' && onLogout) onLogout();
                  }}
                  style={{ cursor: row.title === 'Logout' ? 'pointer' : 'default' }}
                >
                  <div className="sr-icon-wrap" style={{ background: row.bg }}>{row.icon}</div>
                  <div className="sr-text">
                    <div className="sr-title" style={row.danger ? { color: 'var(--red)' } : {}}>{row.title}</div>
                    {row.sub && <div className="sr-sub">{row.sub}</div>}
                  </div>
                  {row.type === 'toggle' ? (
                    <div className={`toggle ${row.on ? 'on' : 'off'}`}><div className="toggle-ball" /></div>
                  ) : (
                    <div className="sr-arrow">›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

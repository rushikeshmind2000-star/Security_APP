import React from 'react';

/* ─── Status Bar ─────────────────────────────── */
export function StatusBar({ variant = 'white' }) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  return (
    <div className={`status-bar s-${variant}`}>
      <span>{time}</span>
      <div className="status-icons">
        <span style={{ fontSize: 10 }}>●●●</span>
        <span>WiFi</span>
        <span>🔋</span>
      </div>
    </div>
  );
}

/* ─── App Bar ────────────────────────────────── */
export function AppBar({ title, variant = 'white', onBack, onBell, onAvatar, showBack = true }) {
  return (
    <div className={`app-bar ab-${variant}`}>
      {showBack
        ? <button className="ab-back" onClick={onBack}>‹</button>
        : <div style={{ width: 34 }} />
      }
      <span className="ab-title">{title}</span>
      <div className="ab-actions">
        <div className="ab-icon-btn" onClick={onBell}>
          🔔
          <span className="notif-badge" />
        </div>
        <div className="ab-avatar" onClick={onAvatar}>S</div>
      </div>
    </div>
  );
}

/* ─── Bottom Nav ─────────────────────────────── */
const NAV_TABS = [
  { id: 'home',    icon: '🏠', label: 'Home'   },
  { id: 'guards',  icon: '👮', label: 'Guards' },
  { id: 'sos',     icon: '🚨', label: 'SOS',   isSOS: true },
  { id: 'patrol',  icon: '🛡️', label: 'Patrol' },
  { id: 'reports', icon: '📊', label: 'Reports'},
];

export function BottomNav({ active, onChange }) {
  return (
    <div className="bottom-nav">
      {NAV_TABS.map(t => {
        if (t.isSOS) {
          return (
            <div key={t.id} className="nav-sos-btn" onClick={() => onChange('sos')} title="SOS">
              🚨
            </div>
          );
        }
        return (
          <div
            key={t.id}
            className={`nav-item ${active === t.id ? 'active' : ''}`}
            onClick={() => onChange(t.id)}
          >
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label">{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Sub Tabs ───────────────────────────────── */
export function SubTabs({ tabs, active, onChange }) {
  return (
    <div className="sub-tabs">
      {tabs.map(t => (
        <div
          key={t}
          className={`sub-tab ${active === t ? 'active' : ''}`}
          onClick={() => onChange(t)}
        >{t}</div>
      ))}
    </div>
  );
}

/* ─── Section Title ──────────────────────────── */
export function SectionTitle({ title, action, onAction }) {
  return (
    <div className="section-title-row">
      <span className="section-title">{title}</span>
      {action && <span className="section-action" onClick={onAction}>{action}</span>}
    </div>
  );
}

/* ─── Badge ──────────────────────────────────── */
export function Badge({ type = 'green', label }) {
  return <span className={`badge b-${type}`}>{label}</span>;
}

/* ─── Location Card ──────────────────────────── */
export function LocationCard() {
  return (
    <div className="location-card">
      <div className="loc-avatar">👮</div>
      <div>
        <div className="loc-label">Current Location <span className="loc-pin">📍</span></div>
        <div className="loc-sub">Gate No. 4, Block C, Industrial Zone</div>
      </div>
    </div>
  );
}

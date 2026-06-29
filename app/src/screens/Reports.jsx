import React, { useState } from 'react';
import { StatusBar, AppBar, SubTabs, SectionTitle, Badge } from '../components/Shared.jsx';

const barData = [
  { day: 'Mon', val: 3, color: '#EF9A9A' },
  { day: 'Tue', val: 5, color: '#EF9A9A' },
  { day: 'Wed', val: 2, color: '#EF9A9A' },
  { day: 'Thu', val: 7, color: '#E53935' },
  { day: 'Fri', val: 4, color: '#EF9A9A' },
  { day: 'Sat', val: 1, color: '#EF9A9A' },
  { day: 'Sun', val: 0, color: '#EF9A9A' },
];
const maxVal = Math.max(...barData.map(d => d.val));

const incidents = [
  { title: 'Unauthorized Entry Attempt', time: '08:32 AM', desc: 'Unknown individual tried to enter Gate B without badge. Intercepted by guard Ramesh Kumar.', loc: 'Gate B · Block 1', severity: 'red',    sLabel: 'High'   },
  { title: 'Suspicious Package Found',   time: '10:15 AM', desc: 'Unattended bag found near Parking Zone A. Bomb squad notified and area cordoned.', loc: 'Parking Zone A', severity: 'red',    sLabel: 'High'   },
  { title: 'Guard Off-Route Alert',      time: '11:45 AM', desc: 'Guard Deepak Verma deviated from assigned patrol route for 8 minutes.', loc: 'Server Room B2', severity: 'orange', sLabel: 'Medium' },
  { title: 'CCTV Offline – Sector 3',   time: '01:20 PM', desc: 'Camera feed from Sector 3 went offline. Technical team dispatched.', loc: 'Sector 3 · East Wing', severity: 'orange', sLabel: 'Medium' },
  { title: 'Fire Alarm Triggered',       time: '03:05 PM', desc: 'Fire alarm activated in B-Wing cafeteria. False alarm confirmed after inspection.', loc: 'B-Wing Cafeteria', severity: 'blue',   sLabel: 'Info'   },
];

const donutData = [
  { label: 'On Duty',   val: 18, pct: 75, color: '#43A047' },
  { label: 'On Break',  val: 4,  pct: 17, color: '#FB8C00' },
  { label: 'Alert',     val: 2,  pct: 8,  color: '#E53935' },
];

const metrics = [
  { icon: '🛡️', val: '98%',  label: 'Coverage'    },
  { icon: '⚡', val: '4.2m', label: 'Avg Response' },
  { icon: '📍', val: '12',   label: 'Sites Live'   },
];

export default function Reports({ onBack, onBell, onAvatar }) {
  const [tab, setTab] = useState('Analytics');
  const [filter, setFilter] = useState('All');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      <StatusBar variant="dark" />
      <div className="reports-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="reports-title">Reports</div>
            <div className="reports-sub">Overview & Incidents</div>
          </div>
          <div className="ab-avatar" onClick={onAvatar}>S</div>
        </div>
      </div>

      <SubTabs tabs={['Analytics', 'Incidents']} active={tab} onChange={setTab} />

      <div className="screen-content" style={{ background: 'var(--bg-page)' }}>

        {/* ── Analytics Tab ── */}
        {tab === 'Analytics' && (
          <>
            {/* Metric Cards */}
            <div className="metric-row" style={{ paddingTop: 14 }}>
              {metrics.map((m, i) => (
                <div className="metric-card" key={i}>
                  <div className="mc-icon">{m.icon}</div>
                  <div className="mc-val">{m.val}</div>
                  <div className="mc-label">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="bar-chart-wrap">
              <div className="chart-title">Weekly Incidents</div>
              <div className="bar-chart">
                {barData.map((d, i) => (
                  <div className="bar-col" key={i}>
                    <div className="bar-val">{d.val}</div>
                    <div
                      className="bar-fill"
                      style={{
                        height: maxVal > 0 ? `${(d.val / maxVal) * 80}px` : '4px',
                        background: d.color,
                      }}
                    />
                    <div className="bar-label">{d.day}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="donut-wrap">
              <div className="chart-title">Guard Status Distribution</div>
              <div className="donut-content">
                <svg width="90" height="90" viewBox="0 0 90 90">
                  {(() => {
                    let offset = 0;
                    const r = 32, cx = 45, cy = 45;
                    const circ = 2 * Math.PI * r;
                    return donutData.map((d, i) => {
                      const dash = (d.pct / 100) * circ;
                      const el = (
                        <circle key={i} cx={cx} cy={cy} r={r}
                          fill="none" stroke={d.color} strokeWidth="14"
                          strokeDasharray={`${dash} ${circ - dash}`}
                          strokeDashoffset={-offset}
                          style={{ transform: 'rotate(-90deg)', transformOrigin: '45px 45px' }}
                        />
                      );
                      offset += dash;
                      return el;
                    });
                  })()}
                  <text x="45" y="49" textAnchor="middle" fontSize="13" fontWeight="900" fill="#212121">24</text>
                </svg>
                <div className="donut-legend">
                  {donutData.map((d, i) => (
                    <div className="dl-item" key={i}>
                      <div className="dl-dot" style={{ background: d.color }} />
                      <span className="dl-text">{d.label}</span>
                      <span className="dl-val">{d.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cloud Sync Banner */}
            <div style={{
              margin: '0 18px 14px', background: 'var(--blue-soft)',
              borderRadius: 'var(--r)', padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 22 }}>☁️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>Cloud Sync Active</div>
                <div style={{ fontSize: 11, color: 'var(--text-sub)', marginTop: 2 }}>Last synced: 2 minutes ago</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)' }}>ONLINE</span>
            </div>
          </>
        )}

        {/* ── Incidents Tab ── */}
        {tab === 'Incidents' && (
          <>
            <div className="filter-chips" style={{ paddingTop: 12 }}>
              {['All', 'High', 'Medium', 'Info'].map(f => (
                <div key={f} className={`chip ${filter === f ? 'chip-active' : 'chip-inactive'}`} onClick={() => setFilter(f)}>{f}</div>
              ))}
            </div>
            {incidents
              .filter(inc => filter === 'All' || inc.sLabel === filter)
              .map((inc, i) => (
                <div className="incident-card" key={i}>
                  <div className="ic-top">
                    <div className="ic-title">{inc.title}</div>
                    <div className="ic-time">{inc.time}</div>
                  </div>
                  <div className="ic-desc">{inc.desc}</div>
                  <div className="ic-footer">
                    <span className="ic-location">📍 {inc.loc}</span>
                    <Badge type={inc.severity} label={inc.sLabel} />
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

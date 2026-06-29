import React, { useState } from 'react';
import { StatusBar, AppBar, SubTabs, SectionTitle, Badge, LocationCard } from '../components/Shared.jsx';

const guards = [
  { id: 1, name: 'Ramesh Kumar',  post: 'Gate A · Block 1',   loc: '28.6139° N, 77.2090° E', ping: '30s ago', color: '#E53935', initials: 'RK', status: 'active' },
  { id: 2, name: 'Suresh Yadav',  post: 'Main Entrance',       loc: '28.6145° N, 77.2095° E', ping: '1m ago',  color: '#1E88E5', initials: 'SY', status: 'active' },
  { id: 3, name: 'Mohan Singh',   post: 'Parking Zone B',      loc: '28.6130° N, 77.2082° E', ping: '3m ago',  color: '#43A047', initials: 'MS', status: 'break'  },
  { id: 4, name: 'Deepak Verma',  post: 'Server Room · B2',    loc: '28.6155° N, 77.2102° E', ping: '5m ago',  color: '#8E24AA', initials: 'DV', status: 'alert'  },
  { id: 5, name: 'Anil Sharma',   post: 'Roof Top',            loc: '28.6160° N, 77.2108° E', ping: '2m ago',  color: '#FB8C00', initials: 'AS', status: 'active' },
];

const shifts = [
  {
    title: 'Morning Shift', time: '06:00 AM – 02:00 PM', status: 'active',
    site: 'Industrial Zone A', count: 4,
    guards: [
      { name: 'Ramesh Kumar', initials: 'RK', color: '#E53935' },
      { name: 'Suresh Yadav', initials: 'SY', color: '#1E88E5' },
      { name: 'Anil Sharma',  initials: 'AS', color: '#FB8C00' },
      { name: 'Dev Patel',    initials: 'DP', color: '#43A047' },
    ]
  },
  {
    title: 'Evening Shift', time: '02:00 PM – 10:00 PM', status: 'upcoming',
    site: 'Corporate Tower B', count: 3,
    guards: [
      { name: 'Mohan Singh',  initials: 'MS', color: '#43A047' },
      { name: 'Deepak Verma', initials: 'DV', color: '#8E24AA' },
      { name: 'Raj Kumar',    initials: 'RJ', color: '#00897B' },
    ]
  },
  {
    title: 'Night Shift', time: '10:00 PM – 06:00 AM', status: 'upcoming',
    site: 'Warehouse Complex', count: 5,
    guards: [
      { name: 'Vikas Gupta',  initials: 'VG', color: '#E53935' },
      { name: 'Sanjay Tiwari',initials: 'ST', color: '#1E88E5' },
    ]
  },
];

const attendees = [
  { name: 'Ramesh Kumar', initials: 'RK', color: '#E53935', checkin: '05:58 AM', checkout: null,     status: 'present' },
  { name: 'Suresh Yadav', initials: 'SY', color: '#1E88E5', checkin: '06:05 AM', checkout: null,     status: 'late'    },
  { name: 'Mohan Singh',  initials: 'MS', color: '#43A047', checkin: '06:01 AM', checkout: null,     status: 'present' },
  { name: 'Deepak Verma', initials: 'DV', color: '#8E24AA', checkin: '—',        checkout: '—',      status: 'absent'  },
  { name: 'Anil Sharma',  initials: 'AS', color: '#FB8C00', checkin: '06:00 AM', checkout: null,     status: 'present' },
];

const statusMap = {
  active: { label: 'On Duty', type: 'green'  },
  break:  { label: 'Break',   type: 'orange' },
  alert:  { label: 'Alert',   type: 'red'    },
};

export default function Guards({ onBack, onBell, onAvatar }) {
  const [tab, setTab] = useState('Guards');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      <StatusBar variant="white" />
      <AppBar title="Guard Management" variant="white" showBack={false} onBell={onBell} onAvatar={onAvatar} />
      <SubTabs tabs={['Guards', 'Shifts', 'Attendance']} active={tab} onChange={setTab} />

      <div className="screen-content" style={{ background: 'var(--bg-page)' }}>

        {/* ── Guards Tab ── */}
        {tab === 'Guards' && (
          <>
            <div className="search-bar">
              <span>🔍</span>
              <input placeholder="Search guard by name, post..." readOnly />
            </div>
            <div className="filter-chips">
              {['All', 'On Duty', 'Break', 'Alert'].map((c, i) => (
                <div key={c} className={`chip ${i === 0 ? 'chip-active' : 'chip-inactive'}`}>{c}</div>
              ))}
            </div>
            <div style={{ paddingBottom: 16 }}>
              {guards.map(g => {
                const st = statusMap[g.status];
                return (
                  <div className="guard-card" key={g.id}>
                    <div className="gc-avatar" style={{ background: g.color }}>
                      {g.initials}
                      <div className={`gc-status-dot dot-${g.status === 'active' ? 'green' : g.status === 'break' ? 'orange' : 'red'}`} />
                    </div>
                    <div className="gc-info">
                      <div className="gc-name">{g.name}</div>
                      <div className="gc-post">📍 {g.post}</div>
                      <div className="gc-ping">GPS · {g.ping}</div>
                    </div>
                    <Badge type={st.type} label={st.label} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── Shifts Tab ── */}
        {tab === 'Shifts' && (
          <>
            <div style={{ padding: '14px 18px 8px', fontSize: 13, fontWeight: 700, color: 'var(--text-sub)' }}>
              📅 Today · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </div>
            {shifts.map((s, i) => (
              <div className="shift-card" key={i}>
                <div className="sc-header">
                  <div className="sc-title">{s.title}</div>
                  <Badge type={s.status === 'active' ? 'green' : 'blue'} label={s.status === 'active' ? 'Active' : 'Upcoming'} />
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-sub)', marginBottom: 10 }}>🕐 {s.time}</div>
                <div className="sc-guards">
                  {s.guards.slice(0, 3).map((gu, gi) => (
                    <div className="sc-guard-chip" key={gi}>
                      <div className="sc-chip-avatar" style={{ background: gu.color }}>{gu.initials}</div>
                      <span className="sc-chip-name">{gu.name.split(' ')[0]}</span>
                    </div>
                  ))}
                  {s.guards.length > 3 && (
                    <div className="sc-guard-chip">
                      <span className="sc-chip-name" style={{ color: 'var(--red)' }}>+{s.guards.length - 3}</span>
                    </div>
                  )}
                </div>
                <div className="sc-footer">
                  <span className="sc-site">🏢 {s.site}</span>
                  <Badge type="blue" label={`${s.count} Guards`} />
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Attendance Tab ── */}
        {tab === 'Attendance' && (
          <>
            <div className="attend-summary">
              <div className="as-card"><div className="as-num" style={{ color: 'var(--green)' }}>18</div><div className="as-label">Present</div></div>
              <div className="as-card"><div className="as-num" style={{ color: 'var(--red)' }}>3</div><div className="as-label">Absent</div></div>
              <div className="as-card"><div className="as-num" style={{ color: 'var(--orange)' }}>2</div><div className="as-label">Late</div></div>
            </div>

            <div className="qr-scan-area">
              <div className="qr-icon">📲</div>
              <div className="qr-text">Tap to Scan QR Code</div>
              <div className="qr-sub">Biometric & QR check-in supported</div>
            </div>

            <SectionTitle title="Today's Attendance" />
            <div style={{ background: 'var(--bg)' }}>
              {attendees.map((a, i) => (
                <div className="attend-item" key={i}>
                  <div className="ai-avatar" style={{ background: a.color }}>{a.initials}</div>
                  <div className="ai-info">
                    <div className="ai-name">{a.name}</div>
                    <div className="ai-time">Check-in: <b style={{ color: a.status === 'absent' ? 'var(--red)' : 'var(--text)' }}>{a.checkin}</b></div>
                  </div>
                  <div className="ai-right">
                    <div className="ai-checkin">{a.status === 'present' ? '✓ Present' : a.status === 'late' ? '⚠ Late' : '✗ Absent'}</div>
                    {a.checkout && <div className="ai-checkout">Out: {a.checkout}</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

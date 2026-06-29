import React from 'react';
import { StatusBar } from '../components/Shared.jsx';

const groups = [
  {
    label: 'Now',
    items: [
      { icon: '🚨', bg: '#FFEBEE', title: 'SOS Alert — Gate B',       msg: 'Guard Deepak Verma triggered a panic alert.',          time: '2m ago',  unread: true  },
      { icon: '⚠️', bg: '#FFF3E0', title: 'Guard Off-Route',           msg: 'Ramesh Kumar deviated from patrol route by 200m.',     time: '8m ago',  unread: true  },
      { icon: '📍', bg: '#E3F2FD', title: 'Geofence Breach',           msg: 'Guard exited assigned zone — Server Room Sector 3.',   time: '15m ago', unread: true  },
    ]
  },
  {
    label: 'Earlier Today',
    items: [
      { icon: '✅', bg: '#E8F5E9', title: 'Shift Started',             msg: 'Morning shift (6 AM–2 PM) started. 4 guards on duty.', time: '2h ago',  unread: false },
      { icon: '📲', bg: '#F3E5F5', title: 'Attendance Marked',         msg: '18 guards checked in via QR/Biometric today.',         time: '3h ago',  unread: false },
      { icon: '🔒', bg: '#E8F5E9', title: 'Patrol Completed',          msg: 'Night patrol route completed. All checkpoints clear.',  time: '5h ago',  unread: false },
      { icon: '📊', bg: '#E3F2FD', title: 'Weekly Report Ready',       msg: 'Incident & attendance report generated for review.',   time: '6h ago',  unread: false },
    ]
  },
  {
    label: 'Yesterday',
    items: [
      { icon: '🦺', bg: '#FFF3E0', title: 'New Guard Assigned',        msg: 'Vikas Gupta assigned to Warehouse Complex Night Shift.',time: '1d ago',  unread: false },
      { icon: '🌐', bg: '#E3F2FD', title: 'System Update',             msg: 'App updated to v2.4.1 — Offline mode improved.',       time: '1d ago',  unread: false },
    ]
  },
];

export default function Notifications({ onBack }) {
  const totalUnread = groups.flatMap(g => g.items).filter(i => i.unread).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      <StatusBar variant="white" />

      {/* Header */}
      <div className="notif-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="notif-screen-title">Notifications</div>
            <div className="notif-count">{totalUnread} new alerts</div>
          </div>
          <button onClick={onBack} style={{
            background: 'var(--red-soft)', border: 'none', borderRadius: 'var(--r)',
            padding: '7px 14px', fontSize: 12, fontWeight: 700,
            color: 'var(--red)', cursor: 'pointer',
          }}>
            Mark All Read
          </button>
        </div>
      </div>

      <div className="screen-content" style={{ background: 'var(--bg-page)' }}>
        {groups.map((g, gi) => (
          <div key={gi}>
            <div className="notif-group-label">{g.label}</div>
            {g.items.map((n, ni) => (
              <div className={`notif-item ${n.unread ? 'unread' : ''}`} key={ni}>
                <div className="ni-icon" style={{ background: n.bg }}>{n.icon}</div>
                <div className="ni-content">
                  <div className="ni-title">{n.title}</div>
                  <div className="ni-msg">{n.msg}</div>
                  <div className="ni-time">{n.time}</div>
                </div>
                {n.unread && <div className="ni-dot" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { StatusBar, SectionTitle, Badge } from '../components/Shared.jsx';
import * as Ic from '../components/Icons.jsx';

const activity = [
  { icon: <Ic.Check size={18} color="var(--green)" />, bg: 'var(--green-soft)', title: 'Checkpoint Scanned', sub: 'Main Gate Checkpoint', time: '18m ago' },
  { icon: <Ic.Clock size={18} color="var(--blue)" />, bg: '#E3F2FD', title: 'Shift Started', sub: 'Morning Shift (08:00 AM)', time: '2h ago' },
  { icon: <Ic.MapPin size={18} color="var(--orange)" />, bg: '#FFF3E0', title: 'Patrol Completed', sub: 'Perimeter Route A', time: 'Yesterday' },
];

export default function Dashboard({ onBell, onAvatar, onQuickAction, isClockedIn }) {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <StatusBar variant="dark" />

      {/* Gradient Header - Guard Specific */}
      <div className="dash-header">
        <div className="dash-top-row">
          <div>
            <div className="dash-greeting-sub">{greeting},</div>
            <div className="dash-greeting-name">Ramesh Kumar <Ic.Shield size={18} style={{marginLeft: 4, verticalAlign: 'text-bottom'}} color="#FFCDD2" /></div>
            <div className="dash-date">{today} · Morning Shift</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="ab-icon-btn" style={{ background: 'rgba(255,255,255,0.2)' }} onClick={onBell}>
              <Ic.Bell size={18} color="#fff" /> <span className="notif-badge" style={{ borderColor: 'var(--red)' }} />
            </div>
            <div className="ab-avatar" onClick={onAvatar} style={{ background: '#fff', color: 'var(--red)' }}>RK</div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Guard Specific */}
      <div style={{ background: 'var(--bg-page)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {isClockedIn ? (
          <div className="dash-stats-row">
            <div className="dash-stat-card">
              <div className="ds-icon" style={{ background: 'var(--blue-soft)' }}><Ic.Clock size={20} color="var(--blue)" /></div>
              <div className="ds-value" style={{ color: 'var(--blue)' }}>02:15</div>
              <div className="ds-label">Hours on Duty</div>
              <div className="ds-delta ds-up">Until 04:00 PM</div>
            </div>
            <div className="dash-stat-card">
              <div className="ds-icon" style={{ background: 'var(--green-soft)' }}><Ic.CheckCircle size={20} color="var(--green)" /></div>
              <div className="ds-value" style={{ color: 'var(--green)' }}>12/15</div>
              <div className="ds-label">Checkpoints</div>
              <div className="ds-delta ds-up">3 Remaining</div>
            </div>
            <div className="dash-stat-card">
              <div className="ds-icon" style={{ background: 'var(--orange-soft)' }}><Ic.MapPin size={20} color="var(--orange)" /></div>
              <div className="ds-value" style={{ color: 'var(--orange)' }}>2.4 km</div>
              <div className="ds-label">Distance Walked</div>
              <div className="ds-delta ds-up">On schedule</div>
            </div>
            <div className="dash-stat-card">
              <div className="ds-icon" style={{ background: 'var(--purple-soft)' }}><Ic.Award size={20} color="var(--purple)" /></div>
              <div className="ds-value" style={{ color: 'var(--purple)' }}>100%</div>
              <div className="ds-label">Attendance</div>
              <div className="ds-delta ds-up">Perfect this week</div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '24px 18px 0' }} />
        )}

        <div className="screen-content" style={{ background: 'var(--bg-page)' }}>
          {!isClockedIn && (
            <div style={{ margin: '0 18px 24px', padding: '20px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 8px 20px rgba(16,185,129,0.3)' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>Ready for Duty?</h3>
                <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>Clock in to start your shift</p>
              </div>
              <button onClick={() => onQuickAction('clockin')} style={{ background: 'white', color: '#059669', border: 'none', padding: '10px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                Start Shift
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <SectionTitle title="Quick Actions" />
          <div className="quick-actions">
            <div className="qa-btn" onClick={() => onQuickAction('sos')}>
              <div className="qa-icon-wrap qa-red"><Ic.AlertTriangle size={24} color="var(--red)" /></div>
              <span className="qa-label" style={{ fontWeight: 800, color: 'var(--red)' }}>Panic SOS</span>
            </div>
            <div className="qa-btn" onClick={() => onQuickAction('scan')}>
              <div className="qa-icon-wrap qa-blue"><Ic.QrCode size={24} color="var(--blue)" /></div>
              <span className="qa-label">Scan QR</span>
            </div>
            <div className="qa-btn" onClick={() => onQuickAction('reports')}>
              <div className="qa-icon-wrap qa-orange"><Ic.FileText size={24} color="var(--orange)" /></div>
              <span className="qa-label">Report Issue</span>
            </div>
            <div className="qa-btn" onClick={() => onQuickAction('break')}>
              <div className="qa-icon-wrap qa-green"><Ic.Coffee size={24} color="var(--green)" /></div>
              <span className="qa-label">Req. Break</span>
            </div>
          </div>

          {/* Offline Mode Banner */}
          <div style={{
            margin: '0 18px 12px', background: 'var(--green-soft)', borderRadius: 'var(--r)',
            padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid rgba(67, 160, 71, 0.2)'
          }}>
            <Ic.WifiOff size={20} color="var(--green)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--green)' }}>Offline Mode Ready</div>
              <div style={{ fontSize: 10, color: 'var(--text-sub)', marginTop: 1 }}>Data cached · Syncing in background</div>
            </div>
            <Badge type="teal" label="Online" />
          </div>

          {/* My Current Post */}
          <SectionTitle title="Current Assignment" />
          <div className="guard-mini-card" style={{ margin: '0 18px 16px', background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div className="gmc-avatar" style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}><Ic.Map size={20} /></div>
            <div className="gmc-info">
              <div className="gmc-name" style={{ fontSize: 15 }}>Main Entrance Gate</div>
              <div className="gmc-loc" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Ic.MapPin size={12} color="var(--text-muted)" /> Industrial Zone A
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {isClockedIn ? <Badge type="green" label="ON DUTY" /> : <Badge type="gray" label="OFFLINE" />}
            </div>
          </div>

          {isClockedIn && (
            <div style={{ margin: '0 18px 24px' }}>
              <button 
                onClick={() => onQuickAction('clockout')} 
                style={{ 
                  width: '100%', padding: '14px', background: '#fef2f2', 
                  border: '1px solid #fca5a5', borderRadius: '16px', color: '#dc2626', 
                  fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', gap: '8px', cursor: 'pointer' 
                }}
              >
                <Ic.Power size={18} /> End Shift (Clock Out)
              </button>
            </div>
          )}

          {/* Recent Activity */}
          <SectionTitle title="My Activity" action="History" />
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--r) var(--r) 0 0', overflow: 'hidden', margin: '0 0 0 0' }}>
            {activity.map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="act-icon" style={{ background: a.bg }}>{a.icon}</div>
                <div className="act-info">
                  <div className="act-title">{a.title}</div>
                  <div className="act-sub">{a.sub}</div>
                </div>
                <div className="act-time">{a.time}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 16 }} />
        </div>
      </div>
    </div>
  );
}

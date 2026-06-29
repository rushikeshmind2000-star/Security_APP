import React, { useState } from 'react';
import { StatusBar, AppBar, SectionTitle, Badge } from '../components/Shared.jsx';

const checkpoints = [
  { name: 'Main Gate',      time: '06:10 AM', status: 'done',    guard: 'Ramesh K.' },
  { name: 'Parking Zone A', time: '06:30 AM', status: 'done',    guard: 'Ramesh K.' },
  { name: 'Server Room B2', time: '06:50 AM', status: 'active',  guard: 'Ramesh K.' },
  { name: 'Roof Access',    time: '07:10 AM', status: 'pending',  guard: 'Ramesh K.' },
  { name: 'Loading Bay',    time: '07:30 AM', status: 'pending',  guard: 'Ramesh K.' },
  { name: 'Fire Exit East', time: '07:50 AM', status: 'pending',  guard: 'Ramesh K.' },
];

export default function Patrol({ onBack, onBell, onAvatar }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-page)' }}>
      <StatusBar variant="dark" />
      <div className="patrol-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="patrol-title">Route Patrol</div>
            <div className="patrol-sub">Live monitoring · Industrial Zone A</div>
          </div>
          <div className="ab-avatar" onClick={onAvatar}>S</div>
        </div>
      </div>

      <div className="screen-content" style={{ background: 'var(--bg-page)' }}>

        {/* Info Bar */}
        <div className="patrol-info-bar">
          <div className="pib-card">
            <div className="pib-val" style={{ color: 'var(--teal)' }}>3/6</div>
            <div className="pib-label">Checkpoints</div>
          </div>
          <div className="pib-card">
            <div className="pib-val">47min</div>
            <div className="pib-label">Elapsed</div>
          </div>
          <div className="pib-card">
            <div className="pib-val" style={{ color: 'var(--green)' }}>2.3km</div>
            <div className="pib-label">Covered</div>
          </div>
        </div>

        {/* Map Visual */}
        <div className="patrol-map">
          <svg width="100%" height="100%" viewBox="0 0 340 170" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c8e6c9" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="340" height="170" fill="#e8f5e9"/>
            <rect width="340" height="170" fill="url(#grid)"/>
            {/* Roads */}
            <line x1="0" y1="85" x2="340" y2="85" stroke="#aed6b8" strokeWidth="8"/>
            <line x1="170" y1="0" x2="170" y2="170" stroke="#aed6b8" strokeWidth="8"/>
            <line x1="0" y1="130" x2="340" y2="130" stroke="#c8dfc8" strokeWidth="5"/>
            {/* Buildings */}
            <rect x="20" y="20" width="50" height="40" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1"/>
            <rect x="90" y="20" width="60" height="30" rx="4" fill="#c8e6c9" stroke="#a5d6a7" strokeWidth="1"/>
            <rect x="200" y="20" width="70" height="50" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1"/>
            <rect x="20" y="100" width="45" height="30" rx="4" fill="#c8e6c9" stroke="#a5d6a7" strokeWidth="1"/>
            <rect x="240" y="100" width="80" height="30" rx="4" fill="#b2dfdb" stroke="#80cbc4" strokeWidth="1"/>
            {/* Route line */}
            <polyline points="50,85 50,40 170,40 170,85 170,130 270,130 270,85 290,85"
              fill="none" stroke="#E53935" strokeWidth="2.5" strokeDasharray="6,3" opacity="0.8"/>
            {/* Checkpoint dots */}
            <circle cx="50"  cy="85"  r="8" fill="#43A047" stroke="#fff" strokeWidth="2"/>
            <circle cx="50"  cy="40"  r="8" fill="#43A047" stroke="#fff" strokeWidth="2"/>
            <circle cx="170" cy="85"  r="10" fill="#FB8C00" stroke="#fff" strokeWidth="2.5"/>
            <circle cx="170" cy="130" r="8" fill="#e0e0e0" stroke="#fff" strokeWidth="2"/>
            <circle cx="270" cy="130" r="8" fill="#e0e0e0" stroke="#fff" strokeWidth="2"/>
            <circle cx="290" cy="85"  r="8" fill="#e0e0e0" stroke="#fff" strokeWidth="2"/>
            {/* Guard marker */}
            <circle cx="170" cy="85" r="18" fill="rgba(251,140,0,0.2)"/>
            <text x="170" y="89" textAnchor="middle" fontSize="12">👮</text>
            {/* Legend */}
            <circle cx="14" cy="154" r="5" fill="#43A047"/>
            <text x="22" y="158" fontSize="9" fill="#555">Done</text>
            <circle cx="58" cy="154" r="5" fill="#FB8C00"/>
            <text x="66" y="158" fontSize="9" fill="#555">Active</text>
            <circle cx="106" cy="154" r="5" fill="#e0e0e0" stroke="#ccc" strokeWidth="1"/>
            <text x="114" y="158" fontSize="9" fill="#555">Pending</text>
          </svg>
        </div>

        {/* Progress */}
        <div className="patrol-progress-wrap">
          <div className="patrol-progress-row">
            <span className="pp-label">Patrol Progress</span>
            <span className="pp-pct">50%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '50%', background: 'var(--teal)' }} />
          </div>
        </div>

        {/* Checkpoints */}
        <SectionTitle title="Checkpoints" action="View Map" />
        <div style={{ background: 'var(--bg)' }}>
          {checkpoints.map((cp, i) => (
            <div className="checkpoint-item" key={i}>
              <div className={`cp-check cp-${cp.status}`}>
                {cp.status === 'done' ? '✓' : cp.status === 'active' ? '●' : '○'}
              </div>
              <div className="cp-info">
                <div className="cp-name">{cp.name}</div>
                <div className="cp-time">{cp.status === 'pending' ? `ETA: ${cp.time}` : `Scanned: ${cp.time}`}</div>
              </div>
              <Badge
                type={cp.status === 'done' ? 'teal' : cp.status === 'active' ? 'orange' : 'blue'}
                label={cp.status === 'done' ? 'Done' : cp.status === 'active' ? 'In Progress' : 'Pending'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

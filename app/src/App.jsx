import React, { useState } from 'react';
import './App.css';
import { BottomNav } from './components/Shared.jsx';
import Dashboard     from './screens/Dashboard.jsx';
import Guards        from './screens/Guards.jsx';
import Patrol        from './screens/Patrol.jsx';
import Reports       from './screens/Reports.jsx';
import SOSScreen     from './screens/SOSScreen.jsx';
import Notifications from './screens/Notifications.jsx';
import Settings      from './screens/Settings.jsx';
import Auth          from './screens/Auth.jsx';
import ClockIn       from './screens/ClockIn.jsx';
import ScanQR        from './screens/ScanQR.jsx';
import BreakScreen   from './screens/BreakScreen.jsx';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClockedIn, setIsClockedIn]         = useState(false);
  
  const [tab, setTab]           = useState('home');
  const [overlay, setOverlay]   = useState(null); // 'sos' | 'notifications' | 'settings'

  const handleNav = (id) => {
    if (id === 'sos') { setOverlay('sos'); return; }
    setTab(id);
    setOverlay(null);
  };

  const handleQuickAction = (action) => {
    if (action === 'sos')           { setOverlay('sos'); return; }
    if (action === 'notifications') { setOverlay('notifications'); return; }
    if (action === 'scan')          { setOverlay('scan'); return; }
    if (action === 'break')         { setOverlay('break'); return; }
    if (action === 'reports')       { setTab('reports'); return; }
  };

  const closeOverlay = () => setOverlay(null);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsClockedIn(false);
    setOverlay(null);
    setTab('home');
  };

  const sharedProps = {
    onBack:     closeOverlay,
    onBell:     () => setOverlay('notifications'),
    onAvatar:   () => setOverlay('settings'),
    onLogout:   handleLogout,
  };

  return (
    <div className="phone-wrapper">
      <div className="phone-frame">
        <div className="dynamic-island" />
        <div className="phone-screen">

          {/* ── Auth & Clock-In Flows ── */}
          {!isAuthenticated ? (
            <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
          ) : !isClockedIn ? (
            <ClockIn onClockIn={() => setIsClockedIn(true)} />
          ) : (
            <>
              {/* ── Main Screen Content ── */}
              <div className="screen-content">
                {tab === 'home'    && <Dashboard {...sharedProps} onQuickAction={handleQuickAction} />}
                {tab === 'guards'  && <Guards    {...sharedProps} />}
                {tab === 'patrol'  && <Patrol    {...sharedProps} />}
                {tab === 'reports' && <Reports   {...sharedProps} />}
              </div>

              {/* ── Bottom Navigation ── */}
              <BottomNav active={tab} onChange={handleNav} />
            </>
          )}

          {/* ── Full-Screen Overlays ── */}
          {overlay === 'sos' && <SOSScreen onBack={closeOverlay} />}
          {overlay === 'scan' && (
            <div className="sos-full-screen" style={{ background: '#000' }}>
              <ScanQR onBack={closeOverlay} />
            </div>
          )}
          {overlay === 'break' && (
            <div className="sos-full-screen" style={{ background: 'var(--bg-page)' }}>
              <BreakScreen onBack={closeOverlay} />
            </div>
          )}
          {overlay === 'notifications' && (
            <div className="sos-full-screen" style={{ background: 'var(--bg-page)' }}>
              <Notifications onBack={closeOverlay} />
            </div>
          )}
          {overlay === 'settings' && (
            <div className="sos-full-screen" style={{ background: 'var(--bg-page)' }}>
              <Settings onBack={closeOverlay} onLogout={handleLogout} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { StatusBar, AppBar, SectionTitle, Badge, LocationCard } from '../components/Shared.jsx';

const EMERGENCIES = [
  { icon: '🔥', label: 'Fire'       },
  { icon: '🌊', label: 'Flood'      },
  { icon: '🏚️', label: 'Earthquake' },
  { icon: '🔫', label: 'Crime'      },
  { icon: '🚗', label: 'Accident'   },
  { icon: '❗', label: 'Others'     },
];

export default function SOSScreen({ onClose }) {
  const [step, setStep] = useState('sos'); // 'sos' | 'choose' | 'help'
  const [selected, setSelected] = useState('Fire');
  const [activated, setActivated] = useState(true);

  return (
    <div className={`sos-full-screen ${step === 'help' ? 'sos-red-bg' : ''}`}>

      {/* ── Step: SOS ── */}
      {step === 'sos' && (
        <>
          <StatusBar variant="white" />
          <AppBar title="Panic Alert" variant="white" onBack={onClose} onBell={() => {}} onAvatar={() => {}} />
          <div className="panic-hero">
            <div className="panic-title">Are You In Danger?</div>
            <div className="panic-subtitle">Press the button below, help will reach you soon</div>
            <div className="sos-container" onClick={() => setStep('choose')}>
              <div className="ripple-ring" />
              <div className="ripple-ring" />
              <div className="ripple-ring" />
              <div className="sos-btn">
                SOS
                <div className="sos-btn-sub">PRESS</div>
              </div>
            </div>
          </div>
          <LocationCard />
          {/* Bottom nav placeholder */}
          <div style={{ height: 76, background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tap SOS to send emergency alert</span>
          </div>
        </>
      )}

      {/* ── Step: Choose Emergency ── */}
      {step === 'choose' && (
        <>
          <StatusBar variant="white" />
          <AppBar title="Panic Alert" variant="white" onBack={() => setStep('sos')} onBell={() => {}} onAvatar={() => {}} />
          <div className="choose-title">Choose the emergency</div>
          <div className="emergency-grid">
            {EMERGENCIES.map(em => (
              <div
                key={em.label}
                className={`em-card ${selected === em.label ? 'selected' : ''}`}
                onClick={() => setSelected(em.label)}
              >
                <div className="em-icon-wrap">{em.icon}</div>
                <span className="em-label">{em.label}</span>
              </div>
            ))}
          </div>
          {activated && (
            <div className="activated-banner">
              <div className="banner-left">
                <div className="banner-icon">🔥</div>
                <div className="banner-text">{selected} emergency<br />is activated</div>
              </div>
              <button className="banner-off-btn" onClick={() => { setActivated(false); setStep('help'); }}>
                Off
              </button>
            </div>
          )}
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setStep('help')}
            style={{
              margin: '0 18px 16px',
              padding: '14px',
              background: 'var(--red)', color: '#fff',
              border: 'none', borderRadius: 'var(--r)',
              fontSize: 15, fontWeight: 800,
              cursor: 'pointer', boxShadow: '0 6px 20px rgba(229,57,53,0.4)',
            }}
          >
            🚨 Send Emergency Alert
          </button>
          <LocationCard />
        </>
      )}

      {/* ── Step: Help On The Way ── */}
      {step === 'help' && (
        <>
          <StatusBar variant="red" />
          <div className="app-bar ab-red">
            <button className="ab-back" onClick={() => setStep('sos')}>‹</button>
            <span className="ab-title"> </span>
            <div className="ab-avatar">S</div>
          </div>
          <div className="panic-hero">
            <div className="help-title">Help is on the way!</div>
            <div className="help-subtitle">Please standby · Authorities notified</div>
            <div className="sos-red-container">
              <div className="red-ripple" />
              <div className="red-ripple" />
              <div className="red-ripple" />
              <div className="sos-white-btn">SOS</div>
            </div>
            <div className="help-location">Current Location Share 📍</div>
            {/* Countdown */}
            <div style={{
              marginTop: 20, background: 'rgba(255,255,255,0.15)',
              borderRadius: 'var(--r)', padding: '12px 24px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>ETA</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#fff' }}>4:32</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Security team dispatched</div>
            </div>
          </div>
          {/* Red bottom nav */}
          <div style={{
            height: 76, background: 'rgba(0,0,0,0.1)',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <button
              onClick={() => { setStep('sos'); onClose(); }}
              style={{
                background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', padding: '10px 28px', borderRadius: 'var(--r)',
                fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Cancel Alert
            </button>
          </div>
        </>
      )}
    </div>
  );
}

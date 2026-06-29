import React, { useState } from 'react';
import { StatusBar } from '../components/Shared.jsx';
import * as Ic from '../components/Icons.jsx';

export default function BreakScreen({ onBack }) {
  const [breakStatus, setBreakStatus] = useState('active'); // 'active' | 'on_break'

  const handleGoOffline = () => {
    // Mock capturing live location
    console.log("Capturing live location for break start...");
    setBreakStatus('on_break');
  };

  const handleGoOnline = () => {
    // Mock capturing live location
    console.log("Capturing live location for break end...");
    onBack();
  };

  return (
    <div className="screen-container" style={{ background: 'var(--bg-page)' }}>
      <StatusBar variant="dark" />
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
        <div onClick={onBack} style={{ cursor: 'pointer', padding: '4px' }}>
          <Ic.ChevronLeft size={24} color="var(--text)" />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800 }}>Break Management</div>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {breakStatus === 'active' ? (
          <>
            <div style={{ width: 80, height: 80, background: 'var(--green-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Ic.Coffee size={40} color="var(--green)" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Ready for a break?</h2>
            <p style={{ color: 'var(--text-sub)', textAlign: 'center', fontSize: 15, lineHeight: 1.5, marginBottom: 32 }}>
              Your designated break time is <b>1 hour</b>.<br/>
              Going offline will pause your patrol tracking and notify the system.
            </p>

            <div style={{ background: 'var(--card)', width: '100%', padding: '16px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Ic.MapPin size={20} color="var(--blue)" />
                <span style={{ fontSize: 14, fontWeight: 600 }}>Live Location Required</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-sub)', margin: 0 }}>
                Your GPS location will be recorded when you start and end your break.
              </p>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16 }} onClick={handleGoOffline}>
              Go Offline for Break
            </button>
            <button className="btn btn-secondary" style={{ width: '100%', padding: '16px', fontSize: 16, marginTop: 16 }} onClick={onBack}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <div style={{ width: 80, height: 80, background: 'var(--orange-soft)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <Ic.Moon size={40} color="var(--orange)" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>You are on Break</h2>
            <p style={{ color: 'var(--text-sub)', textAlign: 'center', fontSize: 15, lineHeight: 1.5, marginBottom: 32 }}>
              Your break started just now.<br/>
              You have <b>60 minutes</b> remaining.
            </p>

            <div style={{ background: 'var(--card)', width: '100%', padding: '16px', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Ic.MapPin size={20} color="var(--blue)" />
                <span style={{ fontSize: 14, fontWeight: 600 }}>Live Location Required</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-sub)', margin: 0 }}>
                Your GPS location will be recorded when you resume your shift.
              </p>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16, background: 'var(--green)', boxShadow: '0 4px 12px rgba(67, 160, 71, 0.3)' }} onClick={handleGoOnline}>
              Go Online (End Break)
            </button>
          </>
        )}

      </div>
    </div>
  );
}

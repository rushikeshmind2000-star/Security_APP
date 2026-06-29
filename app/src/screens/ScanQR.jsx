import React from 'react';
import { StatusBar } from '../components/Shared.jsx';
import * as Ic from '../components/Icons.jsx';

export default function ScanQR({ onBack }) {
  return (
    <div className="screen-container" style={{ background: '#000', color: '#fff' }}>
      <StatusBar variant="light" />
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', zIndex: 10, position: 'relative' }}>
        <div onClick={onBack} style={{ padding: 8, cursor: 'pointer', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}>
          <Ic.X size={24} color="#fff" />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 700 }}>Scan Checkpoint</div>
        <div style={{ width: 40 }} />
      </div>

      {/* Viewfinder Mock */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ 
          width: 250, height: 250, 
          border: '4px solid var(--green)', 
          borderRadius: 24,
          position: 'relative',
          boxShadow: '0 0 0 4000px rgba(0,0,0,0.6)'
        }}>
          {/* Scanning Line Animation */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--green)',
            boxShadow: '0 0 8px var(--green)',
            animation: 'scan-line 2s infinite linear'
          }} />
        </div>
        
        <div style={{ marginTop: 40, textAlign: 'center', zIndex: 10 }}>
          <Ic.QrCode size={40} color="#fff" style={{ marginBottom: 16 }} />
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Align QR Code</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 8 }}>Hold your camera steady over<br/>the checkpoint QR code</p>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 250px; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

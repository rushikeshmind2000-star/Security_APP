import React, { useState } from 'react';
import * as Ic from '../components/Icons.jsx';
import { SectionTitle } from '../components/Shared.jsx';

export default function ClockIn({ onClockIn }) {
  const [step, setStep] = useState(1); // 1: Photo, 2: Location, 3: Confirm
  const [photoTaken, setPhotoTaken] = useState(false);
  const [locFetched, setLocFetched] = useState(false);

  return (
    <div className="screen-container" style={{ padding: '0 0 24px 0', background: 'var(--bg-page)' }}>
      {/* Header */}
      <div style={{ background: 'var(--red)', padding: '40px 20px 20px', color: 'white', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Start Shift</h1>
        <p style={{ opacity: 0.9, fontSize: '14px' }}>Complete check-in to go online</p>
      </div>

      <div style={{ padding: '0 20px' }}>
        
        {/* Step 1: Photo */}
        <div className="card mb-16" style={{ opacity: step >= 1 ? 1 : 0.5, transition: '0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: photoTaken ? 'var(--green)' : 'var(--red)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {photoTaken ? <Ic.Check size={16} /> : "1"}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Selfie Verification</h3>
          </div>
          
          {!photoTaken ? (
            <div 
              style={{ background: 'var(--bg-page)', border: '2px dashed var(--border)', borderRadius: 'var(--r)', padding: '32px', textAlign: 'center' }}
              onClick={() => { setPhotoTaken(true); setStep(2); }}
            >
              <Ic.User size={32} color="var(--text-sub)" style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>Tap to capture photo</div>
              <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>Ensure your face and uniform are visible</div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--green-soft)', padding: '12px', borderRadius: 'var(--r)' }}>
              <img src="https://i.pravatar.cc/150?u=ramesh" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--green)' }}>Photo Verified</div>
                <div style={{ fontSize: '12px', color: 'var(--green)', opacity: 0.8 }}>Matched with profile</div>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Location */}
        <div className="card mb-16" style={{ opacity: step >= 2 ? 1 : 0.5, transition: '0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: locFetched ? 'var(--green)' : (step >= 2 ? 'var(--red)' : 'var(--border)'), color: step >= 2 ? 'white' : 'var(--text-sub)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {locFetched ? <Ic.Check size={16} /> : "2"}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Location Access</h3>
          </div>

          {!locFetched ? (
             <button 
              className={`btn ${step >= 2 ? 'btn-primary' : 'btn-secondary'}`} 
              style={{ width: '100%', padding: '14px' }}
              onClick={() => { if (step >= 2) { setLocFetched(true); setStep(3); } }}
             >
               <Ic.MapPin size={18} style={{ marginRight: '8px' }} /> Fetch GPS Location
             </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--green-soft)', padding: '12px', borderRadius: 'var(--r)' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic.MapPin size={20} color="var(--green)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--green)' }}>Location Acquired</div>
                <div style={{ fontSize: '12px', color: 'var(--green)', opacity: 0.8 }}>Industrial Zone A · Sector 12</div>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Clock In */}
        <div className="card" style={{ opacity: step >= 3 ? 1 : 0.5, transition: '0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= 3 ? 'var(--red)' : 'var(--border)', color: step >= 3 ? 'white' : 'var(--text-sub)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              3
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Go Online</h3>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-sub)', marginBottom: '20px' }}>By clocking in, you confirm you are at the designated site and in proper uniform.</p>
          
          <button 
            className={`btn ${step >= 3 ? 'btn-primary' : 'btn-secondary'}`} 
            style={{ width: '100%', padding: '16px', fontSize: '16px', background: step >= 3 ? 'var(--green)' : '' }}
            onClick={() => { if (step >= 3) onClockIn(); }}
            disabled={step < 3}
          >
            Clock In & Go Online
          </button>
        </div>

      </div>
    </div>
  );
}

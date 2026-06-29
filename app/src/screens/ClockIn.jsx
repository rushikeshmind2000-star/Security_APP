import React, { useState } from 'react';
import * as Ic from '../components/Icons.jsx';
import { SectionTitle } from '../components/Shared.jsx';

export default function ClockIn({ onClockIn }) {
  const [step, setStep] = useState(1); // 1: Photo, 2: Location, 3: Confirm
  const [photoTaken, setPhotoTaken] = useState(false);
  const [locFetched, setLocFetched] = useState(false);

  return (
    <div className="screen-container" style={{ padding: '0 0 16px 0', background: '#fafafa', minHeight: '100vh', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
        padding: '36px 20px 20px', color: 'white', 
        borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px', 
        marginBottom: '16px', boxShadow: '0 8px 20px rgba(220,38,38,0.15)' 
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px', letterSpacing: '-0.5px' }}>Start Shift</h1>
        <p style={{ opacity: 0.9, fontSize: '14px', fontWeight: '500', margin: 0 }}>Complete check-in to go online</p>
      </div>

      <div style={{ padding: '0 20px' }}>
        
        {/* Step 1: Photo */}
        <div style={{ 
          background: 'white', padding: '16px', borderRadius: '20px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)',
          marginBottom: '12px', opacity: step >= 1 ? 1 : 0.5, transition: '0.3s' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: photoTaken ? '#10b981' : '#fef2f2', color: photoTaken ? 'white' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              {photoTaken ? <Ic.Check size={18} /> : "1"}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: 0 }}>Selfie Verification</h3>
          </div>
          
          {!photoTaken ? (
            <div 
              style={{ background: '#fef2f2', border: '2px dashed #fca5a5', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}
              onClick={() => { setPhotoTaken(true); setStep(2); }}
            >
              <Ic.User size={28} color="#ef4444" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#dc2626' }}>Tap to capture photo</div>
              <div style={{ fontSize: '12px', color: '#f87171', marginTop: '2px' }}>Face and uniform visible</div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ecfdf5', border: '1px solid #d1fae5', padding: '12px', borderRadius: '12px' }}>
              <img src="https://i.pravatar.cc/150?u=ramesh" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#059669' }}>Photo Verified</div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>Matched with profile</div>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Location */}
        <div style={{ 
          background: 'white', padding: '16px', borderRadius: '20px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)',
          marginBottom: '12px', opacity: step >= 2 ? 1 : 0.5, transition: '0.3s' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: locFetched ? '#10b981' : (step >= 2 ? '#fef2f2' : '#f3f4f6'), color: locFetched ? 'white' : (step >= 2 ? '#dc2626' : '#9ca3af'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              {locFetched ? <Ic.Check size={18} /> : "2"}
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: 0 }}>Location Access</h3>
          </div>

          {!locFetched ? (
             <button 
              style={{ 
                width: '100%', padding: '14px', fontSize: '14px', fontWeight: '700',
                background: step >= 2 ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : '#f3f4f6', 
                color: step >= 2 ? 'white' : '#9ca3af',
                borderRadius: '12px', border: 'none', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '8px', 
                boxShadow: step >= 2 ? '0 4px 15px rgba(220, 38, 38, 0.25)' : 'none',
                cursor: step >= 2 ? 'pointer' : 'not-allowed'
              }}
              onClick={() => { if (step >= 2) { setLocFetched(true); setStep(3); } }}
             >
               <Ic.MapPin size={18} /> Fetch GPS Location
             </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ecfdf5', border: '1px solid #d1fae5', padding: '12px', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic.MapPin size={20} color="#059669" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#059669' }}>Location Acquired</div>
                <div style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>Industrial Zone A · Sector 12</div>
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Clock In */}
        <div style={{ 
          background: 'white', padding: '16px', borderRadius: '20px', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)',
          marginBottom: '16px', opacity: step >= 3 ? 1 : 0.5, transition: '0.3s' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: step >= 3 ? '#fef2f2' : '#f3f4f6', color: step >= 3 ? '#dc2626' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
              3
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#111827', margin: 0 }}>Go Online</h3>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px', background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <input type="checkbox" id="share-loc" defaultChecked style={{ marginTop: '2px', width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }} />
            <label htmlFor="share-loc" style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4', cursor: 'pointer' }}>
              <b style={{ color: '#0f172a', display: 'block', marginBottom: '2px' }}>Share Live Location</b>
              Share my live location continuously during the entire duty period.
            </label>
          </div>
          
          <button 
            style={{ 
              width: '100%', padding: '16px', fontSize: '15px', fontWeight: '800',
              background: step >= 3 ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#f3f4f6', 
              color: step >= 3 ? 'white' : '#9ca3af',
              borderRadius: '12px', border: 'none', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', 
              boxShadow: step >= 3 ? '0 8px 20px rgba(16, 185, 129, 0.25)' : 'none',
              cursor: step >= 3 ? 'pointer' : 'not-allowed',
              textTransform: 'uppercase', letterSpacing: '1px'
            }}
            onClick={() => { if (step >= 3) onClockIn(); }}
            disabled={step < 3}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

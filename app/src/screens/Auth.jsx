import React, { useState } from 'react';
import * as Ic from '../components/Icons.jsx';

export default function Auth({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'otp'
  const [phone, setPhone] = useState('');

  if (view === 'login') {
    return (
      <div className="screen-container" style={{ 
        padding: '24px', display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', background: '#fafafa', 
        minHeight: '100vh', position: 'relative', overflow: 'hidden' 
      }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '-10%', left: '-20%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-5%', right: '-15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>
        
        {/* Dot pattern decorative element */}
        <div style={{ position: 'absolute', top: '15%', right: '10%', zIndex: 0, opacity: 0.1, display: 'grid', gridTemplateColumns: 'repeat(4, 8px)', gap: '6px' }}>
          {Array.from({length: 16}).map((_, i) => (
            <div key={i} style={{ width: '4px', height: '4px', background: '#dc2626', borderRadius: '50%' }}></div>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '36px', marginTop: '10px' }}>
          <div style={{ 
            width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 12px'
          }}>
            <img src="/logo-removebg-preview.png" alt="V-GUARD Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <p style={{ color: '#6b7280', fontSize: '15px', fontWeight: '500' }}>Secure Guard Management</p>
        </div>

        <div style={{ 
          position: 'relative', zIndex: 1, background: 'white', padding: '24px', 
          borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', 
          border: '1px solid rgba(0,0,0,0.03)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px' }}>
            <div style={{ 
              width: '52px', height: '52px', background: '#fef2f2', 
              borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: '16px'
            }}>
              <Ic.User size={26} color="#dc2626" />
            </div>
            <div>
              <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#111827', margin: 0 }}>Welcome Back</h2>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0 0', fontWeight: '500' }}>Login to continue</p>
            </div>
          </div>
          
          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ color: '#6b7280', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'block' }}>Phone Number</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ 
                background: 'white', padding: '14px 16px', borderRadius: '12px', 
                border: '1px solid #e5e7eb', fontWeight: '600', color: '#111827', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
              }}>
                <span style={{ fontSize: '18px' }}>🇮🇳</span> +91 <Ic.ChevronDown size={16} color="#9ca3af" />
              </div>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="Enter 10-digit number" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ 
                  flex: 1, padding: '14px 16px', borderRadius: '12px', 
                  border: '1px solid #e5e7eb', outline: 'none', fontSize: '15px',
                  color: '#111827'
                }}
              />
            </div>
          </div>

          <button 
            style={{ 
              width: '100%', padding: '16px', fontSize: '16px', fontWeight: '700',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white',
              borderRadius: '14px', border: 'none', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(220, 38, 38, 0.25)',
              cursor: 'pointer'
            }}
            onClick={() => setView('otp')}
          >
            <Ic.Lock size={18} /> Get OTP
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '28px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#f3f4f6' }}></div>
            <span style={{ padding: '0 16px', color: '#9ca3af', fontSize: '13px', fontWeight: '600' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#f3f4f6' }}></div>
          </div>

          <button 
            style={{ 
              width: '100%', padding: '15px', fontSize: '15px', fontWeight: '600',
              background: 'white', color: '#111827',
              borderRadius: '14px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '10px', cursor: 'pointer'
            }}
          >
            <Ic.QrCode size={20} color="#ef4444" /> Login with QR Code
          </button>
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', fontSize: '14px', color: '#6b7280', marginTop: '40px', marginBottom: '60px' }}>
          New to Watchmen? <span style={{ color: '#dc2626', fontWeight: '700', cursor: 'pointer', marginLeft: '4px' }} onClick={() => setView('register')}>Register <Ic.ChevronRight size={14} style={{ verticalAlign: 'middle', marginTop: '-2px' }} /></span>
        </div>

        <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, zIndex: 1, textAlign: 'center', fontSize: '11px', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Powered by RSM INNOVATIVES PVT LTD
        </div>
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="screen-container" style={{ 
        padding: '24px', display: 'flex', flexDirection: 'column', 
        background: '#fafafa', minHeight: '100vh', position: 'relative', overflow: 'hidden' 
      }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '-10%', right: '-20%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', marginBottom: '32px', marginTop: '20px' }}>
          <div onClick={() => setView('login')} style={{ 
            width: '44px', height: '44px', background: 'white', borderRadius: '14px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.02)', cursor: 'pointer' 
          }}>
            <Ic.ChevronLeft size={24} color="#111827" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginLeft: '16px', color: '#111827', margin: '0 0 0 16px' }}>Create Account</h2>
        </div>

        <div style={{ 
          position: 'relative', zIndex: 1, background: 'white', padding: '24px', 
          borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', 
          border: '1px solid rgba(0,0,0,0.03)' 
        }}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ color: '#6b7280', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'block' }}>Full Name</label>
            <input type="text" className="form-input" placeholder="e.g. Ramesh Kumar" style={{ 
              width: '100%', padding: '14px 16px', borderRadius: '12px', boxSizing: 'border-box',
              border: '1px solid #e5e7eb', outline: 'none', fontSize: '15px', color: '#111827'
            }} />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ color: '#6b7280', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'block' }}>Phone Number</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ 
                background: 'white', padding: '14px 16px', borderRadius: '12px', 
                border: '1px solid #e5e7eb', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '6px'
              }}>
                <span style={{ fontSize: '18px' }}>🇮🇳</span> +91
              </div>
              <input type="tel" className="form-input" placeholder="Enter number" style={{ 
                flex: 1, padding: '14px 16px', borderRadius: '12px', boxSizing: 'border-box',
                border: '1px solid #e5e7eb', outline: 'none', fontSize: '15px', color: '#111827'
              }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '28px' }}>
            <label className="form-label" style={{ color: '#6b7280', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'block' }}>Agency Code</label>
            <input type="text" className="form-input" placeholder="Provided by employer" style={{ 
              width: '100%', padding: '14px 16px', borderRadius: '12px', boxSizing: 'border-box',
              border: '1px solid #e5e7eb', outline: 'none', fontSize: '15px', color: '#111827'
            }} />
          </div>

          <button 
            style={{ 
              width: '100%', padding: '16px', fontSize: '16px', fontWeight: '700',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white',
              borderRadius: '14px', border: 'none', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(220, 38, 38, 0.25)',
              cursor: 'pointer'
            }}
            onClick={() => setView('otp')}
          >
            Verify Phone Number
          </button>
        </div>

        <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, zIndex: 1, textAlign: 'center', fontSize: '11px', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Powered by RSM INNOVATIVES PVT LTD
        </div>
      </div>
    );
  }

  if (view === 'otp') {
    return (
      <div className="screen-container" style={{ 
        padding: '24px', display: 'flex', flexDirection: 'column', 
        background: '#fafafa', minHeight: '100vh', position: 'relative', overflow: 'hidden' 
      }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '20%', left: '-15%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', marginBottom: '40px', marginTop: '20px' }}>
          <div onClick={() => setView('login')} style={{ 
            width: '44px', height: '44px', background: 'white', borderRadius: '14px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.02)', cursor: 'pointer' 
          }}>
            <Ic.ChevronLeft size={24} color="#111827" />
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 16px'
          }}>
            <img src="/logo-removebg-preview.png" alt="V-GUARD Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '12px', color: '#111827' }}>Verify OTP</h2>
          <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>
            Enter the 4-digit code sent to<br/>
            <b style={{ color: '#111827' }}>+91 {phone || '9876543210'}</b>
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
          {[1,2,3,4].map(i => (
            <input 
              key={i}
              type="text" 
              maxLength="1"
              style={{ 
                width: '64px', height: '72px', borderRadius: '16px', border: '2px solid #e5e7eb', 
                fontSize: '28px', fontWeight: '800', textAlign: 'center', 
                background: 'white', color: '#111827', outline: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
              }}
              defaultValue={i === 1 ? "5" : ""}
            />
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <button 
            style={{ 
              width: '100%', padding: '16px', fontSize: '16px', fontWeight: '700',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white',
              borderRadius: '14px', border: 'none', display: 'flex', alignItems: 'center',
              justifyContent: 'center', boxShadow: '0 8px 20px rgba(220, 38, 38, 0.25)',
              cursor: 'pointer', marginBottom: '24px'
            }}
            onClick={onLoginSuccess}
          >
            Verify & Login
          </button>

          <div style={{ textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
            Didn't receive code? <span style={{ color: '#dc2626', fontWeight: '700', cursor: 'pointer' }}>Resend in 0:45</span>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, zIndex: 1, textAlign: 'center', fontSize: '11px', color: '#9ca3af', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Powered by RSM INNOVATIVES PVT LTD
        </div>
      </div>
    );
  }

  return null;
}

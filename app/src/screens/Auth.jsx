import React, { useState } from 'react';
import * as Ic from '../components/Icons.jsx';

export default function Auth({ onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'otp'
  const [phone, setPhone] = useState('');

  if (view === 'login') {
    return (
      <div className="screen-container" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--bg-page)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '40px' }}>
          <div style={{ 
            width: '80px', height: '80px', background: 'var(--red-soft)', 
            borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 16px' 
          }}>
            <Ic.Shield size={40} color="var(--red)" strokeWidth={2} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: 'var(--text)' }}>
            Watchmen
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '15px' }}>Secure Guard Management</p>
        </div>

        <div style={{ background: 'var(--card)', padding: '24px', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px', color: 'var(--text)' }}>Welcome Back</h2>
          
          <div className="form-group mb-20">
            <label className="form-label" style={{ color: 'var(--text-sub)', fontWeight: '600' }}>Phone Number</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-page)', padding: '14px 16px', borderRadius: 'var(--r)', border: '1px solid var(--border)', fontWeight: '700', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+91</div>
              <input 
                type="tel" 
                className="form-input" 
                placeholder="Enter 10-digit number" 
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '16px', marginBottom: '20px' }}
            onClick={() => setView('otp')}
          >
            Get OTP
          </button>

          <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-sub)' }}>
            New to Watchmen? <span style={{ color: 'var(--red)', fontWeight: '700', cursor: 'pointer' }} onClick={() => setView('register')}>Register</span>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="screen-container" style={{ padding: '24px', background: 'var(--bg-page)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', marginTop: '20px' }}>
          <div onClick={() => setView('login')} style={{ width: '40px', height: '40px', background: 'var(--card)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', cursor: 'pointer' }}>
            <Ic.ChevronLeft size={24} color="var(--text)" />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginLeft: '16px', color: 'var(--text)' }}>Create Account</h2>
        </div>

        <div style={{ background: 'var(--card)', padding: '24px', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <div className="form-group mb-20">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="e.g. Ramesh Kumar" />
          </div>

          <div className="form-group mb-20">
            <label className="form-label" style={{ color: 'var(--text-sub)', fontWeight: '600' }}>Phone Number</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-page)', padding: '14px 16px', borderRadius: 'var(--r)', border: '1px solid var(--border)', fontWeight: '700', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+91</div>
              <input type="tel" className="form-input" placeholder="Enter number" style={{ flex: 1 }} />
            </div>
          </div>

          <div className="form-group mb-24">
            <label className="form-label">Agency Code</label>
            <input type="text" className="form-input" placeholder="Provided by employer" />
          </div>

          <button 
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '16px' }}
            onClick={() => setView('otp')}
          >
            Verify Phone Number
          </button>
        </div>
      </div>
    );
  }

  if (view === 'otp') {
    return (
      <div className="screen-container" style={{ padding: '24px', background: 'var(--bg-page)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px', marginTop: '20px' }}>
          <div onClick={() => setView('login')} style={{ width: '40px', height: '40px', background: 'var(--card)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', cursor: 'pointer' }}>
            <Ic.ChevronLeft size={24} color="var(--text)" />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--bg)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid var(--border)' }}>
            <Ic.Lock size={32} color="var(--text)" strokeWidth={1.5} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px', color: 'var(--text)' }}>Verify OTP</h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '15px', lineHeight: '1.5' }}>Enter the 4-digit code sent to<br/><b style={{ color: 'var(--text)' }}>+91 {phone || '9876543210'}</b></p>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
          {[1,2,3,4].map(i => (
            <input 
              key={i}
              type="text" 
              maxLength="1"
              style={{ 
                width: '60px', height: '68px', borderRadius: '16px', border: '2px solid var(--border)', 
                fontSize: '28px', fontWeight: '800', textAlign: 'center', 
                background: 'var(--card)', color: 'var(--text)', outline: 'none'
              }}
              defaultValue={i === 1 ? "5" : ""}
            />
          ))}
        </div>

        <button 
          className="btn btn-primary"
          style={{ width: '100%', padding: '16px', fontSize: '16px', marginBottom: '24px' }}
          onClick={onLoginSuccess}
        >
          Verify & Login
        </button>

        <div style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-sub)' }}>
          Didn't receive code? <span style={{ color: 'var(--red)', fontWeight: '700', cursor: 'pointer' }}>Resend in 0:45</span>
        </div>
      </div>
    );
  }

  return null;
}

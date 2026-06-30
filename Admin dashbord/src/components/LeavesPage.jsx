import React, { useState, useEffect } from 'react';
import * as Ic from './Icons.jsx';

function Badge({ type = 'green', label }) {
  return <span className={`badge b-${type}`}>{label}</span>;
}

export default function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const fetchLeaves = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/leaves');
      if (res.ok) {
        const data = await res.json();
        setLeaves(data);
      }
    } catch (err) {
      console.error('Failed to fetch leaves', err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchLeaves();
        setShowModal(false);
        setFormData({ employeeId: '', startDate: '', endDate: '', reason: '' });
      }
    } catch (err) {
      console.error('Failed to apply leave', err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:8080/api/leaves/${id}/status?status=${status}`, { method: 'PUT' });
      if (res.ok) {
        fetchLeaves();
      }
    } catch (err) {
      console.error('Failed to update leave status', err);
    }
  };

  return (
    <div>
      <div className="grid-2 mb-20">
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <span className="card-title">Leave Requests</span>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Request Leave</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(leave => (
                <tr key={leave.id}>
                  <td style={{ fontWeight: 600 }}>{leave.employeeId}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-sub)' }}>{leave.reason}</td>
                  <td>
                    <Badge 
                      type={leave.status === 'APPROVED' ? 'green' : leave.status === 'REJECTED' ? 'red' : 'orange'} 
                      label={leave.status} 
                    />
                  </td>
                  <td>
                    {leave.status === 'PENDING' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-primary btn-sm" style={{ background: 'var(--green)', borderColor: 'var(--green)' }} onClick={() => updateStatus(leave.id, 'APPROVED')}>Approve</button>
                        <button className="btn btn-secondary btn-sm" style={{ color: 'var(--red)', borderColor: 'var(--red)' }} onClick={() => updateStatus(leave.id, 'REJECTED')}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-sub)' }}>
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '400px', background: 'var(--bg)', padding: '20px' }}>
            <div className="card-header" style={{ marginBottom: '16px' }}>
              <span className="card-title">Request Leave</span>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Close</button>
            </div>
            <form onSubmit={handleApplyLeave} style={{ display: 'grid', gap: '12px' }}>
              <div className="form-group"><label className="form-label">Employee Db ID</label><input type="number" required name="employeeId" className="form-input" value={formData.employeeId} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Start Date</label><input type="date" required name="startDate" className="form-input" value={formData.startDate} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">End Date</label><input type="date" required name="endDate" className="form-input" value={formData.endDate} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Reason</label><textarea required name="reason" className="form-input" rows="3" value={formData.reason} onChange={handleChange} /></div>
              <div style={{ marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

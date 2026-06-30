import React, { useState, useEffect } from 'react';
import * as Ic from './Icons.jsx';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    address: '',
    adharCard: '',
    salary: '',
    mobileNumber: '',
    age: '',
    mail: ''
  });

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/employees');
      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    } catch (err) {
      console.error('Failed to fetch employees', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchEmployees();
        setShowModal(false);
        setFormData({ employeeName: '', employeeId: '', address: '', adharCard: '', salary: '', mobileNumber: '', age: '', mail: '' });
      }
    } catch (err) {
      console.error('Failed to add employee', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/employees/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchEmployees();
      }
    } catch (err) {
      console.error('Failed to delete employee', err);
    }
  };

  return (
    <div>
      <div className="grid-2 mb-20">
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <span className="card-title">Employee List</span>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Employee</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td style={{ fontWeight: 600 }}>{emp.employeeId}</td>
                  <td>{emp.employeeName}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-sub)' }}>{emp.mail}</td>
                  <td>{emp.mobileNumber}</td>
                  <td>{emp.age}</td>
                  <td>₹{emp.salary}</td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleDelete(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-sub)' }}>
                    No employees found. Add one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card" style={{ width: '500px', background: 'var(--bg)', padding: '20px' }}>
            <div className="card-header" style={{ marginBottom: '16px' }}>
              <span className="card-title">Add New Employee</span>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Close</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', gridTemplateColumns: '1fr 1fr' }}>
              <div className="form-group"><label className="form-label">Employee ID</label><input required name="employeeId" className="form-input" value={formData.employeeId} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Name</label><input required name="employeeName" className="form-input" value={formData.employeeName} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Email</label><input type="email" required name="mail" className="form-input" value={formData.mail} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Mobile</label><input required name="mobileNumber" className="form-input" value={formData.mobileNumber} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Age</label><input type="number" required name="age" className="form-input" value={formData.age} onChange={handleChange} /></div>
              <div className="form-group"><label className="form-label">Salary</label><input type="number" required name="salary" className="form-input" value={formData.salary} onChange={handleChange} /></div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Aadhar Card</label><input required name="adharCard" className="form-input" value={formData.adharCard} onChange={handleChange} /></div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}><label className="form-label">Address</label><input required name="address" className="form-input" value={formData.address} onChange={handleChange} /></div>
              <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

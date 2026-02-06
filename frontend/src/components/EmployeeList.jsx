import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { FaEdit, FaTrash, FaUserPlus, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getAllEmployees();
    }, []);

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => console.log(error));
    };

    const deleteEmployee = (employeeId) => {
        if (window.confirm("Are you sure you want to delete this applicant?")) {
            EmployeeService.deleteEmployee(employeeId).then(() => getAllEmployees());
        }
    };

    return (
        <div className="main-container">
            <header className="app-header">
                <h1>Application Dashboard</h1>
            </header>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '400' }}>Recent Applications</h2>
                <Link to="/add-employee" className="btn-blue" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <FaUserPlus /> New Application
                </Link>
            </div>

            <div className="form-card" style={{ padding: '0', borderRadius: '8px', overflow: 'hidden' }}>
                <div className="section-header active" style={{ cursor: 'default' }}>
                    <div className="section-title">Submitted Applications ({employees.length})</div>
                </div>
                <div className="section-content" style={{ padding: '0' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
                            <tr>
                                <th style={{ padding: '15px 25px', textAlign: 'left', fontSize: '13px', color: '#666', fontWeight: '500' }}>Applicant</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontSize: '13px', color: '#666', fontWeight: '500' }}>Contact</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontSize: '13px', color: '#666', fontWeight: '500' }}>Links</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontSize: '13px', color: '#666', fontWeight: '500' }}>Status</th>
                                <th style={{ padding: '15px 25px', textAlign: 'center', fontSize: '13px', color: '#666', fontWeight: '500' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px 25px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {employee.profileImageUrl ? (
                                                    <img src={employee.profileImageUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <span style={{ fontSize: '18px', color: '#999' }}>{employee.firstName?.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '500', fontSize: '14px' }}>{employee.title} {employee.firstName} {employee.lastName}</div>
                                                <div style={{ fontSize: '12px', color: '#999' }}>ID: {employee.idNumber || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px', fontSize: '13px' }}>
                                        <div>{employee.email}</div>
                                        <div style={{ color: '#666' }}>{employee.phoneNumber}</div>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {employee.linkedinUrl && (
                                                <a href={employee.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }} title="LinkedIn"><FaLinkedin size={18} /></a>
                                            )}
                                            {employee.resumeUrl && (
                                                <a href={employee.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#666' }} title="Resume"><FaExternalLinkAlt size={16} /></a>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: '15px', fontSize: '14px' }}>
                                        <span style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>Submitted</span>
                                    </td>
                                    <td style={{ padding: '15px 25px', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                            <Link to={`/edit-employee/${employee.id}`} style={{ color: '#0081c6', fontSize: '18px' }} title="Edit"><FaEdit /></Link>
                                            <button onClick={() => deleteEmployee(employee.id)} style={{ background: 'none', border: 'none', color: '#d93025', cursor: 'pointer', fontSize: '18px' }} title="Delete"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {employees.length === 0 && (
                        <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px', color: '#eee' }}><FaUserPlus /></div>
                            <div style={{ fontSize: '18px', marginBottom: '10px' }}>No applications yet.</div>
                            <p style={{ color: '#999', fontSize: '14px' }}>Start by creating a new rental application.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;


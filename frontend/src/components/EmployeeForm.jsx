import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { FaUser, FaPhoneAlt, FaMapMarkerAlt, FaBriefcase, FaIdCard, FaPlus, FaMinus, FaGraduationCap, FaLinkedin, FaFileAlt, FaImage } from 'react-icons/fa';

const EmployeeForm = () => {
    // State for the form fields
    const [employee, setEmployee] = useState({
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        email: '',
        phoneNumber: '',
        homePhone: '',
        identificationType: '',
        idNumber: '',
        expiryDate: '',
        department: '',
        salary: '',
        address: '',
        linkedinUrl: '',
        resumeUrl: '',
        profileImageUrl: '',
        educationList: []
    });

    // Sections toggle state
    const [openSections, setOpenSections] = useState({
        personal: true,
        education: false,
        professional: false,
        identification: false
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                setEmployee(response.data);
            }).catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const list = [...employee.educationList];
        list[index][name] = value;
        setEmployee({ ...employee, educationList: list });
    };

    const addEducation = () => {
        setEmployee({
            ...employee,
            educationList: [...employee.educationList, { institutionName: '', qualification: '', passingYear: '', percentage: '' }]
        });
        if (!openSections.education) {
            setOpenSections(prev => ({ ...prev, education: true }));
        }
    };

    const removeEducation = (index) => {
        const list = [...employee.educationList];
        list.splice(index, 1);
        setEmployee({ ...employee, educationList: list });
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const action = id ? EmployeeService.updateEmployee(id, employee) : EmployeeService.createEmployee(employee);

        action.then(() => navigate('/'))
            .catch(error => console.error(error));
    };

    return (
        <div className="main-container">
            <header className="app-header">
                <h1>{id ? 'Edit Applicant' : 'Online Rental Application'}</h1>
            </header>

            <div className="tab-bar">
                <div className="tab-item active">My Profile</div>
            </div>

            <form onSubmit={saveOrUpdateEmployee}>

                {/* Personal Details Section */}
                <div className="form-card">
                    <div className={`section-header ${openSections.personal ? 'active' : ''}`} onClick={() => toggleSection('personal')}>
                        <div className="section-title">
                            <FaUser /> Personal Details
                        </div>
                        {openSections.personal ? <FaMinus /> : <FaPlus />}
                    </div>
                    {openSections.personal && (
                        <div className="section-content">
                            <div className="form-row">
                                <label className="form-label">Title</label>
                                <select name="title" className="form-select" value={employee.title || ''} onChange={handleChange}>
                                    <option value="">Please Select...</option>
                                    <option value="Mr">Mr</option>
                                    <option value="Mrs">Mrs</option>
                                    <option value="Ms">Ms</option>
                                    <option value="Dr">Dr</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label className="form-label">First Name</label>
                                <input type="text" name="firstName" className="form-control" value={employee.firstName || ''} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Middle Name</label>
                                <input type="text" name="middleName" className="form-control" placeholder="(optional)" value={employee.middleName || ''} onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Last Name</label>
                                <input type="text" name="lastName" className="form-control" value={employee.lastName || ''} onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" name="dateOfBirth" className="form-control" value={employee.dateOfBirth || ''} onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Gender</label>
                                <div className="radio-group">
                                    <label className="radio-item"><input type="radio" name="gender" value="Male" checked={employee.gender === 'Male'} onChange={handleChange} /> Male</label>
                                    <label className="radio-item"><input type="radio" name="gender" value="Female" checked={employee.gender === 'Female'} onChange={handleChange} /> Female</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <label className="form-label">Marital Status</label>
                                <select name="maritalStatus" className="form-select" value={employee.maritalStatus || ''} onChange={handleChange}>
                                    <option value="">Please Select...</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" value={employee.email || ''} onChange={handleChange} required />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Mobile Phone</label>
                                <input type="text" name="phoneNumber" className="form-control" value={employee.phoneNumber || ''} onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Home/Work Phone</label>
                                <input type="text" name="homePhone" className="form-control" placeholder="(optional, inc area code)" value={employee.homePhone || ''} onChange={handleChange} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Identification Section */}
                <div className="form-card">
                    <div className={`section-header ${openSections.identification ? 'active' : ''}`} onClick={() => toggleSection('identification')}>
                        <div className="section-title">
                            <FaIdCard /> Identification
                        </div>
                        {openSections.identification ? <FaMinus /> : <FaPlus />}
                    </div>
                    {openSections.identification && (
                        <div className="section-content">
                            <div className="form-row">
                                <label className="form-label">Identification Type</label>
                                <select name="identificationType" className="form-select" value={employee.identificationType || ''} onChange={handleChange}>
                                    <option value="">Please Select...</option>
                                    <option value="Passport">Passport</option>
                                    <option value="Drivers License">Driver's License</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label className="form-label">ID Number</label>
                                <input type="text" name="idNumber" className="form-control" value={employee.idNumber || ''} onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Expiry Date</label>
                                <input type="date" name="expiryDate" className="form-control" value={employee.expiryDate || ''} onChange={handleChange} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Professional Details Section */}
                <div className="form-card">
                    <div className={`section-header ${openSections.professional ? 'active' : ''}`} onClick={() => toggleSection('professional')}>
                        <div className="section-title">
                            <FaBriefcase /> Professional & Links
                        </div>
                        {openSections.professional ? <FaMinus /> : <FaPlus />}
                    </div>
                    {openSections.professional && (
                        <div className="section-content">
                            <div className="form-row">
                                <label className="form-label">Department</label>
                                <input type="text" name="department" className="form-control" value={employee.department || ''} onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label className="form-label">Salary</label>
                                <input type="number" name="salary" className="form-control" value={employee.salary || ''} onChange={handleChange} />
                            </div>
                            <div className="form-row">
                                <label className="form-label">LinkedIn Profile</label>
                                <div className="form-input-container" style={{ width: '100%' }}>
                                    <FaLinkedin style={{ color: '#0077b5' }} />
                                    <input type="text" name="linkedinUrl" className="form-control" placeholder="https://linkedin.com/in/..." value={employee.linkedinUrl || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <label className="form-label">Resume Link</label>
                                <div className="form-input-container" style={{ width: '100%' }}>
                                    <FaFileAlt style={{ color: '#666' }} />
                                    <input type="text" name="resumeUrl" className="form-control" placeholder="Link to your Google Drive / Dropbox Resume" value={employee.resumeUrl || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <label className="form-label">Profile Image URL</label>
                                <div className="form-input-container" style={{ width: '100%' }}>
                                    <FaImage style={{ color: '#666' }} />
                                    <input type="text" name="profileImageUrl" className="form-control" placeholder="Link to profile picture" value={employee.profileImageUrl || ''} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <label className="form-label">Address</label>
                                <textarea name="address" className="form-control" style={{ minHeight: '80px' }} value={employee.address || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    )}
                </div>

                {/* Education Section */}
                <div className="form-card">
                    <div className={`section-header ${openSections.education ? 'active' : ''}`} onClick={() => toggleSection('education')}>
                        <div className="section-title">
                            <FaGraduationCap /> Education (School / College)
                        </div>
                        {openSections.education ? <FaMinus /> : <FaPlus />}
                    </div>
                    {openSections.education && (
                        <div className="section-content">
                            {employee.educationList.map((edu, index) => (
                                <div key={index} style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #eee', position: 'relative' }}>
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(index)}
                                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#d93025', cursor: 'pointer' }}
                                    >
                                        <FaMinus circle /> Remove
                                    </button>
                                    <div className="form-row">
                                        <label className="form-label">Institution Name</label>
                                        <input type="text" name="institutionName" className="form-control" value={edu.institutionName} onChange={(e) => handleEducationChange(index, e)} />
                                    </div>
                                    <div className="form-row">
                                        <label className="form-label">Qualification</label>
                                        <input type="text" name="qualification" className="form-control" placeholder="e.g. 10th, B.Tech, etc." value={edu.qualification} onChange={(e) => handleEducationChange(index, e)} />
                                    </div>
                                    <div className="form-row">
                                        <label className="form-label">Passing Year</label>
                                        <input type="number" name="passingYear" className="form-control" value={edu.passingYear} onChange={(e) => handleEducationChange(index, e)} />
                                    </div>
                                    <div className="form-row">
                                        <label className="form-label">Percentage / CGPA</label>
                                        <input type="number" step="0.01" name="percentage" className="form-control" value={edu.percentage} onChange={(e) => handleEducationChange(index, e)} />
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn-white" style={{ width: '100%', borderStyle: 'dashed' }} onClick={addEducation}>
                                <FaPlus /> Add Education
                            </button>
                        </div>
                    )}
                </div>

                <div className="button-container">
                    <button type="button" className="btn-white" onClick={() => navigate('/')}>Cancel</button>
                    <button type="submit" className="btn-blue">{id ? 'Update Information' : 'Submit Application'}</button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;


import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function HrEmployee() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // Add showUpdateForm state
  const [employees, setEmployees] = useState([]); 
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeePassword: '',
    employeePhone: '',
    bankacc: '',
    memberSince: '',
    basicsal: '',
    role: '',
    otrate: ''
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null); 

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8081/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateForm(false); 
    setFormData({
      employeeId: '',
      employeeName: '',
      employeePassword: '',
      employeePhone: '',
      bankacc: '',
      memberSince: '',
      basicsal: '',
      role: '',
      otrate: ''
    });
  };

  const handleShowModal = () => setShowModal(true);
  const handleShowUpdateForm = () => setShowUpdateForm(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/addEmployee', formData); 
      handleCloseModal();
      fetchEmployees(); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deleteEmployee/${id}`);
      fetchEmployees(); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      employeeId: employee.empid,
      employeeName: employee.name,
      employeePhone: employee.phone,
      employeePassword: employee.password,
      bankacc: employee.bankacc,
      memberSince: employee.memberSince,
      basicsal: employee.basicsal,
      role: employee.role,
      otrate: employee.otrate
    });
    handleShowModal();
    handleShowUpdateForm();
  };
  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/updateEmployee/${selectedEmployee.empid}`, formData);
      handleCloseModal(); 
      fetchEmployees();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link to="/admin" className='d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none'>
              <span className='fs-5 d-none d-sm-inline'>HR</span>
            </Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
              <li className={`nav-item w-100 ${location.pathname === '/Hr/Hrdashboard' ? 'bg-dark' : ''}`}>
                <Link to="/Hr/Hrdashboard" className='nav-link px-0 align-middle text-white'>
                  <i className='bi bi-house-door fs-4 me-1'></i> Dashboard
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/Hr/HrAttendance' ? 'bg-dark' : ''}`}>
                <Link to="/Hr/HrAttendance" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-calendar fs-4 me-1"></i> Attendance
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/Hr/HrEmployee' ? 'bg-dark' : ''}`}>
                <Link to="/Hr/HrEmployee" className='nav-link px-0 align-middle'>
                  <i className="bi bi-person fs-4 me-1"></i> Employee
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/Hr/HrLeave' ? 'bg-dark' : ''}`}>
                <Link to="/Hr/HrLeave" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-bookmark fs-4 me-1"></i> Leave
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/Hr/HrPayroll' ? 'bg-dark' : ''}`}>
                <Link to="/Hr/HrPayroll" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-cash fs-4 me-1"></i> Payroll
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/Hr/HrReport' ? 'bg-dark' : ''}`}>
                <Link to="/Hr/HrReport" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-bar-chart fs-4 me-1"></i> Report
                </Link>
              </li>
              <li className={`nav-item w-100 ${location.pathname === '/login' ? 'bg-dark' : ''}`}>
                <Link to="/login" className='nav-link px-0 align-middle text-white'>
                  <i className="bi bi-box-arrow-left fs-4 me-1"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='col py-3'>
          <h2>Employee</h2>
          <Button variant="success" onClick={handleShowModal}>Add Employee</Button>{' '}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Phone</th>
                <th>Bank Account</th>
                <th>Member Since</th>
                <th>Basic Salary</th>
                <th>Role</th>
                <th>OT Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.empid}>
                  <td>{employee.empid}</td>
                  <td>{employee.name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.password}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.bankacc}</td>
                  <td>{employee.membersince}</td>
                  <td>{employee.basicsal}</td>
                  <td>{employee.role}</td>
                  <td>{employee.otrate}</td>
                  <td>
                    <div className="d-flex">
                      <Button variant="primary" className="me-2" onClick={() => handleUpdate(employee)}>Update</Button>
                      <Button variant="danger" onClick={() => handleDelete(employee.empid)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="employeeId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Employee ID" value={formData.employeeId} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="employeeName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Employee Name" value={formData.employeeName} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="employeePassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" value={formData.employeePassword} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="employeePhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone No" value={formData.employeePhone} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="bankacc">
              <Form.Label>Position</Form.Label>
              <Form.Control type="text" placeholder="Enter account no" value={formData.bankacc} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="memberSince">
              <Form.Label>memberSince</Form.Label>
              <Form.Control type="date" placeholder="Enter date" value={formData.memberSince} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="basicsal">
              <Form.Label>basicsal</Form.Label>
              <Form.Control type="text" placeholder="Enter Basic salary" value={formData.basicsal} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>role</Form.Label>
              <Form.Control type="text" placeholder="Enter position"value={formData.position} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="otrate">
              <Form.Label>OT rate</Form.Label>
              <Form.Control type="text" placeholder="Enter OT rate" value={formData.otrate} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default HrEmployee;
